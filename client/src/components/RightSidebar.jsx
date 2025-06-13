import assets, { imagesDummyData } from "~/assets/assets";

const RightSidebar = ({ selectedUser }) => {
  return (
    selectedUser && (
      <div
        className={`relative w-full overflow-y-scroll bg-[#818582]/10 text-white ${selectedUser ? "max-md:hidden" : ""}`}
      >
        {/*  */}
        <div className="mx-auto flex flex-col items-center gap-2 pt-16 text-xs font-light">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="avatar"
            className="aspect-[1/1] w-20 rounded-full"
          />
          <h1 className="mx-auto flex items-center gap-2 px-10 text-xl font-medium">
            <p className="h-2 w-2 rounded-full bg-green-500"></p>
            {selectedUser.fullName}
          </h1>
          <p className="mx-auto px-10">{selectedUser.bio}</p>
        </div>

        <hr className="my-4 border-[#ffffff50]" />

        {/* Media */}
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 grid max-h-[200px] grid-cols-2 gap-4 overflow-y-scroll opacity-80">
            {imagesDummyData.map((url, index) => (
              <div
                onClick={() => window.open(url)}
                key={index}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout button */}
        <button className="absolute bottom-5 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-full border-none bg-gradient-to-r from-purple-400 to-violet-600 px-20 py-2 text-sm font-light text-white">
          Logout
        </button>
      </div>
    )
  );
};
export default RightSidebar;
