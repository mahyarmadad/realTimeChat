import ChatList from "./ChatList";
import MyChatHeader from "./MyChatHeader";

export default async function MyChats() {
  return (
    <div className="">
      <MyChatHeader />
      <ChatList />
    </div>
  );
}
