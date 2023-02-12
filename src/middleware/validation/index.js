import Validator from 'validator';
import isEmpty from 'is-empty';
import { BAD_REQUEST } from '../../utils/statusCode';


export const userValidation = (req, res, next) => {
  let errors = {};
  if (Validator.isEmpty(req.body.email)) {
    errors.email = 'email can not be empty';
  } else if (!Validator.isEmail(req.body.email)) {
    errors.email = 'email is invalid';
  }
  if (Validator.isEmpty(req.body.phone)) {
    errors.phone = 'phone can not be empty';
  }
  if (Validator.isEmpty(req.body.firstName)) {
    errors.firstName = 'first name can not be empty';
  }
  if (Validator.isEmpty(req.body.lastName)) {
    errors.lastName = 'last name can not be empty';
  }
  if (!Validator.isLength(req.body.password, { min: 8, max: 30 })) {
    errors.password = 'password must be least 8 characters';
  }
  if (!Validator.equals(req.body.password, req.body.password2)) {
    errors.password = 'passwords must match';
  }

  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  } else {
    next();
  }
};
