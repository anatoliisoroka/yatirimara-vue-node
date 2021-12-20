import Cookie from 'js-cookie'
const token_user = 'invest_user'

export function getUserCookie(){
    const user = Cookie.get(token_user)
    // console.log(user, JSON.parse(user))
    return user ? JSON.parse(user) : null
}
export function setUserCookie(user){
    return Cookie.set(token_user, user, { expires: 7 })
}
export function removeUserCookie(){
    return Cookie.remove(token_user)
}