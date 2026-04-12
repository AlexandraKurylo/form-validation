import { MainLoader } from "../../components/Loader";
import { TaskCard } from "../../components/TaskCard";
import { useDelayedLoader } from "../../hooks/useDelayedLoader";
import cls from "./HomePage.module.css";

export const HomePage = () => {
  const isLoading = useDelayedLoader(2000);
  if (isLoading) return <MainLoader />;

  return (
    <div className={cls.container}>
      <h1 className={cls.pageTitle}>Choose a task</h1>
      <div className={cls.grid}>
        <TaskCard
          title="Personal Task"
          description="User Profile Form with React Hook Form and Zod validation. Fields: Nickname (no spaces allowed), Bio (maximum 100 words), and Website (URL)."
          link="/profile"
        />
        <TaskCard
          title="Task 1"
          description="User Registration Form featuring fields: Username, Email, Age, Password, and Confirm Password. Implement full validation and accessibility (Aria-attributes)."
          link="/register"
        />
      </div>
    </div>
  );
};
