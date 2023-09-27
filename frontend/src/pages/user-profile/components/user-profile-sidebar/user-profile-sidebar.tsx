import {
  Card,
  Icon,
  Link,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { QUERY_STRING_PARAMETERS } from '#libs/constants/constants.js';
import { type AppRoute, IconColor } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useLocation,
  useState,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SETTING_NAME_INDEX, SETTINGS_OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  onSetIsSidebarShow: (value: boolean) => void;
};

const UserProfileSidebar: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
}) => {
  const dispatch = useAppDispatch();

  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const { pathname } = useLocation();
  const setting = pathname.split('/')[SETTING_NAME_INDEX];

  const [activeItem, setActiveItem] = useState<string>(
    setting ?? 'notification',
  );

  const handleClick = useCallback(
    (key: string) => {
      return () => {
        onSetIsSidebarShow(false);
        setActiveItem(key);
      };
    },
    [onSetIsSidebarShow],
  );

  const handleSignOut = useCallback((): void => {
    void dispatch(authActions.signOut());
  }, [dispatch]);

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span className="visually-hidden">Profile settings</span>
          <span>My Profile</span>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon
                name="user"
                color={IconColor.WHITE}
                width={18}
                height={18}
              />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {SETTINGS_OPTIONS.map((option) => {
            return (
              <Link
                key={option.key}
                to={getUrlWithQueryString(
                  option.path as ValueOf<typeof AppRoute>,
                  QUERY_STRING_PARAMETERS,
                )}
              >
                <Card
                  title={option.title}
                  onClick={handleClick(option.key)}
                  isActive={activeItem === option.key}
                  iconName={option.key}
                  iconColor={IconColor.WHITE}
                />
              </Link>
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleSignOut}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { UserProfileSidebar };
