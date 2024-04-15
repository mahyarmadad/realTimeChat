import ChatArea from "../ChatArea";
import MyChats from "../MyChats";

export default function ChatLayout() {
  return (
    <div className="grid md:grid-cols-[0.3fr_1fr] gap-2 h-full">
      <div className="max-md:hidden">
        <MyChats />
      </div>
      <ChatArea />
    </div>
  );
}
