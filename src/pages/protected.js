'use client'

import { LogoutButton, HomeButton } from "@/components/buttons";
import { useSession } from "next-auth/react";
import Image from 'next/image'


const Protected = () => {
    const { data } = useSession();

    console.log(({ dataInsUseSession: data }));

    if (data && data.user) {

        return (
            <div>
                <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ marginBottom: 20 }}>User Info</h3>
                    <div>
                        <HomeButton />
                        <LogoutButton />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
                    <div style={{ paddingRight: 15 }}>
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
