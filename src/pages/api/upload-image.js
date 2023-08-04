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
    const response = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'multipart/form-data'
            // Accept: 'image/png'
        },
        body: req.body
    });
    console.log({ response });
    const json = await response.json();
    console.log({ json });

    res.status(201).json({ message: 'created' });
}
