import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

// Get username off ID token?
// Guide: https://kelvinmwinuka.com/social-login-with-cognito-and-nextauth
// guide: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

// Sub: f4a804d8-d081-709d-d6ab-14448fc35e23
// userId: Google_101398132283206901435
export const authOptions = {
    providers: [CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
        idToken: true,
        checks: "nonce"
    })],

    callbacks: {
        // user, account, profile and isNewUser (first time log in), other calls, just token
        async jwt(jwtArg) {
            console.log(JSON.stringify({ jwtArg }, null, 2));
            const {account, token, profile} = jwtArg;

            // put things on the token to persist them to the session
            const sessionToken = token;

            if (account) {
                sessionToken.accessToken = account.access_token;
                sessionToken.idToken = account.id_token;
            }

            if (profile) {
                sessionToken.givenName = profile.given_name;
            }

            return sessionToken;
        },

        // getSession(), useSession(), /api/auth/session
        async session(sessionArg) { // session, token
            // The session callback is called whenever a session is checked
            console.log(JSON.stringify({ sessionArg }, null, 2));

            // put things on the session to expose them to the app

            const { session, token } = sessionArg;

            session.accessToken = token.accessToken;
            session.idToken = token.idToken;
            session.givenName = token.givenName;

            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export default handler;
