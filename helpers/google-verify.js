const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

let CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const { name, picture, email } = ticket.getPayload();

  return { name, image: picture, mail: email};
}


module.exports = {
  googleVerify,
};
