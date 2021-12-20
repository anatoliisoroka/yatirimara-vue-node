import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import toastr from 'toastr'
export default function (context) {
  const httpEndpoint = "/graphql";
  const link = onError(({ graphQLErrors }) => {
    let message = "Something's wrong"
    let title = 'Error'
    const i18n = context.app.i18n
    graphQLErrors.forEach(err => {
      // do things
      switch (err.extensions.code) {
        case 'INTERNAL_SERVER_ERROR':
          title = err.extensions.exception?.name
          if (title == 'MongoError') {
            const kk = Object.keys(err.extensions.exception.keyPattern)[0]
            const vv = err.extensions.exception.keyValue[kk]
            if (err.extensions.exception.code == 11000) message = `${vv} already exist`
            else message = "Database Error: " + vv + "; CODE: " + err.extensions.exception.code
          }
          else if (err.extensions.exception.errors) {
            const errors = err.extensions.exception.errors
            if (Array.isArray(errors)) {
              message = err.message
            }
            else {
              const kk = Object.keys(errors)[0]
              const kk_title = i18n.t(kk)
              title = errors[kk].name
              let kind = errors[kk]['kind']
              if (kind == 'user defined') kind = errors[kk]['message']
              message = i18n.t(`valid.${kind}`, [kk_title])
            }
          }
          else {
            title = 'INTERNAL_SERVER_ERROR'
            message = err.message
          }
          break;
        case 'UNAUTHENTICATED':
          title = "UNAUTHENTICATED"
          const msg_key = i18n.t(`form.${err.message}`)
          message = i18n.t(`valid.fail`, [msg_key])
          context.$apolloHelpers.onLogout()
          if (context.route.name != 'index') context.redirect('/')
          break;
        case 'EXPIRED':
          title = "EXPIRED"
          message = err.message + ' is Expired'
          break;
        case 'NO_ACTIVE':
          title = "Activation Error"
          message = err.message + ' is not activated'
          break;
        case 'FINISH':
          title = "Warning"
          message = err.message + ' is already finished'
          break;
        case 'DUPLICATE':
          title = "Warning"
          message = err.message + ' already exist'
          break;
        case '404':
          title = "404"
          message = err.message + ' does not exist'
        default:
          break;
      }
    });
    toastr.error(
      message,
      title,
      {
        progressBar: true,
        showDuration: 0,
        hideDuration: 10,
        timeout: 4000
      }
    )
  });

  return {
    link,
    httpEndpoint,
    cache: new InMemoryCache({
      addTypename: false
    })
  };
}
