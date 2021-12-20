import gql from "graphql-tag";

export const THREADS = gql`
  query (
    $campaign_id: ID!
    ) {
      threads(
        campaign_id: $campaign_id
      ){
        _id
        title
        content
        answer_count
        createdAt
        }
      }
`
export const THREAD = gql`
  query (
    $_id: ID!
    ) {
        thread(
          _id: $_id
        ){
          _id
          title
          content
          user{
              _id
              name_first
              name_last
              pic
          }
          createdAt
          answer_count
          answers{
            content
            createdAt
            user {
              _id
              name_first
              name_last
              pic
            }
          }
        }
      }
`

export const DISCUSS_THREAD_CREATE = gql`
  mutation (
    $campaign_id: ID! 
    $title: String! 
    $content: String! 
    ) {
      discuss_thread_create(
        campaign_id: $campaign_id
        title: $title
        content: $content){  
          _id
      }        
          
}
`
export const DISCUSS_ANSWER_CREATE = gql`
  mutation (
    $thread_id: ID! 
    $content: String! 
    ) {
      discuss_answer_create(         
        thread_id: $thread_id
        content: $content){
          _id
        }
    }
`
export const DISCUSS_THREAD_DELETE = gql`
  mutation ($_id: ID!) {
    discuss_thread_delete(_id: $_id) {
          code
          data
      }
  }
`