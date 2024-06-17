import { useState } from "react";
import { useRouter } from "next/navigation";

const NavbarPC = () => {
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

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className="border shadow-lg">
      <div className="container mx-auto flex flex-row justify-between items-center py-4 px-6">
        <div
          className="text-gray-700 text-lg px-4 py-2 rounded-xl hover:bg-gray-200 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          NextTube
        </div>
        <div className="flex flex-row items-center justify-center space-x-8 mr-8">
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
          <div
            onClick={() => handleNavigation("/upload")}
            className="px-6 py-2 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            Upload
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPC;
