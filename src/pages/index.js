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

  if (session) {
    console.log({accessToken: session.accessToken});
    console.log({idToken: session.idToken});
    console.log({sub: session.sub});

    try {
      const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/family1/users/${session.sub}/gifts/gift1`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });
  
      const gift = await res.json();
      console.log({theGIFT: gift});
  
      return { props: { gift } };      
    } catch (error) {
      console.log({error});
    }

  }
  
  return { props: {gift: null} };
};