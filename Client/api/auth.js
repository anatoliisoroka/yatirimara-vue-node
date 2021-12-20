import gql from "graphql-tag";

export const LOGIN = gql`
  mutation (
    $token: String!
    ) {
    login(
      token: $token
    ){
      access_token
      user{
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
        follows
      }
    }
}
`
export const LOGIN_BY_ADMIN = gql`
  query (
    $token: String!
    ) {
    login_by_admin(
      token: $token
    ){
      access_token
      user {
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
        active
        admin
        follows
      }
    }
}
`
export const ME = gql`
  query {
    me{        
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
      MKK
      income_statement_url
      education_status
      what_is_your_job
      sector_in_which_it
      experience
      role
      admin
      active
      follows
      notification{
        email_week
        email_company
        email_project
        sms
      }
      qualified_investor
      createdAt
      updatedAt       
      }
}
`
export const SENDSMS = gql`
  mutation (
    $phone_code: String!, 
    $phone: String!, 
    $token: String!) {
      sendSMS(
        phone_code: $phone_code, 
        phone: $phone, 
        token: $token) {
          code
          data
          error
        }
}
`
export const COMPLETE_PROFILE = gql`
  mutation (
    $phone_code: String!
    $phone: String!
    $code: String!
    $name_last: String!            
    $name_first: String!            
    $country: String           
    $role: [Int]!
    $individual: Boolean!) {
      complete_profile(
        phone_code: $phone_code
        phone: $phone
        code: $code
        name_last: $name_last
        name_first: $name_first
        country: $country
        role: $role
        individual: $individual
        ) {
          code
          data
        }
}
`
