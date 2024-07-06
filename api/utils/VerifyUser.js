// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';
// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(errorHandler(401, 'bUnauthorized'));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, 'bUnauthorized'));
//     }
//     req.user = user;
//     next();
//   });
// };
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.access_token;  
  if (!token) {
    
    return next(errorHandler(401, 'bUnauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
console.log("Eee");

      return next(errorHandler(401, 'bUnauthorized'));
    }
    req.user = user;

    next();
  });
};
