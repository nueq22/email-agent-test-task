import cn from "classnames";
import React, { useCallback, useId } from "react";
import { useContextMenu } from "react-contexify";

import type { IMessage } from "../../types/message";

import MessagesList from "../../components/MessagesList/MessagesList.tsx";
import MessageListItem from "../../components/MessagesListItem/MessageListItem.tsx";
import ContextMenu from "../../components/shared/ContextMenu/ContextMenu.tsx";
import LinearLoader from "../../components/shared/LinearLoader/LinearLoader";
import SplashLoader from "../../components/shared/SplashLoader/SplashLoader";
import SplashScreen from "../../components/shared/SplashScreen/SplashScreen";
import { useMessages } from "../../hooks/app/useMessages.ts";
import { useMessagesContextMenuActions } from "../../hooks/app/useMessagesContextMenuActions.ts";
import styles from "./Messages.module.css";

const AppMessages: React.FC = () => {
  const id = useId();
  const { show } = useContextMenu({
    id: id,
  });

  const { isLoading, error, selected, list, selectMessage } = useMessages();
  const contextMenuActions = useMessagesContextMenuActions();

  // react-contexify package returns show function without memoization, fix for prevent extra re-renders
  const handleContextMenuCall = useCallback(
    (e: React.MouseEvent, message: IMessage) => {
      return show({
        event: e,
        props: message,
      });
    },
    // eslint-disable-next-line
    [id],
  );

  const wrapper = useCallback(
    (children: React.ReactNode) => (
      <div
        className={cn(styles.messages, {
          "desktop-only": selected !== null,
        })}
      >
        {children}
      </div>
    ),
    [selected],
  );

  if (error) {
    return wrapper(
      <SplashScreen className="text-gray-400">{String(error)}</SplashScreen>,
    );
  }

  return wrapper(
    <>
      {list.length === 0 && (
        <>
          {isLoading && <SplashLoader />}
          {!isLoading && (
            <SplashScreen className="text-gray-400">
              Oops! No messages found.
            </SplashScreen>
          )}
        </>
      )}
      {list.length > 0 && (
        <>
          {isLoading && <LinearLoader className={styles.linearLoader} />}
          <MessagesList>
            {list.map((message) => (
              <MessageListItem
                key={message.id}
                message={message}
                isSelected={message.id === selected?.id}
                onClick={selectMessage}
                onContextMenu={handleContextMenuCall}
              />
            ))}
          </MessagesList>
          <ContextMenu id={id} actions={contextMenuActions} />
        </>
      )}
    </>,
  );
};

export default React.memo(AppMessages);
