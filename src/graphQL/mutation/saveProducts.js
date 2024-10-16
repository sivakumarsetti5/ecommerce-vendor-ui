import { gql } from "@apollo/client";

export const SAVE_PRODUCTS = gql`
  mutation Mutation($productInput: ProductInput) {
    saveProduct(productInput: $productInput)
    }
`;