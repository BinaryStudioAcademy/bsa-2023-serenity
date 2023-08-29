import home from '#assets/img/home.svg';
import user from '#assets/img/user.svg';
import {
  Header,
  Loader,
  RouterOutlet,
  Sidebar,
} from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <div className={styles['app-container']}>
      <Sidebar
        routes={[
          { path: AppRoute.ROOT, name: 'home', icon: home },
          { path: AppRoute.USER_PROFILE, name: 'user-profile', icon: user },
        ]}
      />
      <div className={styles['body-container']}>
        <Header />
        <div className={styles['outlet-container']}>
          <RouterOutlet />
        </div>
      </div>
    </div>
  );
};

export { App };
