import ChatArea from "../ChatArea";
import ChatList from "../ChatList";

export default function ChatLayout() {
  return (
    <div className="grid md:grid-cols-[0.3fr_1fr] gap-2">
      <div className="max-md:hidden">
        <ChatList />
      </div>
      <ChatArea />
    </div>
  );
}
