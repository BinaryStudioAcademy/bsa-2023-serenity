import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useParams,
} from '#libs/hooks/hooks.js';
import {
  ChatFooter,
  ChatHeader,
  ChatMessage,
} from '#pages/chat/components/components.js';
import {
  EMPTY_ARRAY_LENGTH,
  MOCK_MESSAGES,
} from '#pages/chat/libs/constants/constants.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentChatMessages, authenticatedUser } = useAppSelector(
    ({ chats, auth }) => {
      return {
        currentChatMessages: chats.currentChatMessages,
        authenticatedUser: auth.authenticatedUser,
      };
    },
  );

  const handleSend = useCallback(
    ({ message }: { message: string }): void => {
      if (!id && currentChatMessages.length === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatActions.createChat({ message }));
      }
      // TODO: dispatch redux action to send message
    },
    [dispatch, currentChatMessages.length, id],
  );

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        {!!id &&
          MOCK_MESSAGES.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                message={item.message}
                isSender={item.senderId === authenticatedUser?.id}
              />
            );
          })}
      </div>
      <ChatFooter key={id} onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
