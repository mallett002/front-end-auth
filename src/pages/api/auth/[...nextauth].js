// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

// export default NextAuth({
//   providers: [
//     Providers.Cognito({
//       clientId: process.env.COGNITO_CLIENT_ID,
//       clientSecret: process.env.COGNITO_CLIENT_SECRET,
//       domain: process.env.COGNITO_DOMAIN,
//     })
//   ],
//   debug: process.env.NODE_ENV === 'development' ? true : false
// })

import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
        idToken: true,
        checks: "nonce"
    })],

    callbacks: {
        async jwt({ token, account }) {
            
            console.log('in jwt: ', {token, account});

            if (account) {
                token.accessToken = account.access_token
            }

            return token;
        },
        async session(sessionObject) {
            const { session, token, user } = sessionObject;
            
            console.log('in session: ', {session, token, user});
            
            session.accessToken = token.accessToken

            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export default handler;
