import { useState, useEffect } from "react";

export const CheckMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [isMobile]);

  return isMobile || false;
};

export const Check768px = () => {
  const [is768, setIs768] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIs768(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [is768]);

  return is768;
};
