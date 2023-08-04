import React, { useState } from 'react';


const FamilyBoard = (props) => {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;

            setImage(file);

            const imageUrl = URL.createObjectURL(file);
            console.log({ imageUrl });

            setCreateObjectURL(imageUrl);
        }
    };

    const uploadToServer = async () => {
        const body = new FormData();

        body.append("file", image);

        const response = await fetch("/api/upload-image", {
            method: "POST",
            body
        });
    };

    const clearImage = () => {
        setImage(null);
        setCreateObjectURL(null);
    }

    return (
        <div>
            <div>
                <img src={createObjectURL} />
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button
                    style={{marginRight: 20}}
                    className="btn btn-primary"
                    type="submit"
                    onClick={uploadToServer}
                >
                    Save Image
                </button>
                <button
                    onClick={clearImage}
                    className="btn btn-primary"
                >
                    Clear Image
                </button>
            </div>
        </div>
    );
};

export default FamilyBoard;
