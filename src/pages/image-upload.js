import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";



// Maybe this would work better: https://www.npmjs.com/package/react-drag-drop-files
const Uploader = () => {
    //   const axios = require("axios").default;
    const getUploadParams = () => {
        return { url: '/api/upload-image' }
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        console.log(status, meta);
    };

    const handleSubmit = async (files, allFiles) => {
        const file = files[0];

        console.log({ file });

        const form = new FormData();
        form.append('file', file);
        form.append('contentLength', file.size);
        // Object.entries(fields).forEach(([field, value]) => {
        //     form.append(field, value);
        // });
        // form.append("file", createReadStream("path/to/a/file"));
        // form.submit(url, (err, res) => {
        //     //handle the response
        // });


        // GET request: presigned URL
        // const response = await axios({
        //   method: "POST",
        //   url: `${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`,
        // });

        // PUT request: upload file to S3
        const result = await fetch('/api/upload-image', {
            method: "POST",
            body: form,
        });

        console.log({uploadClientResult: result});

        allFiles.forEach(f => f.remove());
    };

    return (
        <>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
            />
        </>

    );
};
<Uploader />;

export default Uploader;
