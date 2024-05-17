import EndpointProvider, {
  GetBeerResponseContent,
  GetItineraryRequestContent,
  GetItineraryResponseContent,
  GoPal,
  SearchDestinationResponseContent,
} from 'gopalapimodel';
import { getDefaultApiToken } from './tokenutil';
import { checkEnvVariables } from './commonutil';

// Utility to create the API client
async function createApiClient(): Promise<GoPal> {
  const apiToken = await getDefaultApiToken();
  const stage = process.env.REACT_APP_STAGE || '';
  const region = process.env.REACT_APP_AWS_REGION || '';
  return new GoPal({
    BASE: EndpointProvider.getEndpoint(stage, region),
    TOKEN: apiToken,
  });
}

// Global variable to hold the API client
let apiClient: GoPal | undefined;

// Initializes and maintains the API client
async function initializeApiClient() {
  checkEnvVariables(['REACT_APP_STAGE', 'REACT_APP_AWS_REGION']);
  apiClient = await createApiClient();
  // Ping Lambda
  apiClient.default.getBeer();
  scheduleTokenRefresh();
}

// Periodically refreshes the API client token
function scheduleTokenRefresh() {
  setInterval(async () => {
    console.log('Refreshing token and recreating API client...');
    apiClient = await createApiClient();
    console.log('API client refreshed successfully!');
  }, 1800000); // 1800000 ms = 30 minutes
}

type ApiClientMethod<T> = (client: GoPal) => Promise<T>;

// Helper function to execute API client methods safely
async function executeApiClientMethod<T>(
  method: ApiClientMethod<T>
): Promise<T> {
  if (!apiClient) {
    throw new Error('ApiClient is not initialized or is unavailable.');
  }
  return method(apiClient);
}

const apiClientWrapper = {
  getBeer: async (): Promise<GetBeerResponseContent> => {
    return executeApiClientMethod((client) => client.default.getBeer());
  },

  searchDestination: async (
    query: string
  ): Promise<SearchDestinationResponseContent> => {
    return executeApiClientMethod((client) =>
      client.default.searchDestination(query)
    );
  },

  getItinerary: async (
    request: GetItineraryRequestContent
  ): Promise<GetItineraryResponseContent> => {
    return executeApiClientMethod((client) =>
      client.default.getItinerary(request)
    );
  },
};

initializeApiClient().catch((error) => {
  console.error('Failed to initialize the API client:', error);
});

export { apiClientWrapper as apiClient };
