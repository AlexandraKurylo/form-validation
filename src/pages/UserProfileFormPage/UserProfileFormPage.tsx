import { useNavigate } from "react-router-dom";
import { UserProfileForm } from "../../components/UserProfileForm/UserProfileForm";
import cls from "./UserProfileFormPage.module.css";
import { Loader } from "../../components/Loader";
import { useDelayedLoader } from "../../hooks/useDelayedLoader";

export const UserProfileFormPage = () => {
  const navigate = useNavigate();

  const isLoading = useDelayedLoader(2000);
  if (isLoading) return <Loader />;

  return (
    <div className={cls.container}>
      <button className={cls.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className={cls.content}>
        <UserProfileForm />
      </div>
    </div>
  );
};
