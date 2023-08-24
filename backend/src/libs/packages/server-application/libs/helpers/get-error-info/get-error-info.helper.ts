import { AuthError } from '#libs/exceptions/exceptions.js';
import { HTTPError } from '#libs/packages/http/http.js';

import { getAuthErrorInfo } from './get-auth-error-info.js';
import { getDefaultErrorInfo } from './get-default-error-info.js';
import { getHTTPErrorInfo } from './get-http-error-info.js';
import { getValidationErrorInfo } from './get-validation-error-info.js';
import { type ErrorInfo, type ErrorParameter } from './types/types.js';

const getErrorInfo = (error: ErrorParameter): ErrorInfo => {
  if ('isJoi' in error) {
    return getValidationErrorInfo(error);
  }

  if (error instanceof AuthError) {
    return getAuthErrorInfo(error);
  }

  if (error instanceof HTTPError) {
    return getHTTPErrorInfo(error);
  }

  return getDefaultErrorInfo(error);
};

export { getErrorInfo };
