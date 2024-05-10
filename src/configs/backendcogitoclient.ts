import { CognitoIdentityProviderClient, InitiateAuthCommand, AuthFlowType } from "@aws-sdk/client-cognito-identity-provider";

/**
 * Asynchronously generates a Base64-encoded HMAC SHA256 hash using a client secret key, a username, and a client ID.
 * This function is designed to run in browser environments.
 *
 * @param clientSecretKey The secret key used for HMAC generation.
 * @param username The username involved in the computation.
 * @param clientId The client ID involved in the computation.
 * @returns A Promise that resolves to a Base64-encoded string representing the HMAC SHA256 hash.
 */
async function generateHmacSha256Base64(clientSecretKey: string, username: string, clientId: string): Promise<string> {
  // Concatenate username and clientId as per the specification.
  const message = username + clientId;
  const encoder = new TextEncoder();

  try {
    // Import the client secret key for use with the crypto.subtle API
    const key = await crypto.subtle.importKey(
      "raw", // raw format of the key - no need to specify a key type
      encoder.encode(clientSecretKey), // Convert the secret key to an ArrayBuffer
      { name: "HMAC", hash: { name: "SHA-256" } }, // Specify HMAC and SHA-256 settings
      false, // Whether the key is extractable (i.e., can be used in exportKey)
      ["sign"] // Specify that the key should be used for signing only
    );

    // Create HMAC SHA256 hash
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(message) // Convert message to an ArrayBuffer
    );

    // Convert the ArrayBuffer to a Base64 string
    return bufferToBase64(signature);
  } catch (error) {
    console.error("Error during HMAC generation:", error);
    throw error;
  }
}

/**
* Converts an ArrayBuffer to a Base64 string.
* @param buffer The ArrayBuffer to convert.
* @returns The Base64-encoded string.
*/
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binaryString = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  return btoa(binaryString);
}

// Initialize the Cognito Identity Provider client
const client = new CognitoIdentityProviderClient({
  region: "us-west-2", // Adjust the region as needed
});

export async function signIn() {

  const secretHash = await generateHmacSha256Base64('GoPalFrontend', "5ekk7qoqjtqgk6fh4cpp9tiujj", '13cblbilab5mkpe7btldqj29g0rv3bqnb7u8qhg0l1h83574c85b');

  // FWBzzpUXou1jyMMZaHzVPu8blD9NI7+tcfQn2Jafw0o=
  console.log(secretHash);
  const params = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: "5ekk7qoqjtqgk6fh4cpp9tiujj",
    SecretHash: "UgFyXtfipQOtfvM3s6pQjrNYZoBsI+jKXLcyGyPdcjw=",
    AuthParameters: {
      USERNAME: 'GoPalFrontend',
      PASSWORD: 'R0291db9-a81f-4096-85f4-946d07108cff',
      SECRET_HASH: "dzbU1aZf+AEVJ2neWE+WBVFUgNFdG1q5YyJdSpgUWcY="
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await client.send(command);
    return response.AuthenticationResult?.IdToken; // Return only the ID token
  } catch (error) {
    console.error("Error authenticating", error);
    throw error;
  }
}

export async function fetchProtectedResource(idToken: string) {
  const url = "https://tn50uc6px2.execute-api.us-west-2.amazonaws.com/prod/v1/search-destination?query=Vancouver"; // The URL of the protected resource

  try {
    const response = await fetch(url, {
      method: 'GET', // Adjust according to your needs: GET, POST, etc.
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json; charset=utf-8',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Protected resource data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching protected resource:", error);
  }
}

// Example usage
// signIn()
//   .then(idToken => {
//     if (idToken) {
//       return fetchProtectedResource(idToken);
//     } else {
//       throw new Error('Authentication failed: No ID token received.');
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
