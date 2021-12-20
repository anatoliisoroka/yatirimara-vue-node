export default ({app, route, redirect, store}) => {
   if (!store.state.auth.user.role.includes(1)) {      
      redirect(`/404`)         
   }
 }