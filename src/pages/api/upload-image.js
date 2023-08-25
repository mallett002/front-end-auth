import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const familyId = '94548e87-e9b3-4917-8594-bfb1a99a4f94';
    const contentType = req.query.fileType;
    let response;

    // Getting this when making request: - wait compiling /_error (client and server)...
    try {
        response = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({ contentType, operation: 'PUT_OBJECT' }),
        });
    } catch (error) {
        console.log(error);
    }

    // response = await axios.post(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
    //     contentType, operation: 'PUT_OBJECT'
    // }, {
    //     method: 'POST',
    //     headers: {
    //         authorization: `Bearer ${session.accessToken}`,
    //     },
    // });
    // console.log({response});
    // const { imageUploadUrl } = response.data;

    const { imageUploadUrl } = await response.json();

    res.status(200).send({ imageUploadUrl });
}

