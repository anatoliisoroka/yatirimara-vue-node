export default ({app, route, redirect, store}) => {
   if (!store.state.auth.user.role || !store.state.auth.user.role.length) {
      if (route.name == 'complete-profile') return
      else {
         redirect(`/complete-profile`)         
      }
   }
 }