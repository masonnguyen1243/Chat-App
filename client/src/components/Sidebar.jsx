import { useNavigate } from "react-router-dom";
import assets from "~/assets/assets";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`h-full overflow-y-scroll rounded-r-xl bg-[#818582]/10 p-5 text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
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

        <div className="mt-5 flex items-center gap-2 rounded-full bg-[#282142] px-4 py-3">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            placeholder="Search User..."
            className="placeholder:[#c8c8c8] flex-1 border-none bg-transparent text-xs text-white outline-none"
          />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
