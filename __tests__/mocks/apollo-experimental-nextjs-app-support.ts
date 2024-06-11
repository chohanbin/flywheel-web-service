// Mocking GraphQL client
export const registerApolloClient = jest.fn(() => {
    return {
      getClient: () => ({
        query: jest.fn().mockResolvedValue({
          data: {
            // mock data
          },
        }),
      }),
    };
  });
