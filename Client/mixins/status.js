export default {
  methods: {
    getStatus(item) {
      let status = {};
      switch (item.status) {
        case 3:
          const cur_day = this.$moment().utcOffset(3).format("YYYY-MM-DD");
          if (
            cur_day >= item.event_start &&
            this.$moment() >= this.$moment(item.published_at)
          ) {
            status = {
              v: "in",
              html: `<p class="py-2 px-4 rounded text-white" style="background-color: #c4c4c4e6">In-funding</p>`,
            };
          } else
            status = {
              v: "soon",
              html: `<p class="py-2 px-4 rounded text-white" style="background-color: #1BA5D4e6">Comming soon</p>`,
            };
          break;
        case 4:
          status = {
            v: "complete",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color:#1CCB00e6">Successful</p>`,
          };
          break;
        case 7:
          status = {
            v: "faild",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color: #F37335e6">Failed</p>`,
          };
          break;
        case 0:
          status = {
            v: "faild",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color: #F37335e6">New</p>`,
          };
          break;
        case 1:
          status = {
            v: "faild",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color: #F37335e6">Submited for approving</p>`,
          };
          break;
        case 2:
          status = {
            v: "approved",
            html: `<p class="py-2 px-4 rounded text-white bg-success">Approved</p>`,
          };
          break;
        case 5:
          status = {
            v: "faild",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color: #F37335e6">Approve-Rejected</p>`,
          };
          break;
        case 6:
          status = {
            v: "faild",
            html: `<p class="py-2 px-4 rounded text-white" style="background-color: #F37335e6">Publish-Rejected</p>`,
          };
          break;
        default:
          status = {
            v: "??",
            html: `<p class="py-2 px-4 rounded text-white bg-primary">??</p>`,
          };
          break;
      }
      return status;
    },
  },
}
