export default ({ redirect, store }) => {
   if (store.state.auth.user.role.length) {
      redirect(`/my/profile`)       
   }
 }