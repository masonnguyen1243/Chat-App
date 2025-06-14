import { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "~/assets/assets";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("Hi, I'm using ChatApp");

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-no-repeat">
      <div className="flex w-5/6 max-w-2xl items-center justify-between rounded-lg border-2 border-gray-600 text-gray-300 backdrop-blur-2xl max-sm:flex-col-reverse">
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-10"
        >
          <h3 className="text-lg">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`h-12 w-12 ${selectedImg && "rounded-full"}`}
            />
            Upload profile image
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Your name..."
            className="rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write profile bio"
            required
            rows={4}
            className="rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gradient-to-r from-purple-400 to-violet-600 p-2 text-lg text-white"
          >
            Save
          </button>
        </form>
        <img
          src={assets.logo_icon}
          alt=""
          className="mx-10 aspect-square max-w-44 rounded-full max-sm:mt-10"
        />
      </div>
    </div>
  );
};
export default ProfilePage;
