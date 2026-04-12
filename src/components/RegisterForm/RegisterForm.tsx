import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RegisterForm.module.css";
import type { FC } from "react";
import { registerSchema, type RegisterFormData } from "./registerSchema";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/global.constants";

export const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const formattedData = {
      ...data,
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
    };

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate("/result");
        alert("Data saved!");
      }
    } catch (err) {
      console.error("Error while saving:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formCard} noValidate>
      <h2 className={styles.title}>Create Account</h2>

      {/* USERNAME */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
        />
        {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
      </div>

      {/* EMAIL */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
      </div>

      {/* AGE */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="age">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className={`${styles.input} ${errors.age ? styles.inputError : ""}`}
        />
        {errors.age && <span className={styles.errorMessage}>{errors.age.message}</span>}
      </div>

      {/* PASSWORD */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            onChange: () => trigger("confirmPassword"),
          })}
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
        />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
        />
        {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}
      </div>

      <Button type="submit" disabled={!isValid || isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Registering..." : "Sign Up"}
      </Button>
    </form>
  );
};
