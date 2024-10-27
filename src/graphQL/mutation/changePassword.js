import { gql } from "@apollo/client";

export const CHANGE_PWD = gql`
mutation Mutation($changePasswordId: String, $newPwd: String, $pwd: String) {
  changePassword(id: $changePasswordId, newPwd: $newPwd, pwd: $pwd)
}
`