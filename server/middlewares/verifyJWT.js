import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    
    return res.status(401).json({ message: 'Unauthorized meka' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, { UserInfo: { username, roles } = {} } = {}) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      req.user = username;
      req.roles = roles;
      next();
    }
  );
};

export default verifyJWT;
