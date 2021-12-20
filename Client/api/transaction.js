import gql from "graphql-tag";

export const MAKE_PAYMENT = gql`
  mutation (
    $campaign_id: ID!,
    $amount: Long!
    ) {
      make_payment(
        campaign_id: $campaign_id
        amount: $amount
      ){
        code
      }
}
`
export const MY_TRANSACTIONS = gql`
  query (
    $limit: Int
    $page: Int
    ) {
      my_transactions(
        limit: $limit
        page: $page
      ){
        total
        items{
          _id
          campaign {
            _id
            name
          }
          amount
          payment_method
          createdAt
        }
      }
}
`
export const MY_TRANSACTION_CHART = gql`
  query {
      my_transaction_chart
  }
`