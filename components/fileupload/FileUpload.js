import { useState } from "react";
import { useRouter } from "next/router";
import FileInput from "./FileInput";
import LanguageSelector from "./LanguageSelector";
import TagInput from "./TagInput";
import ProgressBar from "./ProgressBar";
import { getMediaFormat } from '../../lib/mimeTypeMapping';

const FileUpload = () => {
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
      const response = await fetch("/api/upload-and-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          language,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process upload");
      }

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
          router.push("/");
        } else {
          setError("Failed to upload file");
        }
      };

      xhr.onerror = () => setError("Failed to upload file");
      xhr.send(file);
    } catch (error) {
      setError(error.message || "Failed to upload file");
    }
  };

  return (
    <div>
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

export default FileUpload;