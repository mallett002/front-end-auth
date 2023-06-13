'use client'
import {
  LoginButton,
  LogoutButton,
  ProfileButton
} from "../components/buttons";
import { useSession } from "next-auth/react";

export default function Home({gift}) {
  const { data, status } = useSession();

  console.log({ data, gift });

  if (status === 'loading') {
    return <p>Loading...</p>
  }
  
  if (status === 'unauthenticated') {
    return (
      <div>
        <LoginButton />
      </div>
    )
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/repos/vercel/next.js`);
  const gift = await res.json();
  console.log({stuffInServer: gift});

  return { props: { gift } };
}