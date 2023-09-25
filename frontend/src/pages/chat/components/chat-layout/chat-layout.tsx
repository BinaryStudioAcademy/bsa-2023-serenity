import React from 'react';

import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import {
  ChatDivider,
  ChatFooter,
  ChatHeader,
  ChatMessage,
} from '#pages/chat/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '#pages/chat/libs/types/types.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

type Properties = {
  filter: string;
};

const ChatLayout: React.FC<Properties> = ({ filter }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentChatMessages, authenticatedUser, createMessageDataStatus } =
    useAppSelector(({ chats, auth }) => {
      return {
        currentChatMessages: chats.currentChatMessages,
        authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
        createMessageDataStatus: chats.createMessageDataStatus,
      };
    });
  const hasId = Boolean(id);
  const currentChatMessagesLength = Object.keys(currentChatMessages).length;

  const handleSend = useCallback(
    ({ message }: ChatInputValue): void => {
      if (!hasId || currentChatMessagesLength === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatActions.createChat({ message }));
      } else {
        void dispatch(
          chatActions.createMessage({
            message,
            chatId: id as string,
          }),
        );
      }
    },
    [dispatch, currentChatMessagesLength, hasId, id],
  );

  useEffect(() => {
    if (id) {
      void dispatch(chatActions.getCurrentChatMessages(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (createMessageDataStatus === DataStatus.FULFILLED) {
      void dispatch(chatActions.getAllChats(filter));
    }
  }, [createMessageDataStatus, dispatch, filter]);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        {hasId &&
          Object.entries(currentChatMessages).map(([date, group]) => {
            return (
              <React.Fragment key={date}>
                <ChatDivider date={new Date(date)} />
                {group.map((item) => {
                  return (
                    <ChatMessage
                      key={item.id}
                      message={item.message}
                      isSender={item.senderId === authenticatedUser.id}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
      </div>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
