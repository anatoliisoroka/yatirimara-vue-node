export default ({app, route, redirect}) => {
   const hasToken = !!app.$apolloHelpers.getToken()
   if (!hasToken) {
      if (route.name == 'login') return
      else {
         if (route.name == 'index') location.reload();
         else {
            redirect(`/`)
         }
      }
   }
 }