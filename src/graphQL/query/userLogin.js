import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  query Query($userLoginData: userInput) {
  handleLogin(userLoginData: $userLoginData)
}
`;