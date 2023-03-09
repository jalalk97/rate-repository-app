import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { AuthenticateResult, LoginFormValues } from "../types";

const useSignIn = () => {
  const [authenticate, result] = useMutation<AuthenticateResult>(AUTHENTICATE);

  const signIn = async ({ username, password }: LoginFormValues) => {
    const result = await authenticate({
      variables: {
        credentials: { username, password },
      },
    });
    return result;
  };

  return [signIn, result] as [typeof signIn, typeof result];
};

export default useSignIn;
