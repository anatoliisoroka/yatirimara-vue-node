import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from '~/lang/en'
import trLocale from '~/lang/tr'

const cookieparser = process.server ? require('cookieparser') : undefined

Vue.use(VueI18n)

const messages = {
  en: enLocale,
  tr: trLocale,  
}

export default ({app, store, req}, inject) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  let lang = 'tr'
  if(process.server){
    if (req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(req.headers.cookie)
        lang = parsed.lang || 'tr'        
      } catch (err) {
        // No valid cookie found
        console.log(err)
      }
    }
  }
  else{
    // Temporary pre auth cookie remove before sharing pc cookie -user-
    Cookies.remove('auth')
    lang = Cookies.get('lang')
    if (!lang){
      lang='tr'
      Cookies.set('lang', 'tr')
    }
    // console.log("i18n--------------->", "client", lang)
  }  
  app.i18n = new VueI18n({
    locale: lang,
    fallbackLocale: 'tr',
    messages
  })

}