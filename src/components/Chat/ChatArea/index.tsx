import Message from "./Message";

export default function ChatArea() {
  return (
    <div className="p-4 bg-slate-700/20 flex flex-col gap-2">
      <Message
        text="this si the text message what i wrote to see hiow it response from user to another user also"
        isuser
      />
      <Message text="need to check the size and the width of the text with colors so that it fit good" />
      <Message text="response from user to another user also" isuser />
      <Message text="so that it fit good" />
    </div>
  );
}
