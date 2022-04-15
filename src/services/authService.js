const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
}

exports.authorize = async (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if(!token){
    return res.status(401).send({
      message: 'Acesso restrito.'
    });
  } else {
    jwt.verify(token, process.env.SALT_KEY, function(err, decoded) {
      if(err){
        return res.status(401).send({
          message: 'Token inválido.'
        });
      } else {
        next();
      }
    });
  }
}

exports.isAdmin = async (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if(!token){
    return res.status(401).send({
      message: 'Acesso restrito.'
    });
  } else {
    jwt.verify(token, process.env.SALT_KEY, function(err, decoded) {
      if(err){
        return res.status(401).send({
          message: 'Token inválido.'
        });
      } else {
        if(decoded.roles.includes('admin')){
          next();
        } else {
          return res.status(403).send({
            message: 'Acesso restrito. Somente administradores.'
          });
        }
      }
    });
  } 
}