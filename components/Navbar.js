import { useEffect, useState } from "react";
import NavbarPC from "./NavbarPC";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <NavbarMobile /> : <NavbarPC />;
};

export default Navbar;
