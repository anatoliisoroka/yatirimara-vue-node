import gql from "graphql-tag";

export const DOCUMENTS = gql`
  query (
    $campaign_id: ID!
    $type: String
    ) {
      documents(
        campaign_id: $campaign_id
        type: $type
      ){
        _id
        campaign_id
        name
        url
        createdAt
        type
        }
      }
`
export const DOCUMENT_CREATE = gql`
  mutation (
    $campaign_id: ID! 
    $file: Upload! 
    $name: String! 
    $type: String!
    ) {
      document_create(         
        campaign_id: $campaign_id
        file: $file
        name: $name
        type: $type)
      }
`
export const DOCUMENT_DELETE = gql`
  mutation ($_id: ID!) {
      document_delete(_id: $_id) {
          code
          data
      }
  }
`