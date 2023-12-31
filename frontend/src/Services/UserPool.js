import { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_Q3xF8jaah',
    ClientId: "4is01usckduv6qbvrn76c6em3v"
};

const cognitoUserPool = new CognitoUserPool(poolData);
let currentSession = null;

export const getUserPool = () => {
    return cognitoUserPool;
}

export const createSession = async (accessToken, idToken) => {
    const AccessToken = await new CognitoAccessToken({
        AccessToken: accessToken,
    });
    const IdToken = await new CognitoIdToken({ IdToken: idToken });

    const RefreshToken = await new CognitoRefreshToken({
        RefreshToken: idToken,
    });

    const sessionData = {
        IdToken,
        AccessToken,
        RefreshToken,
    };

    const userSession = await new CognitoUserSession(sessionData);
    const payload = userSession.getIdToken().decodePayload();

    const userData = {
        Username: payload['cognito:username'], // get this from token/another method
        Pool: cognitoUserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    await cognitoUser.setSignInUserSession(userSession);

    await cognitoUser.getSession((err, session) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(session);
            currentSession = session;
        }
    });
}


//do not use getCurrentSession method
export const getCurrentSession = () => {
    return currentSession;
}