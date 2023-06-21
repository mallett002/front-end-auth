import {
  LoginButton,
  LogoutButton,
  ProfileButton
} from "../components/buttons";
import { useSession, getSession } from "next-auth/react";
import { CognitoJwtVerifier } from 'aws-jwt-verify';

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

    // Todo: maybe do this in [...nextauth].js so the whole app has the idToken decrypted already
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      tokenUse: "id",
      clientId: process.env.COGNITO_CLIENT_ID,
    });

    let sub = null;
    
    try {
      const payload = await verifier.verify(session.idToken);
      
      sub = payload.sub;
            
    } catch (err) {
      console.log("Error decrypting token: ", err);
    }
    
    try {
      const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/family1/users/${sub}/gifts/gift1`, {
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