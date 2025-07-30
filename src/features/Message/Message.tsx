import cn from "classnames";
import {
  ArrowLeft,
  CheckCheck,
  MessageSquareDot,
  Send,
  Trash,
} from "lucide-react";
import React from "react";

import MessageViewer from "../../components/MessageViewer/MessageViewer";
import SplashScreen from "../../components/shared/SplashScreen/SplashScreen";
import Toolbar from "../../components/shared/Toolbar/Toolbar";
import { useMessages } from "../../hooks/app/useMessages";
import { confirmAction } from "../../utils/confirm";

const AppMessageView: React.FC = () => {
  const { selected, selectMessage, deleteMessage, toggleIsReadFlag } =
    useMessages();
  const messageIsSelected = selected !== null;
  const isRead = selected?.isRead;

  const actions = [
    {
      children: <ArrowLeft size={20} />,
      onClick: () => selectMessage(null),
      props: {
        title: "Close",
        className: "mr-auto -ml-2.5",
      },
    },
    {
      children: isRead ? (
        <MessageSquareDot size={20} />
      ) : (
        <CheckCheck size={20} />
      ),
      onClick: () => toggleIsReadFlag(selected!),
      props: {
        title: isRead ? "Mark as Unread" : "Mark as Read",
      },
    },
    {
      children: <Trash size={20} />,
      onClick: () => confirmAction(() => deleteMessage(selected!)),
      props: {
        title: "Delete",
      },
    },
  ];

  return (
    <div
      className={cn("w-full h-full overflow-auto", {
        "desktop-only": !selected,
      })}
    >
      {!messageIsSelected && (
        <SplashScreen className="text-gray-200">
          <Send size={64} />
        </SplashScreen>
      )}
      {messageIsSelected && (
        <>
          <Toolbar actions={actions} />
          <MessageViewer message={selected} />
        </>
      )}
    </div>
  );
};

export default React.memo(AppMessageView);
