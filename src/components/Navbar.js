import logo from "../images/logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="NeoFi's Logo" />

      <ul>
        <li>Trade</li>
        <li>Earn</li>
        <li>Support</li>
        <li>About</li>
      </ul>

      <button>Connect wallet</button>
    </div>
  );
}
