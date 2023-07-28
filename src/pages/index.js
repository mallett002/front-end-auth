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
      //   body: JSON.stringify({familyName: 'Mallett', familyImage: 'somerandomimage', email: 'mallett002@gmail.com'})
      // });
      // const json = await res.json();
      // console.log({json});

      const familyId = 'c00df541-e433-4c79-812e-24c13bcf2a22';

      /*CREATE GIFT*/
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/members/mallett002@gmail.com/gifts/`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({
      //     "description": "brazil jersey",
      //     "link": "amazon.com",
      //     "title": "jersey"
      //   })
      // });
      // console.log({res});

      const giftId = '3eaa998e-5d73-4322-a8fa-e5c54cc7aecf';

      /*UPDATE GIFT*/
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/members/mallett002@gmail.com/gifts/${giftId}`, {
      //   method: 'PUT',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({
      //     "description": "vikings hat",
      //     "purchased": false,
      //     "link": "google.com",
      //     "title": "Hat"
      //   })
      // });
      // console.log({res});
      // const updatedGift = await res.json();
      // console.log({updatedGift})


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
      //     "email": 'mallbert@gmail.com',
      //   })
      // });
      // console.log({res});

      // const result = await res.json();
      // console.log({result});

      /* SEARCH USERS BY EMAIL */
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/members?email=mall`, {
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   }
      // });
      // console.log({res});
      // const member = await res.json();
      // console.log(JSON.stringify({member}));

      /* UPDATE INVITATION */
      // note: get invitations from get board endpoint
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/invitations/mallery@gmail.com`, {
      //   method: 'PUT',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      //   body: JSON.stringify({
      //     "status": 'ACCEPTED',
      //   })
      // });
      // console.log({res});

      /* DELETE INVITATION */
      // const res = await fetch(`${process.env.WISH_LIST_SERVER_DOMAIN}/families/${familyId}/invitations/mallbert@gmail.com`, {
      //   method: 'DELETE',
      //   headers: {
      //     Authorization: `Bearer ${session.accessToken}`
      //   },
      // });
      // console.log({res});
  
      return { props: { gift: null } };      
    } catch (error) {
      console.log({error});
    }

  }
  
  return { props: {gift: null} };
};