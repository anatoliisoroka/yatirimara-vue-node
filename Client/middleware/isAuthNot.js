export default ({app, error, redirect}) => {
   const hasToken = !!app.$apolloHelpers.getToken()
   if (hasToken) {
     redirect('/')
   }
 }