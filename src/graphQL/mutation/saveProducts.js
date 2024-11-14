import { gql } from "@apollo/client";

export const SAVE_PRODUCTS = gql`
  mutation SaveProduct($file: Upload, $productInput: ProductInput) {
  saveProduct(file: $file, productInput: $productInput)
}
`;