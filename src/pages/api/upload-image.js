import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    // use session.accessToken to make api calls
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })

        return;
    }

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
        body: JSON.stringify({ contentType: 'image/png' }),
    });

    console.log({ response });
    const { imageUploadUrl } = await response.json();

    // put the image in s3:
    console.log({ body: req.body });
    const result = await fetch(imageUploadUrl, {
        method: "PUT",
        body: req.body,
    });



    res.status(201).send({ message: 'created' });
}
