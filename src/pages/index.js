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
    // console.log({accessToken: session.accessToken});
    // console.log({idToken: session.idToken});
    console.log({sub: session.sub});
    console.log({session}); // Do we have the email here? Need to pass it into the POST /families (createorEmail)

    try {
      /*CREATE FAMILY*/
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({familyName: 'Cousins', familyImage: 'somerandomimage', email: 'mallett002@gmail.com'})
      // });
      // const json = await res.json();
      // console.log({json});

      const familyId = 'e000cd90-441d-4765-afa1-23f7b6a50bb8';

      /*CREATE GIFT*/
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/members/mallett002@gmail.com/gifts/`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({
      //     "description": "hat",
      //     "link": "google.com",
      //     "title": "Hat"
      //   })
      // });
      // console.log({res});

      // const giftId = 'e4130836-b352-464c-8ee2-6abf9b44dc51';


      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/board`, {
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   }
      // });
      // const board = await res.json();

      // console.log(JSON.stringify({board}));


      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/members/mallett002@gmail.com/families`, {
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   }
      // });
      // const families = await res.json();

      // console.log(JSON.stringify({families}));

      /*CREATE INVITATION*/
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/invitations`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({
      //     "email": 'mallett002@gmail.com',
      //   })
      // });
      // console.log({res});

      // const result = await res.json();
      // console.log({result});

      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/members?email=mall`, {
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   }
      // });
      // console.log({res});
      // const member = await res.json();
      // console.log(JSON.stringify({member}));
  
      return { props: { gift: null } };      
    } catch (error) {
      console.log({error});
    }

  }
  
  return { props: {gift: null} };
};