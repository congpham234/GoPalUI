import EndpointProvider, { GoPal } from 'gopalapimodel'
import { getDefaultApiToken } from './tokenutil'
import { checkEnvVariables } from './commonutil'

// Function to create the API client with a fresh token
async function createApiClient(): Promise<GoPal> {
  const apiToken = await getDefaultApiToken()
  return new GoPal({
    BASE: EndpointProvider.getEndpoint(
      process.env.REACT_APP_STAGE!,
      process.env.REACT_APP_AWS_REGION!
    ),
    TOKEN: apiToken,
  })
}

// Encapsulate client initialization and token refresh in an async function
async function initializeApiClient() {
  checkEnvVariables(['REACT_APP_STAGE', 'REACT_APP_AWS_REGION'])
  apiClient = await createApiClient()
  scheduleTokenRefresh()
}

// Schedule token refresh every 10 minutes and recreate the apiClient
function scheduleTokenRefresh() {
  setInterval(async () => {
    try {
      console.log('Refreshing token and recreating API client...')
      apiClient = await createApiClient()
      console.log('API client refreshed successfully!')
    } catch (error) {
      console.error('Failed to refresh API client:', error)
    }
  }, 600000) // 600000 ms = 10 minutes
}

// Global variable to hold the API client
let apiClient: GoPal | undefined

initializeApiClient().catch((error) => {
  console.error('Failed to initialize the API client:', error)
})

// Define apiClient as an object with methods
const apiClientWrapper = {
  getBeer: async () => {
    if (!apiClient) {
      throw new Error('ApiClient is not initialized or is unavailable.')
    }
    return await apiClient.default.getBeer()
  },
}

export { apiClientWrapper as apiClient }
