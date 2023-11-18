import ReactTyped from "react-typed";
import "./css/typed.css";

const Logo = () => {
  return (
    <div className="Typed-Logo">
      <ReactTyped strings={["MyDetective!"]} typeSpeed={250} />
    </div>
  );
};

export default Logo;
