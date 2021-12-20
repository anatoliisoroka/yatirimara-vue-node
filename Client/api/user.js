import gql from "graphql-tag";

export const UPDATE_PROFILE = gql`
  mutation (
    $form: UserInput!
    ) {
      update_profile(
         form: $form)
}
`

export const QUALIFY = gql`
  mutation {
    qualify
  }
`

export const UPDATE_PIC = gql`
  mutation (
    $pic: Upload!
    ) {
      update_pic(
        pic: $pic){
          _id
          name_first
          name_last
          phone_code
          phone
          email
          sex
          pic
          academic
          website
          social_mail
          social_twitter
          social_youtube
          social_linkedin
          social_facebook
          social_instagram
          ID_number
          birth
          nationality
          country
          city
          district
          post_code
          address
          education_status
          what_is_your_job
          sector_in_which_it
          experience
          role
        }
}
`