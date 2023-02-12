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

export const createProductValidation = (eq, res, next) => {
  let errors = {};
  if (Validator.isEmpty(req.body.name)) {
    errors.name = 'product name is needed';
  }
  if (Validator.isEmpty(req.body.image)) {
    errors.image = 'product iamge is needed';
  }
  if (Validator.isEmpty(req.body.image)) {
    errors.image = 'product name is needed';
  }
  if (Validator.isEmpty(req.body.address)) {
    errors.address = 'product addresss is needed';
  }
  if (Validator.isEmpty(req.body.contact)) {
    errors.contact = 'seller contact is needed ';
  }
  if (Validator.isEmpty(req.body.userId)) {
    errors.userId = 'userId  is needed ';
  }
  if (Validator.isEmpty(req.body.city)) {
    errors.city = 'city is needed is needed';
  }
  if (Validator.isEmpty(req.body.state)) {
    errors.state = 'state is needed ';
  }
  if (Validator.isEmpty(req.body.description)) {
    errors.description = 'product description is needed ';
  }
  if (Validator.isEmpty(req.body.price)) {
    errors.description = 'product price is needed ';
  }
  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  } else {
    next();
  }
};
