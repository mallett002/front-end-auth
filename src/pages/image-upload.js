import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const Uploader = () => {
    //   const axios = require("axios").default;
    const getUploadParams = () => {
        return { url: '/api/upload-image' }
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        console.log(status, meta);
    };

    const handleSubmit = async (files, allFiles) => {
        const f = files[0];

        // GET request: presigned URL
        // const response = await axios({
        //   method: "POST",
        //   url: `${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`,
        // });

        // PUT request: upload file to S3
        const result = await fetch('/api/upload-image', {
            method: "POST",
            body: f["file"],
        });

        allFiles.forEach(f => f.remove());
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
        />
    );
};
<Uploader />;

export default Uploader;
