import { type HTTPMethod } from '#libs/packages/http/http.js';
import { WHITE_ROUTES } from '#libs/packages/server-application/server-application.js';

const checkIsWhiteRoute = ({
  path,
  method,
}: {
  path: string;
  method: HTTPMethod;
}): boolean =>
  WHITE_ROUTES.some((route) => {
    return (
      route.path === path &&
      (route.methods as readonly HTTPMethod[]).includes(method)
    );
  });

export { checkIsWhiteRoute };
