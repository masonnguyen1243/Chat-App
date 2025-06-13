import { useNavigate } from "react-router-dom";
import assets, { userDummyData } from "~/assets/assets";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`h-full overflow-y-scroll rounded-r-xl bg-[#818582]/10 p-5 text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="group relative py-2">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 hidden w-32 rounded-md border border-gray-600 bg-[#282142] p-5 text-gray-100 group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-2 rounded-full bg-[#282142] px-4 py-3">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            placeholder="Search User..."
            className="placeholder:[#c8c8c8] flex-1 border-none bg-transparent text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* User */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
            }}
            key={index}
            className={`relative flex cursor-pointer items-center gap-2 rounded p-2 pl-4 max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="avatar"
              className="aspect-[1/1] w-[35px] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user?.fullName}</p>
              {index < 3 ? (
                <span className="text-xs text-green-400">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/50 text-xs">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
