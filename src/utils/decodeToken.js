const authService = require('../services/authService');

exports.decode = async (req) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  return  await authService.decodeToken(token);
}