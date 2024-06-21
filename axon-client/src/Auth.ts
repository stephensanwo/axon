import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: "XX-XXXX-X_abcd1234",
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: "a1b2c3d4e5f6g7h8i9j0k1l2m3",
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: "code", // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: "your_cognito_domain",
          scopes: [
            "phone",
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: [
            "http://localhost:4514/notes",
            "https://www.example.com/notes",
          ],
          redirectSignOut: [
            "http://localhost:4514/",
            "https://www.example.com/",
          ],
          responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    },
  },
});

// You can get the current config object
export const authConfig = Amplify.getConfig();
