import React, { useState } from "react";
import TagInput from "../fileupload/TagInput"; // Adjust the import path as necessary
import LanguageSelector from "../fileupload/LanguageSelector"; // Adjust the import path as necessary

const MergeUpload = () => {
  const [uploadData, setUploadData] = useState({
    platform: '',
    videoId: '',
    language: 'en-US',
    filename: '',
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags) => {
    setUploadData((prevData) => ({
      ...prevData,
      tags: tags,
    }));
  };

  const handleLanguageChange = (language) => {
    setUploadData((prevData) => ({
      ...prevData,
      language: language,
    }));
  };

  const handleUpload = async () => {
    try {
      const response = await fetch('/api/externalVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });
      const data = await response.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Merge Upload</h2>
      <div className="mb-4">
        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={uploadData.platform}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="videoId"
          placeholder="Video ID"
          value={uploadData.videoId}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        />
        <LanguageSelector
          language={uploadData.language}
          setLanguage={handleLanguageChange}
        />
        <input
          type="text"
          name="filename"
          placeholder="Filename"
          value={uploadData.filename}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        />
        <TagInput tags={uploadData.tags} setTags={handleTagsChange} />
      </div>
      <button
        onClick={handleUpload}
        className="p-2 text-md w-full max-w-[80px] ring-1 hover:bg-gray-200 text-gray-800 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
};

export default MergeUpload;
