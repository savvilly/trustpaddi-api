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

export const createProductValidation = (req, res, next) => {
  let errors = {};
  if (Validator.isEmpty(req.body.name)) {
    errors.name = 'product name is needed';
  }
  if (Validator.isEmpty(req.body.image)) {
    errors.image = 'product iamge is needed, at lest one';
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

export const createStoreValidation = (req, res, next) => {
  let errors = {};
  if (Validator.isEmpty(req.body.storeName)) {
    errors.storeName = 'store name is needed';
  }
  if (Validator.isEmpty(req.body.userId)) {
    errors.userId = 'user Id is needed';
  }
  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  } else {
    next();
  }
};

export const transferProductToStoreValidation = (req, res, next) => {
  let errors = {};
  if (Validator.isEmpty(req.body.storeId)) {
    errors.storeId = 'store id is needed';
  }
  if (Validator.isEmpty(req.body.productId)) {
    errors.productId = 'product Id is needed';
  }
  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  } else {
    next();
  }
};

export const requestResetPasswordValidation = (req, res, next) => {
  const errors = {};
  const email = req.body?.email;

  if (email === undefined || Validator.isEmpty(req.body.email)) {
    errors.email = 'The email field is required.';
  }

  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  }

  next();
};

export const resetPasswordValidation = (req, res, next) => {
  const errors = {};
  const { email, password, passwordConfirmation, resetCode } = req.body;

  if (email === undefined || Validator.isEmpty(req.body.email)) {
    errors.email = 'The email field is required.';
  }

  if (resetCode === undefined || Validator.isEmpty(req.body.resetCode)) {
    errors.resetCode = 'The reset code field is required.';
  }

  if (password === undefined || Validator.isEmpty(req.body.password)) {
    errors.password = 'The password field is required.';
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'The password must be between 6 and 30 characters long.';
  }

  if (passwordConfirmation === undefined || Validator.isEmpty(req.body.passwordConfirmation)) {
    errors.passwordConfirmation = 'The password confirmation field is required.';
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'The password and password confirmation fields must match.';
  }

  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  }

  next();
};

export const editStoreValidation = (req, res, next) => {
  const errors = {};
  const { storeName, logo, storeId } = req.body;

  if (storeName === undefined || Validator.isEmpty(req.body.storeName)) {
    errors.storeName = 'The store name field is required.';
  }
  if (logo === undefined || Validator.isEmpty(req.body.logo)) {
    errors.logo = 'The logo field is required.';
  }
  if (storeId === undefined || Validator.isEmpty(req.body.storeId)) {
    errors.storeId = 'The storeId is required.';
  }

  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  }

  next();
};

export const updateStoreStatusValidation = (req, res, next) => {
  const errors = {};
  const { active, storeId } = req.body;

  if (active === undefined || Validator.isEmpty(req.body.active)) {
    errors.active = 'The active field is required.';
  }

  if (storeId === undefined || Validator.isEmpty(req.body.storeId)) {
    errors.storeId = 'The storeId is required.';
  }

  if (!isEmpty(errors)) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: errors, success: false });
  }

  next();
};
