import React, { useState } from "react";

const UploadEndemicLifeButton: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    setIsUploading(true);
    setMessage("");

    try {
      const response = await fetch("/api/upload-endemic_life", {
        method: "POST",
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error uploading endemic life data:", error);
      setMessage("Failed to upload endemic life data");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Endemic Life Data"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadEndemicLifeButton;
