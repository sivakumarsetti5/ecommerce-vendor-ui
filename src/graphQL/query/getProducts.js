import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
  getProducts {
    category
    cost
    description
    filePath
    name
  }
}
`;