/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface JSONData {
  name: string;
  avatar: string;
  description: string;
}

export default function JsonFileReader() {
  const [jsonData, setJsonData] = useState<JSONData | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setJsonData(json.data);
      } catch (error) {
        alert("Invalid JSON file!");
      }
    };
    reader.readAsText(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJsonData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Upload and Edit JSON Data</h1>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
      />
      <img src={jsonData?.avatar} alt="avatar" style={{ width: "300px" }} />
      {jsonData && (
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={jsonData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={jsonData.description}
              onChange={handleChange}
            />
          </label>
        </form>
      )}
    </div>
  );
}
