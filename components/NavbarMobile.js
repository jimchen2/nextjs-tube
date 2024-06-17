import { useState } from "react";
import { useRouter } from "next/navigation";

const NavbarMobile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/?query=${searchQuery}`);
    }
  };

  const handleSearchClick = () => {
    router.push(`/?query=${searchQuery}`);
  };

  return (
    <nav className="border shadow-lg">
      <div className="container mx-auto flex flex-col justify-between items-center py-4 px-6">
        <div className="flex justify-between w-full items-center">
          <div className="text-gray-700 text-lg px-4 py-2 rounded-xl hover:bg-gray-200">
            <a href="/">NextTube</a>
          </div>
          <a
            href="/upload"
            className="px-6 py-2 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Upload
          </a>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 mt-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="px-4 py-2 rounded-lg ring-2 outline-none ring-gray-200 focus:bg-gray-200 focus:shadow-lg"
            />
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 text-gray-800 rounded-lg outline-none ring-gray-200 hover:bg-gray-200 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
