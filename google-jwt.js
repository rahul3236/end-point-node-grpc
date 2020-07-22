const verifyToken = async (token) => {
  const clientId = '709703946647-nva5tkqra55420t5bt4oani68t0r1o5g.apps.googleusercontent.com';  
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
      idToken: token,
  });
  console.info(`verifyToken ticket: ${JSON.stringify(ticket)}`);
  return ticket;
}

module.exports = {
  verifyToken
}