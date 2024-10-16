import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    getProducts {
        name
        category
        cost
        description
    }
}
`;