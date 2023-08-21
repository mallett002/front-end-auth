import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image';


const FamilyImageUploader = () => {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    const uploadFile = async () => {
        const res = await fetch('/api/upload-image');
        const { imageUploadUrl } = await res.json();
        console.log(imageUploadUrl);

        const upload = await fetch(imageUploadUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });

        setFile(null);

        if (upload.ok) {
            console.log('Uploaded successfully!');
        } else {
            console.error('Upload failed.');
        }
    }

    if (file) {
        console.log({fileType: file.type});
    }
    

    const cancelUpload = () => {
        setFile(null);
    }

    return (
        <>
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={["JPG", "PNG"]}
                maxSize={5}
            />
            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
            {file && (
                <div style={{ display: 'flex', width: 200, justifyContent: 'space-between' }}>
                    <button onClick={uploadFile}>save</button>
                    <button onClick={cancelUpload}>cancel</button>
                </div>
            )}


        </>
    );
};

export default FamilyImageUploader;
