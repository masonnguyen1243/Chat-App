import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "~/assets/assets";
import { formatMessageTime } from "~/lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="relative h-full overflow-scroll backdrop-blur-lg">
      {/* Header */}
      <div className="mx-4 flex items-center gap-3 border-b border-stone-500 py-3">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex flex-1 items-center gap-2 text-lg text-white">
          Martin Johnson
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="max-w-7 cursor-pointer md:hidden"
        />
        <img src={assets.help_icon} alt="" className="max-w-5 max-md:hidden" />
      </div>

      {/* Chat area */}
      <div className="flex h-[calc(100%-120px)] flex-col overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end justify-end gap-2 ${msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="mb-8 max-w-[230px] overflow-hidden rounded-lg border border-gray-700"
              />
            ) : (
              <p
                className={`mb-8 max-w-[200px] rounded-lg bg-violet-500/30 p-2 font-light break-all text-white md:text-sm ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-br-none" : "rounded-bl-none"}`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom area */}
      <div className="absolute right-0 bottom-0 left-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 items-center rounded-full bg-gray-100/12 px-3">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 rounded-lg border-none p-3 text-sm text-white placeholder-gray-400 outline-none"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="mr-2 w-5 cursor-pointer"
            />
          </label>
        </div>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 bg-white/10 text-gray-500 max-md:hidden">
      <img src={assets.logo_icon} alt="logo" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};
export default ChatContainer;
