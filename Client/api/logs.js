import gql from "graphql-tag";

export const LOGS = gql `
  query (
    $limit: Int
    $page: Int
    ) {
      logs(
        limit: $limit
        page: $page
      ){
        total
        items{
          createdAt
          ip
          browser
          status
        }
      }
}
`