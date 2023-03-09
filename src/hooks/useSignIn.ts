import { useApolloClient, useMutation } from "@apollo/client";

import { useAuthStorage } from "../contexts/AuthStorageContext";
import { AUTHENTICATE } from "../graphql/mutations";
import { AuthenticateResult, LoginFormValues } from "../types";

const useSignIn = () => {
  const [authenticate, result] = useMutation<AuthenticateResult>(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }: LoginFormValues) => {
    const result = await authenticate({
      variables: {
        credentials: { username, password },
      },
    });
    await authStorage?.setAccessToken(
      result.data?.authenticate.accessToken ?? ""
    );
    apolloClient.resetStore();
    return result;
  };

  return [signIn, result] as [typeof signIn, typeof result];
};

export default useSignIn;
