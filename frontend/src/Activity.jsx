import React, { useState } from 'react';
import './styles/Activity.css';

const Activity = () => {
    const [uploads, setUploads] = useState([]);

    const handleFileChange = async (event) => {
        console.log("File input triggered");
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file:", file.name);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://localhost:4000/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Upload successful:", data);

                    // Capture current date and time
                    const currentDate = new Date();
                    const formattedDate = currentDate.toLocaleDateString();
                    const formattedTime = currentDate.toLocaleTimeString();

                    // Store the upload details
                    setUploads(prevUploads => [
                        ...prevUploads,
                        {
                            date: formattedDate,
                            time: formattedTime,
                            analysis: "Analysis Result Placeholder", // Placeholder text
                        },
                    ]);
                } else {
                    console.log("Upload failed:", data.message);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            console.log("No file selected");
        }
    };

    return (
        <div className="activity-container">
            <h1 className="activity-title">My Activity</h1>

            {/* Upload Box */}
            <div className="upload-box">
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button className="upload-button" onClick={() => document.getElementById("fileInput").click()}>
                    Upload Image
                </button>
            </div>

            {/* Display Uploaded Activities */}
            <div className="activity-box">
                {uploads.length > 0 ? (
                    uploads.map((upload, index) => (
                        <div className="activity-row" key={index}>
                            <div className="activity-text">{upload.date}</div>
                            <div className="activity-text">{upload.time}</div>
                            <div className="activity-text">{upload.analysis}</div>
                        </div>
                    ))
                ) : (
                    <p className="no-uploads">No uploads yet</p>
                )}
            </div>
        </div>
    );
};

export default Activity;
