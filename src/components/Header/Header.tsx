import { useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";
import cls from "./Header.module.css";
import { Button } from "../Button";
import { ThemeToggler } from "../../features/ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>FormValidation</span>
      </p>
      <div className={cls.btnWrapper}>
        <Button to="/profile">Personal task</Button>
        <Button to="/register">Task 1</Button>
        <Button to="/result">Validation result</Button>
      </div>
      <ThemeToggler />
    </header>
  );
};
