import React, { useEffect, useState } from 'react';
import { useSession, getSession } from "next-auth/react";
import Image from 'next/image';

const FamilyBoard = (props) => {
    console.log({ props });

    return (
        <div>
            <p>your image:</p>
            <Image
                alt="my-image"
                src={props.imageUrl}
                width={200}
                height={100}
                onError={(error) => console.log(error)}
            />
        </div>

    );
};

export default FamilyBoard;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        // get pre-signed image url:
        const familyId = '15798ce5-2c03-449d-979e-24ff5d7fd496';
        const preSignedURLResponse = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({ operation: 'GET_OBJECT', contentType: 'image/png' }),
        });
        
        const { fetchImageUrl } = await preSignedURLResponse.json();

        // // fetch the image with the url:
        // const fetchImageResponse = await fetch(fetchImageUrl);
        // console.log({fetchImageResponse})
        return { props: { imageUrl: fetchImageUrl } }
    }

    return { props: { imageUrl: fetchImageUrl } }

};
