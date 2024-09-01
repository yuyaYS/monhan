import React, { useState } from "react";

const UploadMonstersButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/upload-monsters", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to upload monsters");
      }

      setSuccess("Monsters data uploaded successfully!");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Monsters"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default UploadMonstersButton;
