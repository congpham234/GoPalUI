import EndpointProvider, { GoPal } from 'gopalapimodel'
import { getDefaultApiToken } from './tokenutil'
import { checkEnvVariables } from './commonutil'

// Utility to create the API client
async function createApiClient(): Promise<GoPal> {
  const apiToken = await getDefaultApiToken()
  const stage = process.env.REACT_APP_STAGE || ''
  const region = process.env.REACT_APP_AWS_REGION || ''
  return new GoPal({
    BASE: EndpointProvider.getEndpoint(stage, region),
    TOKEN: apiToken,
  })
}

// Global variable to hold the API client
let apiClient: GoPal | undefined

// Initializes and maintains the API client
async function initializeApiClient() {
  checkEnvVariables(['REACT_APP_STAGE', 'REACT_APP_AWS_REGION'])
  apiClient = await createApiClient()
  keepLambdaAlive()
  scheduleTokenRefresh()
}

// Periodically refreshes the API client token
function scheduleTokenRefresh() {
  setInterval(async () => {
    console.log('Refreshing token and recreating API client...')
    apiClient = await createApiClient()
    console.log('API client refreshed successfully!')
  }, 1800000) // 1800000 ms = 30 minutes
}

// Keeps the Lambda function warm
function keepLambdaAlive() {
  // Immediately call the method once before starting the interval
  if (apiClient) {
    apiClient.default.getBeer().catch((error) => {
      console.error('Failed to keep Lambda alive on initial call:', error)
    })
  }

  // Then set up the interval to repeat the call every 10 seconds
  setInterval(() => {
    try {
      if (apiClient) {
        apiClient.default.getBeer()
      }
    } catch (error) {
      console.error('Failed to keep Lambda alive:', error)
    }
  }, 10000) // 10000 ms = 10 seconds
}

type ApiClientMethod<T> = (client: GoPal) => Promise<T>

// Helper function to execute API client methods safely
async function executeApiClientMethod<T>(
  method: ApiClientMethod<T>
): Promise<T> {
  if (!apiClient) {
    throw new Error('ApiClient is not initialized or is unavailable.')
  }
  return method(apiClient)
}

const apiClientWrapper = {
  getBeer: async (): Promise<any> => {
    return executeApiClientMethod((client) => client.default.getBeer())
  },

  searchDestination: async (query: string): Promise<any> => {
    return executeApiClientMethod((client) =>
      client.default.searchDestination(query)
    )
  },
}

initializeApiClient().catch((error) => {
  console.error('Failed to initialize the API client:', error)
})

export { apiClientWrapper as apiClient }
