'use client'

import { useSession } from "next-auth/react";

const Protected = () => {
    const {data} = useSession();

    console.log({data});
    return (
        <div>Protected</div>
    )
}

export default Protected;
