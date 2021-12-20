const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const Schema = mongoose.Schema;

let TeamMember = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: String,
    name_last: String,
    position: String,
    pic: String,
    resume: String,
    description: String,
    duty: String,
    area_experience: String,
    source_relationship: String,
    social_facebook: String,
    social_linkedin: String,
    social_twitter: String,
    social_google: String,
    social_instagram: String,
    social_youtube: String,
});
let EventAddional = new Schema({
    date: String,
    amount: Long,
});
let Event = new Schema({
    date_start: String,
    date_end: String,
    amount: Long,
});
let Campaign = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        required: true,
    },
    // profile
    logo: {
        type: String,
    },
    name: {
        type: String,
    },
    name_enterprise: {
        type: String,
    },
    description: {
        type: String,
    },
    description1: {
        type: String,
    },
    description2: {
        type: String,
    },
    stage: {
        type: String,
    },
    // 0: all, 1: technology(virtual), 2: production
    category: Number,
    business_models: {
        type: String,
    },
    locations: {
        type: String,
    },
    sectors: {
        type: [Number],
        default: []
    },
    // idea 
    idea_title: String,
    idea_title_sub: String,
    idea_about: String,
    bg: String,
    // teams
    team: [TeamMember],
    fund: {
        title: String,
        period_url: String,
        report_url: String,
        // target amount
        amount: Long,
        amount_min: Long,
        amount_want: Long,
        shares_percent: Number,
        shares_count: String,
        post_funding_capital_url: String,
        unit_sale_price_shares_url: String,
        unit_nominal_value_shares: String,
        want_20_percent_addtional_funding: Boolean,
        //
        description_where_use_funds: String,
        description_additional: String,
        // Milestone
        events: [Event],
        // 
        events_additonal: [EventAddional],
        description_comparison_cur_post: String,
        description_basic_information: String,
    },
    // computed max value from fund.events
    event_start: String,
    event_end: String,

    /* 
    0: new          // new profile is not completed, user is entering the content 
    1: requested    // completed profile,  send to "Investment Commitee", 
    2: pending      // approved by "Investment Committe", 
    3: in-funding   // published by "Publication Committee", 
    4: closed       // 100% funded or 120% funded.
    5: rejected     // IC(Investment Committee)
    6: rejected     // PC(Publishment Committee)
    7; failed       // During the deadline period, the funding failed to 100% funds
    */
    status: {
        type: Number,
        default: 0
    },
    approved_by: String,
    approved_at: Date,
    published_by: String,
    published_at: Date,
    rejected: {
        createdAt: Date,
        reason: String,
        user_id: String,
    },
}, {
    collection: 'campaign',
    timestamps: true
});


module.exports = mongoose.model('Campaign', Campaign);