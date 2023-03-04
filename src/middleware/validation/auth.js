import Validator from 'validator';
import isEmpty from 'is-empty';
import { BAD_REQUEST } from '../../utils/statusCode';

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
