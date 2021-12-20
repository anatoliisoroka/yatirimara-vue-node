const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar JSON
    scalar Upload
    scalar Date
    scalar Long
    # super supervisor, staff(customer, accounting, marketing)
    enum ADMIN_ROLE { USER ROLE INVESTMENT PUBLISH ACCOUNTING CAMPAIGN BANNER }    
    enum SEX { male female }  
    enum Action {profile}  

    input NotificationInput {
        email_week: Boolean
        email_company: Boolean
        email_project: Boolean
        sms: Boolean
    }
    input UserInput {
        name_first: String
        name_last: String
        sex: SEX
        academic:  String
        website:  String
        social_mail: String
        social_twitter: String
        social_youtube: String
        social_linkedin: String
        social_facebook: String
        social_instagram: String
        #  Business & Investment
        ID_number: String
        birth: String
        nationality: String
        country: String
        city: String
        district: String
        post_code: Int
        address: String
        MKK: String
        income_statement_file: Upload
        income_statement_url: String
        # 
        education_status: String
        what_is_your_job: String
        sector_in_which_it: String
        experience: String
        # 
        role: [Int]
        individual: Boolean
        notification: NotificationInput
    }
    input TeamInput {
        description: String
        duty: String
        area_experience: String
        source_relationship: String
        social_facebook: String
        social_linkedin: String
        social_twitter: String
        social_google: String  
        social_instagram: String
        social_youtube: String
    }
    input TeamMemberInput {
        _id: ID
        file: Upload
        resume_file: Upload
        name: String!
        name_last: String!
        position: String
        resume: String
        description: String
        duty: String
        area_experience: String
        source_relationship: String
        social_facebook: String
        social_linkedin: String
        social_twitter: String
        social_google: String
        social_instagram: String
        social_youtube: String
    }
    input CampaignInput {
        # profile
        logo: Upload
        name: String
        name_enterprise:  String
        description:  String
        description1: String
        description2: String
        stage: String
        category: Int
        business_models: String
        locations: String
        sectors: [Int] 
        # Idea 
        idea_title: String 
        bg: String 
        idea_title_sub: String 
        idea_about: String    
        idea_file: Upload
    }
    input EventAddionalInput{
        date: String!
        amount: Long!
    }
    input EventInput{
        date_start: String,
        date_end: String,
        amount: Long!,
    }
    input FundInput {
        title: String!,
        file_period: Upload,
        file_report: Upload,
        period_url: String,
        report_url: String,
        amount: Long,
        amount_min: Long,
        amount_want: Long,
        shares_percent: Int,
        shares_count: String,
        # 
        file_post_funding_capital: Upload,
        post_funding_capital_url: String,
        file_unit_sale_price_shares: Upload,
        unit_sale_price_shares_url: String,
        unit_nominal_value_shares: String,
        want_20_percent_addtional_funding: Boolean,
        description_where_use_funds: String!,
        # 
        description_additional: String,
        events: [EventInput!]!
        events_additonal: [EventAddionalInput],
        description_comparison_cur_post: String,
        description_basic_information: String,
    }




    type Query {
        info: JSON,
        # ====================================================================================================================================================
        # Query For Admin
        # ====================================================================================================================================================
        """ Login with email or phone, password """
        admin_login(email_phone: String!, password: String!): LoginResponseAdmin
        """ Admin get own information"""
        admin_me: Admin
        """ Admin-Authenticated-'USER', Get Admins list"""
        admin_get(
            limit: Int
            page: Int
            keyword: String
            sortBy: String
            sortDesc: Boolean
            role_id: String
            ): Admins    
        """ Admin can get users """    
        admin_users(
            limit: Int, 
            page: Int
            keyword: String
            sortBy: String
            sortDesc: Boolean
            role_id: Int
        ): Users   

        """Admin can login with user credential""" 
        login_by_admin( token: String!): LoginResponse
        """ Admin-Authenticated-'ROLE', get all admin-roles"""
        roles: [Role]
        # ====================================================================================================================================================
        # Query For User
        # ====================================================================================================================================================
        """
            get information for authenticated user
        """        
        me: User

        """ Get Logs for authenticated user """        
        logs(limit: Int page: Int): Logs
        """ Get Campaign Status logs for authenticated user """        
        status_logs(_id: ID!): [StatusLog]
        """ Admin api, get all campaign """
        activities(
            limit: Int 
            page: Int 
            keyword: String 
            status: Int!): Campaigns
        """ Get authenticated user's, only their owned campaign """        
        campaign(_id: ID!): Campaign
        """ Get authenticated user's campaigns"""        
        campaigns(limit: Int page: Int keyword: String): Campaigns
        """ Get ducuments with campaign_id, Public API """        
        documents(campaign_id: ID! type: String): [Document]
        """ get campaign, Public API,  """
        events(
            limit: Int 
            page: Int 
            keyword: String 
            status: Int 
            sectors: [Int]
            category: Int): Campaigns
        """ get favorite campaigns, authenticated user,  """
        follows: [Campaign]
        
        """ get campaign, Public api,  """
        event(_id: ID!): Campaign

        """ Discussion api """
        threads(campaign_id: ID!): [Thread]
        thread(_id: ID!): Thread

        """ Transactions of authenticated user """
        my_transactions( limit: Int page: Int ): Transactions
        my_transaction_chart: JSON       
        """ Banners, public """ 
        banners: [Banner]
        """ All Banners for admin included active: false """
        admin_banners: [Banner]
    }









    type Mutation {
        # ====================================================================================================================================================
        #          Admin
        # ====================================================================================================================================================
        """ Admin-Authenticated, Update my profile"""
        admin_me_update(
            name: String!
            phone: String
            TC: Int
            password: String!
            pic: String
        ): Admin
        """ Admin-Authenticated-'ROLE'"""
        role_add(
            name: String!
            description: String
            permission: [ADMIN_ROLE]!
        ): Role
        """ Admin-Authenticated-'ROLE'"""
        role_update(
            _id: ID!
            name: String!
            description: String
            permission: [ADMIN_ROLE]!
        ): Role
        """ Admin-Authenticated-'ROLE'"""
        role_delete(_id: ID!): JSON

        """ Admin-Authenticated-'USER', Admin with role 'USER' can add new admin"""
        admin_add(
            name: String!
            phone: String
            email: String!
            TC: Int
            role_id: String!
            password: String
        ): Admin
        """ Admin-Authenticated-'USER', Admin with role 'USER' can update new admin"""
        admin_update(
            _id: ID!
            name: String!
            phone: String
            email: String!
            TC: Int
            role_id: String!
            password: String
            pic: String
            active: Boolean
        ): Admin

        """ Admin can generate user token,  
        use the token in Query.login_by_admin api, 
        then visit user profile page"""
        generate_user_token(_id: ID!): String!
        # ====================================================================================================================================================
        # Mutation User
        # ====================================================================================================================================================
        """ User Login by firebase token. With the token got by firebase, api will identify the token to register or login """
        login( token: String): LoginResponse
        sendSMS(phone_code: String!, phone: String!, token: String!): JsonResponse!
        
        """ User-Authenticated, add phone, country, role, individual, only when role has []  """
        complete_profile(
            phone_code: String!
            phone: String!
            code: String!
            name_last: String!            
            name_first: String!            
            country: String           
            role: [Int]!
            individual: Boolean!
        ): JsonResponse
        
        """ return  User JSON data, see type User for more datails about User Type"""
        update_profile(
            action: Action
            form: UserInput!
        ): JSON

        """ Update user pic , authenticated"""
        update_pic(pic: Upload!): User
        
        """ User with role Enterpreneur, """
        create_campaign(
            form: CampaignInput!
        ): JSON


        update_campaign(
            _id: ID!
            form: CampaignInput!
        ): Campaign
        """ Reject campaign with admin with Investment or Publish role """
        reject_campaign(
            _id: ID!
            reason: String!
        ): Campaign
        """ Accept campaign with admin with Investment or Publish role """
        accept_campaign(
            _id: ID!
            published_at: String
        ): Campaign
        """ Accept campaign with admin with Investment or Publish role """
        unpublish_campaign(
            _id: ID!
        ): Campaign

        """ User with role Enterpreneur, update team data"""
        update_team(
            _id: ID!
            form: TeamInput!
        ): Campaign
        """ user can add team member with _id: campaign id """
        upsert_team_member(
            _id: ID!
            form: TeamMemberInput!
        ): Campaign
        
        """ delete team member with _id: campaign id """
        team_member_delete(
            _id: ID!
            campaign_id: String!             
        ): JsonResponse
        
        team_member_orders(
            campaign_id: ID!
            order_ids: [String]): JsonResponse
        
        document_create(
            campaign_id: ID! 
            file: Upload! 
            name: String! 
            type: String! ): JSON
        document_delete(_id: ID!): JsonResponse
        """ _id: campaign_id """
        fund_update(_id: ID! form: FundInput!): Campaign
        """ Discussion api """
        discuss_thread_create(
            campaign_id: ID! 
            title: String!
            content: String!
        ): Thread
        """ Authenticated User """
        discuss_answer_create(
            thread_id: ID!
            content: String!
        ): Thread

        """ Only Admin can delete theread """
        discuss_thread_delete(
            _id: ID!
        ): JsonResponse
        """ Invester role user can make payment. campaign_id  """
        make_payment(
            campaign_id: ID!,
            amount: Long!
        ): JsonResponse
        """ Follow/Unfollow Toggle, authenticated user """
        follow(_id: ID!): [String]
        """ Qualify/UnQualify Toggle, return updated status, admin with user management role """
        qualify: Boolean
        """ Amin with BANNER ROLE """
        banner_upsert(
            _id: ID
            campaign_id: String
            title: String!
            description: String
            bg: String,
            bg_file: Upload
            position: String            
        ): Banner
        """ Toggle banner status, return toggled status """
        banner_toggle(_id: ID!): Boolean
        banner_delete(_id: ID!): JSON

    }










    # =======================
    # types
    # =======================
    type JsonResponse {
        code: Int!, 
        error: JSON, 
        data: JSON 
    }  

    type Admin{
        _id: String
        name: String
        phone: String
        email: String
        TC: Int
        pic: String
        role_id: String
        permission: [ADMIN_ROLE]
        active: Boolean
        createdAt: Date
        updatedAt: Date
    }
    type Admins{
        total: Int!
        items: [Admin]
    }
    type LoginResponseAdmin{
        access_token: String!
        user: Admin
    }
    type Notification {
        email_week: Boolean
        email_company: Boolean
        email_project: Boolean
        sms: Boolean
    }
    """ role []:user complete his/her profile, [1]: Investor, [2]: Enterpreneur, [1,2]:both"""
    type User{
        _id: ID!
        name_first: String
        name_last: String
        phone_code: String
        phone: String
        email: String!
        sex: SEX
        pic: String
        academic:  String
        website:  String
        social_mail: String
        social_twitter: String
        social_youtube: String
        social_linkedin: String
        social_facebook: String
        social_instagram: String
        # 
        ID_number: String
        birth: String
        nationality: String
        country: String
        city: String
        district: String
        post_code: Int
        address: String
        MKK: String
        income_statement_url: String
        # 
        education_status: String
        what_is_your_job: String
        sector_in_which_it: String
        experience: String
        # 
        notification: Notification
        # 
        follows: [String]
        role: [Int]
        qualified_investor: Boolean
        active: Boolean
        admin: String
        createdAt: Date
        updatedAt: Date
    }    
    type Users{
        total: Int!
        items: [User]
    } 
    type Investor {
        _id: ID
        paid: String
        user: User
        paid_at: Date
    }
    type LoginResponse{
        access_token: String!
        user: User
    }  

    type Role{
        _id: ID!
        name: String!
        description: String
        permission: [ADMIN_ROLE]
    } 
    type Log {
        _id: ID!
        user_id: String
        ip: String
        browser: String
        status: Boolean
        createdAt: Date
    }
    type Logs{
        total: Int!
        items: [Log]!        
    } 
    type TeamMember {
        _id: ID
        name: String
        name_last: String
        position: String
        pic: String
        resume: String
        description: String
        duty: String
        area_experience: String
        source_relationship: String
        social_facebook: String
        social_linkedin: String
        social_twitter: String
        social_google: String
        social_instagram: String
        social_youtube: String
    }    

    type EventAddional {
        date: String
        amount: Long
    }
    type Event{
        date_start: String,
        date_end: String,
        amount: Long,
    }

    type Fund {
        title: String,
        period_url: String,
        report_url: String,
        amount: Long,
        amount_min: Long,
        amount_want: Long,
        shares_percent: Int,
        shares_count: String,
        post_funding_capital_url: String,
        unit_sale_price_shares_url: String,
        unit_nominal_value_shares: String,
        want_20_percent_addtional_funding: Boolean,
        description_where_use_funds: String
        description_additional: String
        events: [Event]
        events_additonal: [EventAddional],
        amount_additonal: String
        description_comparison_cur_post: String,
        description_basic_information: String
    }
    """ Rejected Reason """
    type Rejected {
        createdAt: Date
        reason: String
        user_id: String
    }
    """    
    - status

    0: new          // new profile is not completed, user is entering the content 
    1: requested    // completed profile,  send to "Investment Commitee", 
    2: pending      // approved by "Investment Committe", 
    3: in-funding   // approved by "Publication Committee", 
    4: closed       // 100% funded or 120% funded.    
    """
    type Campaign {
        _id: ID
        logo: String
        name: String
        name_enterprise: String
        description: String
        description1: String
        description2: String
        stage: String
        category: Int
        business_models: String
        locations: String
        sectors: [Int] 
        # idea
        idea_title: String 
        idea_title_sub: String 
        idea_about: String 
        bg: String
        # Team
        team: [TeamMember]    
        # Fund
        fund: Fund
        event_start: String
        event_end: String
        user_id: String
        user: User
        approved_admin: Admin
        approved_at: Date
        published_admin: Admin
        published_at: Date

        status: Int
        rejected: Rejected
        createdAt: Date
        updatedAt: Date 
        # computed values
        result_total_investors: Int
        result_total_investors_q: Int
        result_total_amount: Long
        progress: Float
        # 
        investors: [Investor]
    }
    type Campaigns {
        total: Int!
        items: [Campaign]
    }

    type Document {
        _id: ID
        campaign_id: String
        name: String
        url: String
        createdAt: Date
        type: String
    }
    type ThreadAnswer {
        _id: ID
        content: String
        createdAt: Date
        user_id: String
        user: User
    }
    type Thread {
        _id: ID
        title: String
        content: String
        user_id: String
        user: User
        answer_count: Int
        answers: [ThreadAnswer]
        createdAt: Date
    }
    type Transaction {
        _id: ID
        user_id: String
        campaign_id: String
        campaign: Campaign
        amount: Long
        payment_method: Long
        createdAt: Date        
    }
    type Transactions {
        total: Int
        items: [Transaction]
    }
    type StatusLog {
        _id: ID
        status: Int
        admin: Admin
        description: String
        createdAt: Date
    }
    type Banner {
        _id: ID
        campaign_id: String
        title: String
        description: String
        bg: String
        bg_file: Upload
        position: String 
        active: Boolean
        createdAt: Date
        updatedAt: Date
    }
`
