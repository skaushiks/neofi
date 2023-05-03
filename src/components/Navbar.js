import { useState } from "react";
import logo from "../images/logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="navbar">
      <img src={logo} alt="NeoFi's Logo" />

      {mobile ? (
        <>
          {!showMenu ? (
            <MenuRoundedIcon
              className="menuIcon"
              onClick={() => setShowMenu(true)}
            />
          ) : (
            <CloseRoundedIcon
              className="menuIcon"
              onClick={() => setShowMenu(false)}
            />
          )}

          {showMenu ? (
            <div className="active">
              <ul>
                <li>Trade</li>
                <li>Earn</li>
                <li>Support</li>
                <li>About</li>
              </ul>

              <button>Connect wallet</button>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <ul>
            <li>Trade</li>
            <li>Earn</li>
            <li>Support</li>
            <li>About</li>
          </ul>

          <button>Connect wallet</button>
        </>
      )}
    </div>
  );
}
