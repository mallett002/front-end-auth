import { LoginButton } from "@/components/buttons";
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

// Get username off ID token?
// Guide: https://kelvinmwinuka.com/social-login-with-cognito-and-nextauth
// guide: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

// Sub: f4a804d8-d081-709d-d6ab-14448fc35e23
// userId: Google_101398132283206901435

const {
    NEXTAUTH_URL,
    COGNITO_ISSUER,
    COGNITO_DOMAIN,
    COGNITO_CLIENT_ID,
    COGNITO_USER_POOL_ID,
    COGNITO_CLIENT_SECRET,
} = process.env;


export const authOptions = {

    providers: [CognitoProvider({
        clientId: COGNITO_CLIENT_ID,
        clientSecret: COGNITO_CLIENT_SECRET,
        issuer: COGNITO_ISSUER,
        idToken: true,
        checks: 'nonce',
    })],

    callbacks: {
        async jwt({ account, token, profile }) {
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

        async session({ session, token }) { // session, token
            session.accessToken = token.accessToken;
            session.idToken = token.idToken;
            session.givenName = token.givenName;

            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export default handler;
