import { UserRole } from '#libs/enums/enums.js';
import { useCallback } from '#libs/hooks/hooks.js';
import {
  ChatFooter,
  ChatHeader,
  ChatMessage,
} from '#pages/chat/components/components.js';
import { MOCK_MESSAGES } from '#pages/chat/libs/constants/constants.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const handleSend = useCallback((): void => {
    // TODO: dispatch redux action to send message
  }, []);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        {MOCK_MESSAGES.map((item) => {
          return (
            <ChatMessage
              key={item.id}
              item={item}
              isSender={item.sender === UserRole.USER}
            />
          );
        })}
      </div>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };