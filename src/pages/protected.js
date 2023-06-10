'use client'

import { useSession } from "next-auth/react";
import Image from 'next/image'


const Protected = () => {
    const { data } = useSession();

    if (data && data.user) {
        console.log(data.user);

        return (
            <div style={{paddingLeft: 20, marginTop: 30}}>
                <h3 style={{marginBottom: 20}}>User Info</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 200 }}>
                    <Image
                        src={data.user.image}
                        width={30}
                        height={30}
                        alt="Picture of the author"
                    />
                    <p>{data.user.email}</p>
                </div>
            </div>
        );
    }

    return <p>nothing to see here...</p>
}

export default Protected;
