import { useState } from "react";
import { useRouter } from "next/router";
import FileInput from "../components/FileInput";
import LanguageSelector from "../components/LanguageSelector";
import TagInput from "../components/TagInput";
import ProgressBar from "../components/ProgressBar";
import { getMediaFormat } from '../lib/mimeTypeMapping'; // Import the mapping function

const Upload = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en-US");
  const [tags, setTags] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedSize, setUploadedSize] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileType = getMediaFormat(selectedFile.type);

    if (!fileType) {
      if (window.confirm("Unsupported file type. Please try again...")) {
        router.push("/upload");
      }
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      const response = await fetch("/api/generate-presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { url, s3ObjectKey } = await response.json();

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress((event.loaded / event.total) * 100);
          setUploadedSize(event.loaded);
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          const finalizeResponse = await fetch("/api/upload-database", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              s3ObjectKey,
              language,
              fileName: file.name,
              tags,
            }),
          });

          if (finalizeResponse.ok) {
            const startTranscriptionResponse = await fetch("/api/start-transcription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                s3ObjectKey,
                language,
                fileType: file.type
              }),
            });

            if (startTranscriptionResponse.ok) {
              router.push("/");
            } else {
              setError("Failed to start transcription job");
            }
          } else {
            setError("Failed to finalize upload and update database");
          }
        } else {
          setError("Failed to upload file");
        }
      };

      xhr.onerror = () => setError("Failed to upload file");
      xhr.send(file);
    } catch {
      setError("Failed to upload file");
    }
  };

  return (
    <div className="container mx-auto mt-10 grayscale max-w-[600px] w-80">
      <FileInput handleFileChange={handleFileChange} error={error} />
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <TagInput tags={tags} setTags={setTags} />
      <br />
      <button
        onClick={handleUpload}
        className="p-2 text-md w-full max-w-[80px] ring-1 hover:bg-gray-200 text-gray-800 rounded-lg"
      >
        Upload
      </button>
      <ProgressBar
        file={file}
        uploadProgress={uploadProgress}
        uploadedSize={uploadedSize}
      />
    </div>
  );
};

export default Upload;
