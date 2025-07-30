import { useEffect } from "react";

import SplashLoader from "./components/shared/SplashLoader/SplashLoader";
import SplashScreen from "./components/shared/SplashScreen/SplashScreen";
import AppMessageView from "./features/Message/Message";
import AppMessages from "./features/Messages/Messages";
import AppSidebar from "./features/Sidebar/Sidebar";
import { useAppKeybindings } from "./hooks/app/useAppKeybindings";
import { useFakeMessageWebsocket } from "./hooks/app/useFakeMessageWebsocket";
import { useFolders } from "./hooks/app/useFolders";
import { useMessages } from "./hooks/app/useMessages";
import { playNotificationSound } from "./utils/notifier";

function App() {
  const { fetch, isLoading, error } = useFolders();
  const { insertMessage } = useMessages();

  useAppKeybindings();

  useFakeMessageWebsocket({
    subscriber: (message) => {
      insertMessage(message);
      playNotificationSound();
    },
    // enable receiving a new email simulation for the selected messages folder
    enabled: false,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
    return <SplashLoader />;
  }

  if (error) {
    return (
      <SplashScreen className="h-screen text-gray-800">{error}</SplashScreen>
    );
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <AppMessages />
      <AppMessageView />
    </div>
  );
}

export default App;
