import Vue from 'vue'
import toastr from 'toastr'
Vue.mixin({
  computed: {
    loggedIn: function () {
      return !!this.$apolloHelpers.getToken()
    }
  },
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.back()
      } else
        this.$router.push({ path: '/' })
    },
    validate(name, form = 'form') {
      const {
        $dirty,
        $error
      } = this.$v[form][name];
      return $dirty ? !$error : null;
    },
    anyError(form = "form") {
      this.$v[form].$touch();
      return this.$v[form].$anyError;
    },
    getMessage(name, form = 'form') {
      const validationParams = this.$v[form][name]?.$params
      const keys = Object.keys(validationParams)
      let invalidKey = ''
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        if (!this.$v[form][name][element]) {
          invalidKey = element;
          break;
        }
      }
      let messageTxt = ''
      switch (invalidKey) {
        case 'required':
          messageTxt = this.$t('valid.required', [''])
          break;

        case 'minLength':
          messageTxt = this.$t('valid.min.string', [validationParams[invalidKey]['min']])
          break;

        case 'maxLength':
          messageTxt = this.$t('valid.max.string', [validationParams[invalidKey]['max']])
          break;
        case 'maxValue':
          messageTxt = `less than ${validationParams[invalidKey]['max']}`
          break;

        case 'email':
          messageTxt = this.$t('valid.email')
          break;
        case 'url':
          messageTxt = this.$t('valid.url', [''])
          break;
        case 'sameAs':
          messageTxt = this.$t('valid.same', [validationParams[invalidKey]['eq']])
          break;

        default:
          messageTxt = this.$t('valid.fail', [''])
          break;
      }
      return messageTxt
    },
    // Message Alert
    successMsg(message) {
      toastr.success(
        message || "Success!",
        "Sucess",
        {
          progressBar: true,
          showDuration: 0,
          hideDuration: 10,
          timeout: 4000
        }
      )
    },
    errorMsg(message) {
      toastr.error(
        message || "Something's wrong",
        "Failed",
        {
          progressBar: true,
          showDuration: 0,
          hideDuration: 10,
          timeout: 4000
        }
      )
    },
    // Object path get
    // gsv(object, ['key', 'key', 'key'], [])
    gsv(o, p, value_null = null) {
      return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : value_null, o)
    },
    // OnlyNumber
    onlyNumber(e) {
      const charCode = e.which ? e.which : e.keyCod;
      console.log(charCode, "charCode")
      if ((charCode > 47 && charCode < 58)) {
        return true;
      } else {
        e.preventDefault();
      }
    },
    // OnlyNumber and Space for verification
    onlyNumberAndSpace(e) {
      const charCode = e.which ? e.which : e.keyCod;
      if (
        [32, 43].includes(charCode) || (charCode > 47 && charCode < 58)) {
        return true;
      } else {
        e.preventDefault();
      }
    },
    fileExt(fileName) {
      if (fileName) {
        const mm = fileName.split(".");
        if (mm.length) {
          return mm[mm.length - 1];
        }
        else return ''
      }
      return "";
    },
  },
  filters: {
    formatN(vv) {
      return vv ? new Intl.NumberFormat('de-DE').format(vv) : 0
    }
  },
})