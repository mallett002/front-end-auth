'use client'

import { useSession } from "next-auth/react";
import Image from 'next/image'


const Protected = () => {
    const { data } = useSession();

    console.log(({ dataInsUseSession: data }));

    if (data && data.user) {

        return (
            <div style={{ paddingLeft: 20, marginTop: 30 }}>
                <h3 style={{ marginBottom: 20 }}>User Info</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{paddingRight: 15}}>
                        <Image
                            src={data.user.image}
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
                    </div>
                    <p style={{ paddingRight: 15 }}>{data.givenName}</p>
                    <p>{data.user.email}</p>
                </div>
            </div>
        );
    }

    return <p>nothing to see here...</p>
}

export default Protected;
