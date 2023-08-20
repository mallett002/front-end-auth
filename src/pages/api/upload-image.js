import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import formidable from "formidable";
// import fs from 'fs';
// import FormData from 'form-data';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    // use session.accessToken to make api calls
    // if (req.method !== 'POST') {
    //     res.status(405).send({ message: 'Only POST requests allowed' })

    //     return;
    // }

    // const response = await axios.post(`${process.env.WISH_LIST_SERVER_DOMAIN}/families`, {
    //     familyName: 'Mallett',
    //     familyImage: 'somerandomimage',
    //     email: 'mallett002@gmail.com',
    //     familyImage: req.body.familyImage
    // }, {
    //     headers: {
    //         Authorization: `Bearer ${session.accessToken}`,
    //         // 'Content-Type': 'multipart/form-data'
    //     }
    // });

    const familyId = '15798ce5-2c03-449d-979e-24ff5d7fd496';

    // get the upload pre-signed url:
    const response = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ contentType: 'image/png', operation: 'PUT_OBJECT' }),
    });

    console.log({ response });
    const { imageUploadUrl } = await response.json();
    console.log({ imageUploadUrl });

    // put the image in s3:
    // let binary = atob(req.body.split(',')[1])
    // let array = []
    // for (var i = 0; i < req.body.length; i++) {
    //     array.push(req.body.charCodeAt(i))
    // }

    // let blobData = new Blob([new Uint8Array(array)], { type: 'image/png' })

    // const result = await fetch(imageUploadUrl, {
    //     method: "PUT",
    //     body: blobData,
    // });

    // Parse the incoming post request
    // const form = formidable({});
    // let fields, files, result;

    // try {
    //     [fields, files] = await form.parse(req);
    //     console.log({fields, files});
    //     const {file: [persistentFile]} = files;

    //     const apiFormData = new FormData();

    //     Object.entries(postFields).map(([key, value]) => {
    //         if (key !== 'key') {
    //             apiFormData.append(key, value);
    //         }
    //     });
    //     // apiFormData.append('key', '15798ce5-2c03-449d-979e-24ff5d7fd496.png');
    //     // apiFormData.append('Content-Type', 'image/png');
    //     apiFormData.append('file', persistentFile);
        

    //     // Getting 403...
    //     const axiosPostConfig = {
    //         method: 'POST',
    //         url,
    //         headers: {
    //             'Content-Length': persistentFile.size,
    //         },
    //         data: apiFormData,
    //       };

    //     result = await axios(axiosPostConfig);

    // } catch (err) {
    //     console.log('something went boom boom', err);
    // }
    // const form = new FormData();
    // form.append('file', req.body);

    // form.length
    // console.log({body: req.body, form});

    // const result = await fetch(imageUploadUrl, {
    //     method: "POST",
    //     body: form,
    //     headers: {
    //         "Content-Length": form.length
    //     }
    // });

    // console.log({ result });
    // Full working example: https://stackoverflow.com/questions/74081648/aws-s3-createpresignedpost-not-working-need-an-example

    res.status(200).send({ imageUploadUrl });
}

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
