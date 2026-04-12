import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./UserProfileForm.module.css";
import type { FC } from "react";
import { Button } from "../Button";
import { profileSchema, type ProfileFormData } from "./profileSchema";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/global.constants";

export const UserProfileForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    const formattedData = {
      ...data,
      nickname: data.nickname.toLowerCase().trim(),
      website: /^https?:\/\//i.test(data.website) ? data.website : `https://${data.website}`,
    };

    try {
      const response = await fetch(`${API_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate("/result");
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("An error occurred while saving the profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formCard} noValidate>
      <h2 className={styles.title}>My Profile</h2>

      {/* NICKNAME */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="nickname">
          Nickname
        </label>
        <input
          id="nickname"
          type="text"
          {...register("nickname")}
          aria-invalid={errors.nickname ? "true" : "false"}
          aria-describedby={errors.nickname ? "nickname-error" : undefined}
          className={`${styles.input} ${errors.nickname ? styles.inputError : ""}`}
          placeholder="e.g. alex_dev"
        />
        {errors.nickname && (
          <span id="nickname-error" role="alert" className={styles.errorMessage}>
            {errors.nickname.message}
          </span>
        )}
      </div>

      {/* BIO */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="bio">
          Bio (max 100 words)
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          aria-invalid={errors.bio ? "true" : "false"}
          aria-describedby={errors.bio ? "bio-error" : undefined}
          className={`${styles.textarea} ${errors.bio ? styles.inputError : ""}`}
          placeholder="Tell us about yourself..."
        />
        {errors.bio && (
          <span id="bio-error" role="alert" className={styles.errorMessage}>
            {errors.bio.message}
          </span>
        )}
      </div>

      {/* WEBSITE */}
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="website">
          Website
        </label>
        <input
          id="website"
          type="text"
          {...register("website")}
          aria-invalid={errors.website ? "true" : "false"}
          aria-describedby={errors.website ? "website-error" : undefined}
          className={`${styles.input} ${errors.website ? styles.inputError : ""}`}
          placeholder="example.com"
        />
        {errors.website && (
          <span id="website-error" role="alert" className={styles.errorMessage}>
            {errors.website.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={!isValid || isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Saving..." : "Submit Changes"}
      </Button>
    </form>
  );
};
