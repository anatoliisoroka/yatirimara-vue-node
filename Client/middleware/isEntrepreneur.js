export default ({app, route, redirect, store}) => {
   if (!store.state.auth.user.role.includes(2)) {      
      redirect(`/404`)         
   }
 }