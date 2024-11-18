import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GetProducts($vendorId: String) {
  getProducts(vendorId: $vendorId) {
    _id
    name
    category
    cost
    description
    filePath
  }
}
`;