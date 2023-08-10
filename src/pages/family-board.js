import React, { useEffect, useState } from 'react';


const FamilyBoard = (props) => {
    const [image, setImage] = useState(null);
    const [stagedImgUrl, setStagedImgUrl] = useState(null);
    const [savedImgUrl, setSavedImgUrl] = useState(null);
    const myRef = React.createRef();

    const fetchData = () => {
        const body = new FormData();
        body.append("file", image);

        fetch("/api/upload-image", {
            method: "POST",
            body,
            headers: {
                Accept: 'image/png'
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                console.log({ blob });
                const savedImgSrc = URL.createObjectURL(blob);
                console.log({ savedImgSrc });
                // const encodedString = Buffer.from(buffer, 'binary').toString('base64');
                // const srcValue = "data:image/png;base64,"+ encodedString;

                setSavedImgUrl(savedImgSrc);
                setImage(null);
                setStagedImgUrl(null);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;

            setImage(file);

            const imageUrl = URL.createObjectURL(file);

            setStagedImgUrl(imageUrl);
        }
    };

    // const uploadToServer = async () => {
    //     const body = new FormData();

    //     body.append("file", image);

    //     const response = await fetch("/api/upload-image", {
    //         method: "POST",
    //         body,
    //         headers: {
    //             Accept: 'application/octet-stream'
    //         }
    //     });
    //     console.log({ response });
    //     const blob = await response.blob();
    //     // const img = new Image();
    //     // img.src = URL.createObjectURL(blob);
    //     // await img.decode();
    //     const imgUrl = URL.createObjectURL(blob);
    //     console.log({ imgUrl });

    //     setSavedImgUrl(imgUrl);

    //     console.log({ savedImgUrl });

    //     setImage(null);
    //     setStagedImgUrl(null);
    // };

    const clearImage = () => {
        setImage(null);
        setStagedImgUrl(null);
    }

    console.log({ savedImgUrl });
    console.log({ stagedImgUrl });
    return (
        <div>
            <div>
                <img src={stagedImgUrl} />
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button
                    style={{ marginRight: 20 }}
                    className="btn btn-primary"
                    type="submit"
                    onClick={fetchData}
                >
                    Save Image
                </button>
                <button
                    onClick={clearImage}
                    className="btn btn-primary"
                >
                    Clear Image
                </button>
                {savedImgUrl && (
                    <div style={{ marginTop: 10 }}>
                        <img
                            onLoad={() => {
                                if (myRef.current) {
                                    myRef.current.element.style.visibility = "visible";
                                }
                            }}
                            onError={(error) => console.log('something went wrong loading image', error)}
                            style={{ width: "50%", visibility: "hidden" }}
                            src={savedImgUrl}
                            responsive
                            ref={myRef}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FamilyBoard;
