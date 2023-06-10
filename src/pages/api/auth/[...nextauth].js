import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";


// guide: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
export const authOptions = {
    providers: [CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
        idToken: true,
        checks: "nonce"
    })],

    callbacks: {
        async jwt(jwtArg) {
            console.log({jwtArg});
            
            if (jwtArg.account) {
                jwtArg.token.accessToken = jwtArg.account.access_token
            }

            return jwtArg.token;
        },
        async session(sessionArg) {
            console.log(JSON.stringify({sessionArg}, null, 2));
            
            const { session, token, user } = sessionArg;
            
            session.accessToken = token.accessToken

            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export default handler;
