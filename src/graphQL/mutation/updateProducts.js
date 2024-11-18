import{gql} from '@apollo/client'

export const UPDATE_PRODUCTS = gql`
    mutation Mutation($file: Upload, $productInput: UpdateProductInput) {
     updateProduct(file: $file, productInput: $productInput)
}
`