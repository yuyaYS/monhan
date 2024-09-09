import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UploadQuestsButton() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const response = await fetch("/data/quests.json");
      const questData = await response.json();

      const uploadResponse = await fetch("/api/upload-quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questData),
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload quests");
      }

      alert("Quests uploaded successfully!");
    } catch (error) {
      console.error("Error uploading quests:", error);
      alert("Failed to upload quests");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Button onClick={handleUpload} disabled={isUploading}>
      {isUploading ? "Uploading..." : "Upload Quests"}
    </Button>
  );
}
