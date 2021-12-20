import {
  UPDATE_PROFILE
} from "@/api/user";
export default {
  methods: {
    async hSubmit(form) {
      const res = await this.$apollo.mutate({
        mutation: UPDATE_PROFILE,
        variables: {
          form,
        },
        fetchPolicy: "no-cache",
      });
      if (res?.data?.update_profile) {
        this.$store.dispatch("auth/setUser", res.data.update_profile);
        this.successMsg('Successfully Updated!')
      }
    },
  },
}
