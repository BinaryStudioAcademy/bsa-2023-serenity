import { Card, Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useAppSelector, useCallback, useState } from '#libs/hooks/hooks.js';
import { type SettingsOption } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import styles from './styles.module.scss';

const settingsOptions: SettingsOption[] = [
  {
    key: 'notification',
    title: 'Notifications and Reminders',
  },
];

const ProfileSettingsSidebar: React.FC = () => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = useCallback((key: string) => {
    return () => {
      setActiveItem(key);
    };
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className="visually-hidden">Profile settings</div>
        <div className={styles['header-text']}>My Profile</div>
      </div>
      <div className={styles['body']}>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name="avatar" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {settingsOptions.map((option) => {
            return (
              <Card
                key={option.key}
                title={option.title}
                onClick={handleClick(option.key)}
                isActive={activeItem === option.key}
                iconName={option.key}
                iconColor={IconColor.WHITE}
                statusIcon="arrow"
              />
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleClick('sign-out')}
            isActive={false}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
            statusIcon="arrow"
          />
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };