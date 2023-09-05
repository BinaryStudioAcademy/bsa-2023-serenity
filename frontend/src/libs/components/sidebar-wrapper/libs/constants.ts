import chats from '#assets/icons/chat-link.svg';
import home from '#assets/img/home.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
  { path: AppRoute.CHATS, name: 'chats', icon: chats },
];

export { SIDEBAR_ROUTES };
