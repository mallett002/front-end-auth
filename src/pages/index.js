import {
  LoginButton,
  LogoutButton,
  ProfileButton
} from "../components/buttons";
import { useSession, getSession } from "next-auth/react";

export default function Home({ gift }) {
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log({session});
  
  if (session) {
    console.log({accessToken: session.accessToken});
    
    try {
      const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/family1/users/mallett002@gmail.com/gifts/gift1`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });
  
      const gift = await res.json();
  
      return { props: { gift } };      
    } catch (error) {
      console.log({error});
    }

  }

  return { props: {gift: null} };
};