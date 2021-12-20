var CryptoJS = require("crypto-js");
const { ForbiddenError, AuthenticationError, UserInputError, ApolloError } = require('apollo-server');
const fs = require("fs");
const moment = require('moment')

var encrypt = function (text) {
  var ciphertext = CryptoJS.AES.encrypt(text, process.env.SECRET_TOKEN, {
    mode: CryptoJS.mode.ECB
  }).toString()
  return ciphertext;
};

var decrypt = function (text) {
  var bytes = CryptoJS.AES.decrypt(text, process.env.SECRET_TOKEN, {
    mode: CryptoJS.mode.ECB
  });
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};


// validate
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Respone 
let retError = (error_type, msg = '') => {
  switch (error_type) {
    case 'per':
      // FORBIDDEN
      throw new ForbiddenError(msg)
      break;
    case 'no':
      // 404
      throw new ApolloError(msg, "404")
      break;
    case 'dup':
      // DUPLICATE
      throw new ApolloError(msg, "DUPLICATE")
      break;
    case 'no_active':
      // NO_ACTIVE
      throw new ApolloError(msg, "NO_ACTIVE")
      break;
    case 'ex':
      // EXPIRED
      throw new ApolloError(msg, "EXPIRED")
      break;
    case 'finish':
      // EXPIRED
      throw new ApolloError(msg, "FINISH")
      break;
    case 'auth':
      // UNAUTHENTICATED
      throw new AuthenticationError(msg)
      break;
    case 'input':
      // BAD_USER_INPUT
      throw new UserInputError(msg)
      break;
    default:
      // INTERNAL_SERVER_ERROR
      throw new ApolloError(msg)
      break;
  }
};

const retCode = (data, error = null) => {
  if (data || (error == null && !data)) return {
    code: 200,
    data
  }
  else return {
    code: 400,
    error
  }
};

const detectBrowser = (userAgent) => {
  if (!userAgent) return ''
  let browswer = 'Unknown'
  let OS = 'Unknown-OS'
  if ((userAgent.indexOf("Opera") || userAgent.indexOf('OPR')) != -1) {
    browswer = 'Opera';
  } else if (userAgent.indexOf("Edg") != -1) {
    browswer = 'Microsoft Edge';
  } else if (userAgent.indexOf("Chrome") != -1) {
    browswer = 'Chrome';
  } else if (userAgent.indexOf("Safari") != -1) {
    browswer = 'Safari';
  } else if (userAgent.indexOf("Firefox") != -1) {
    browswer = 'Firefox';
  } else if ((userAgent.indexOf("MSIE") != -1)) {
    browswer = 'IE'; //crap
  }

  if ((userAgent.indexOf("Win") != -1)) {
    OS = 'WindowsOS';
  } else if ((userAgent.indexOf("Mac") != -1)) {
    OS = 'MacOS';
  } else if ((userAgent.indexOf("X11") != -1)) {
    OS = 'Unix';
  } else if ((userAgent.indexOf("Linux") != -1)) {
    OS = 'Linux';
  }
  return OS + " / " + browswer

}

const makeDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, (error) => {

      // To check if the given directory 
      // already exists or not
      if (error) {
        // If current directory does not exist
        // then create it
        fs.mkdir(path, (error) => {
          if (error) {
            console.log(error);
            reject()
          } else {
            console.log("New Directory created successfully !!");
            resolve()
          }
        });
      } else {
        console.log("Given Directory already exists !!");
        resolve()
      }
    });
  })
}

const getExtension = (filename) => {
  return filename.substr(filename.lastIndexOf(".") + 1)
}
const upload_file = async (file, file_dir, name) => {
  const { filename, createReadStream } = await file.file;
  const extention_name = filename.substr(filename.lastIndexOf(".") + 1)
  const file_name = (name ? name : (+new Date())) + '.' + extention_name
  let stream = createReadStream();
  const path = process.env.FILE_PATH + file_dir + '/' + file_name;

  await makeDir(process.env.FILE_PATH + file_dir)

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        log('file-error:', error)
        reject(false);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ url: (file_dir + '/' + file_name) }))
  );
}

const delete_file = async (path) => {
  fs.unlink(process.env.FILE_PATH + path, (err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: ", path);
    }
  }));
}

const upload_base64 = async (file, file_dir) => {
  if (file && file.indexOf('data:image') != -1) {
    const base64Data = file.replace(/^data:image\/png;base64,/, "");
    await makeDir(process.env.FILE_PATH + file_dir)
    const file_name = file_dir + `/${+new Date()}.png`
    await fs.writeFile(process.env.FILE_PATH + file_name, base64Data, 'base64', function (err) {
      console.log(err);
    });    
    return file_name
  }
  else false
}




module.exports = {
  decrypt, encrypt,
  validateEmail,
  retError, retCode,
  detectBrowser,
  makeDir, getExtension,
  upload_file, delete_file, upload_base64
};