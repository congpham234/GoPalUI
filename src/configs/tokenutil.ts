import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider'
import { checkEnvVariables } from './commonutil'

// Initialize the Cognito Identity Provider client
const client = new CognitoIdentityProviderClient({
  region: process.env.REACT_APP_AWS_REGION, // Ensure AWS_REGION is set in your .env file
})

async function getApiToken(
  userName: string,
  password: string
): Promise<string> {
  // Check client-specific variables
  checkEnvVariables(['REACT_APP_AWS_REGION', 'REACT_APP_SECRET_HASH'])

  const params = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: process.env.REACT_APP_CLIENT_ID!,
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: password,
      SECRET_HASH: process.env.REACT_APP_SECRET_HASH!,
    },
  }

  try {
    const command = new InitiateAuthCommand(params)
    const response = await client.send(command)
    // Ensure that the response contains the expected result
    const idToken = response.AuthenticationResult?.IdToken
    if (!idToken) {
      throw new Error(
        'Authentication was successful but no ID token was returned.'
      )
    }
    return idToken
  } catch (error) {
    console.error('Error authenticating', error)
    throw error
  }
}

export async function getDefaultApiToken(): Promise<string> {
  // Check required environment variables at the start
  checkEnvVariables(['REACT_APP_PASSWORD', 'REACT_APP_USERNAME'])

  // Proceed with sign-in using environment variables
  return await getApiToken(
    process.env.REACT_APP_USERNAME!,
    process.env.REACT_APP_PASSWORD!
  )
}
