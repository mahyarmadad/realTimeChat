import ChatArea from "../ChatArea";
import MyChats from "../MyChats";

export default function ChatLayout() {
  return (
    <div className="grid md:grid-cols-[0.3fr_1fr] h-full">
      <div className="max-md:hidden border-slate-900 border-0 border-r border-solid">
        <MyChats />
      </div>
      <ChatArea />
    </div>
  );
}
