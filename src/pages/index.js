'use client'
import {
  LoginButton,
  LogoutButton,
  ProfileButton
} from "../components/buttons";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log({ session });

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