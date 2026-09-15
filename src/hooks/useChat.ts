// src/hooks/useChat.ts
import { useChatRooms } from "./useChatRooms";
import { useChatMessages } from "./useChatMessages";

export function useChat() {
  const roomState = useChatRooms();
  const messageState = useChatMessages(
    roomState.activeChatId,
    roomState.currentUser,
  );

  return {
    ...roomState,
    ...messageState,
  };
}
