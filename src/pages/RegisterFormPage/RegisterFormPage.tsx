import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import cls from "./RegisterFormPage.module.css";
import type { FC } from "react";
import { useDelayedLoader } from "../../hooks/useDelayedLoader";
import { Loader } from "../../components/Loader";

export const RegisterFormPage: FC = () => {
  const navigate = useNavigate();

  const isLoading = useDelayedLoader(2000);
  if (isLoading) return <Loader />;

  return (
    <div className={cls.container}>
      <button className={cls.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className={cls.content}>
        <RegisterForm />
      </div>
    </div>
  );
};
