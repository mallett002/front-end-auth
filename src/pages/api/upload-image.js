import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const familyId = '15798ce5-2c03-449d-979e-24ff5d7fd496';

    const response = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ contentType: 'image/png', operation: 'PUT_OBJECT' }),
    });

    const { imageUploadUrl } = await response.json();

    res.status(200).send({ imageUploadUrl });
}

