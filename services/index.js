const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
  const payload = {
    // sub = id ser
    sub: user._id,
    // creacion del token
    iat: moment().unix(),
    // expiracion del token
    exp: moment()
      .add(14, "days")
      .unix()
  };
  // codificamos
  return jwt.encode(payload, config.SECRET_TOKEN);
}
function decodeToken(token) {
  return decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      // si caduco
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado"
        });
      }
      //   Token decode
      resolve(payload.sub);
    } catch (error) {
      reject({
        status: 500,
        message: "Invalid token"
      });
    }
  });
}
module.exports = {
  createToken,
  decodeToken
};
