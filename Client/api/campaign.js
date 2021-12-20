import gql from "graphql-tag";

export const campaignFragment = gql`
fragment campaignFragment on Campaign {
  _id
  logo
  name
  name_enterprise
  description
  description1
  description2
  stage
  category
  business_models
  locations
  status
  bg
  event_start
  event_end
  published_at
  user_id
  createdAt
  updatedAt
  # computed value
  progress  
  fund {
    amount
  }
}
`

export const CAMPAIGNS = gql`
  query (
    $limit: Int
    $page: Int
    $keyword: String
    ) {
      campaigns(
        limit: $limit
        page: $page
        keyword: $keyword
      ){
        total
        items {
          ...campaignFragment
        }
      }
  }
  ${campaignFragment}
`

export const EVENTS = gql`
  query (
    $limit: Int
    $page: Int
    $keyword: String
    $status: Int
    $sectors: [Int]
    $category: Int
    ) {
      events(
        limit: $limit
        page: $page
        keyword: $keyword
        status: $status
        sectors: $sectors
        category: $category
      ){
        total
        items {
          ...campaignFragment
        }
      }
  }
  ${campaignFragment}
`
export const FOLLOWS = gql`
  query{
      follows {
        ...campaignFragment
      }
  }
  ${campaignFragment}
`
export const BANNERS = gql`
  query (
    $limit: Int
    ) {
      active:events(
        limit: $limit
        status: 3        
      ){
        total
        items {
          ...campaignFragment
        }
      }
      soon:events(
        limit: $limit
        status: 2        
      ){
        total
        items {
          ...campaignFragment
        }
      }
      banners{
        _id
        title
        campaign_id
        description
        bg
      }
  }
  ${campaignFragment}
`
export const CAMPAIGN = gql`
  query ($_id: ID!) {
      campaign( _id: $_id){   
          # profile  
          logo
          name
          name_enterprise
          description
          description1
          description2
          stage
          category
          business_models
          locations
          sectors
          # idea
          idea_title
          idea_title_sub
          idea_about
          bg
          # team
          team {
            _id
            name
            name_last
            position
            resume
            pic
            description
            duty
            area_experience
            source_relationship
            social_facebook
            social_linkedin
            social_twitter
            social_google
            social_instagram
            social_youtube
          }
          fund {
            title
            period_url
            report_url
            amount
            amount_min
            amount_want
            shares_percent
            shares_count
            post_funding_capital_url
            unit_sale_price_shares_url
            unit_nominal_value_shares
            want_20_percent_addtional_funding
            description_where_use_funds   
            events {
              date_start
              date_end
              amount
            }        
            description_additional
            events_additonal{
              date
              amount
            }
            description_comparison_cur_post
            description_basic_information
          } 
          event_end
          createdAt
          updatedAt
    }
      
}
`
export const EVENT = gql`
  query ($_id: ID!) {
    event( _id: $_id){   
          # profile  
          ...campaignFragment          
          # idea
          idea_title
          idea_title_sub
          idea_about          
          # team
          team {
            _id
            name
            name_last
            position
            resume
            pic
            description
            duty
            area_experience
            source_relationship
            social_facebook
            social_linkedin
            social_twitter
            social_google
            social_instagram
            social_youtube
           
          }
          fund {
            title
            period_url
            report_url
            amount
            amount_additonal
            amount_min
            amount_want
            shares_percent
            shares_count
            post_funding_capital_url
            unit_sale_price_shares_url
            unit_nominal_value_shares
            want_20_percent_addtional_funding
            description_where_use_funds
            events {
              date_start
              date_end
              amount
            }            
            description_additional
            events_additonal{
              date
              amount
            }
            description_comparison_cur_post
            description_basic_information
          }   
          investors {
            _id
            user {
              name_first
              name_last
              pic
              qualified_investor
            }
            paid
            paid_at
          }
          result_total_amount
          result_total_investors
          result_total_investors_q
        }
      
  }
  ${campaignFragment}
`
export const CREATE_CAMPAIGN = gql`
  mutation (
    $form: CampaignInput!
    ) {
      create_campaign(
         form: $form)
}
`
export const UPSERT_TEAM_MEMBER = gql`
  mutation (
    $_id: ID!
    $form: TeamMemberInput!
    ) {
      upsert_team_member(
         form: $form
         _id: $_id){
          _id
          team {            
            _id
            name
            name_last
            position
            resume
            pic
            description
            duty
            area_experience
            source_relationship
            social_facebook
            social_linkedin
            social_twitter
            social_google
            social_instagram
            social_youtube
          }
    }
}
`
export const UPDATE_CAMPAIGN = gql`
  mutation (
    $_id: ID!
    $form: CampaignInput!
    ) {
      update_campaign(
        _id: $_id,
        form: $form){
          # profile
          logo
          name
          name_enterprise
          description
          description1
          description2
          stage
          category
          business_models
          locations
          sectors
          # idea
          idea_title
          idea_title_sub
          idea_about
          bg
          # team
          team {
            _id
            name
            name_last
            position
            resume
            pic
            description
            duty
            area_experience
            source_relationship
            social_facebook
            social_linkedin
            social_twitter
            social_google
            social_instagram
            social_youtube
          }         
          
          createdAt
          updatedAt
         }
}
`
export const UPDATE_TEAM = gql`
  mutation (
    $_id: ID!
    $form: TeamInput!
    ) {
      update_team(
        _id: $_id,
        form: $form){          
          # team
          team {
            _id
            name
            name_last
            position
            resume
            pic
            description
            duty
            area_experience
            source_relationship
            social_facebook
            social_linkedin
            social_twitter
            social_google
            social_instagram
            social_youtube
          } 
         }
}
`
export const FUND_UPDATE = gql`
  mutation (
    $_id: ID!
    $form: FundInput!
    ) {
      fund_update(
        _id: $_id,
        form: $form){          
          # team
          fund {
            title
            period_url
            report_url
            amount
            amount_min
            amount_want
            shares_percent
            shares_count
            post_funding_capital_url
            unit_sale_price_shares_url
            unit_nominal_value_shares
            want_20_percent_addtional_funding
            description_where_use_funds
            events {
              date_start
              date_end
              amount
            }
            description_additional
            events_additonal{
              date
              amount
            }
            description_comparison_cur_post
            description_basic_information
          } 
        }
}
`

export const TEAM_MEMBER_DELETE = gql`
mutation ($_id: ID! $campaign_id: String!) {
  team_member_delete(_id: $_id campaign_id: $campaign_id) {
        code
        data
    }
}
`

export const TEAM_MEMBER_ORDERS = gql`
mutation ($order_ids: [String]! $campaign_id: ID!) {
  team_member_orders(order_ids: $order_ids campaign_id: $campaign_id) {
        code
    }
}
`
export const FOLLOW = gql`
mutation ($_id: ID!) {
  follow(_id: $_id) 
}
`