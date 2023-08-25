import React, { useEffect, useState } from 'react';
import { useSession, getSession } from "next-auth/react";
import Image from 'next/image';

const FamilyBoard = (props) => {
    console.log({ props });

    return (
        <div>
            <p style={{marginBottom: 10}}>Family {props.familyName}'s board</p>
            <Image
                alt="my-image"
                src={props.imageUrl}
                width={200}
                height={100}
                onError={(error) => console.log(error)}
            />
            {props.members && props.members.length && (
                props.members.map((member) => (<div style={{marginTop: 10, marginBottom: 10}}>
                    <p>Email: {member.email}</p>
                    <p>alias: {member.alias}</p>
                </div>))
            )}
        </div>

    );
};

export default FamilyBoard;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {

        const familyId = '94548e87-e9b3-4917-8594-bfb1a99a4f94';
        
        // Get family board data:
        const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/board`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        const { imageContentType, familyName, members } = await res.json();


        // get pre-signed image url for family:
        const preSignedURLResponse = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
                operation: 'GET_OBJECT',
                contentType: imageContentType
            }),
        });

        const { fetchImageUrl } = await preSignedURLResponse.json();

        // // fetch the image with the url:
        // const fetchImageResponse = await fetch(fetchImageUrl);
        // console.log({fetchImageResponse})
        return {
            props: {
                imageUrl: fetchImageUrl,
                familyName,
                members
            }
        }
    }

    return { props: { imageUrl: '' } }

};
