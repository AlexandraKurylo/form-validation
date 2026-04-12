import { type FC, useEffect, useState } from "react";
import { DataCard } from "../../components/DataCard/DataCard";
import cls from "./ValidationResultPage.module.css";
import type { RegisterFormData } from "../../components/RegisterForm/registerSchema";
import type { ProfileFormData } from "../../components/UserProfileForm/profileSchema";
import { API_URL } from "../../constants/global.constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";

type UserResponse = RegisterFormData & { id: string | number };
type ProfileResponse = ProfileFormData & { id: string | number };

export const ValidationResultPage: FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [profiles, setProfiles] = useState<ProfileResponse[]>([]);

  const [fetchData, isLoading, error] = useFetch(async () => {
    const [usersRes, profilesRes] = await Promise.all([fetch(`${API_URL}/users`), fetch(`${API_URL}/profiles`)]);

    if (!usersRes.ok || !profilesRes.ok) {
      throw new Error("Failed to load data from the server.");
    }

    const usersData: UserResponse[] = await usersRes.json();
    const profilesData: ProfileResponse[] = await profilesRes.json();

    setUsers(usersData);
    setProfiles(profilesData);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string | number, type: "users" | "profiles") => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const res = await fetch(`${API_URL}/${type}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (type === "users") {
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else {
          setProfiles((prev) => prev.filter((p) => p.id !== id));
        }
      } else {
        alert("Server error while deleting");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("The record could not be deleted.");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className={cls.errorBox}>{error}</div>;

  return (
    <div className={cls.container}>
      <h1 className={cls.pageTitle}>Submitted Data (DB Results)</h1>

      <div className={cls.sectionsGrid}>
        <section>
          <h2 className={cls.sectionTitle}>Registered Users</h2>
          <div className={cls.cardsList}>
            {users.length > 0 ? (
              users.map((u) => <DataCard key={u.id} title="User Account" data={u} onDelete={(id) => handleDelete(id, "users")} />)
            ) : (
              <p className={cls.emptyMsg}>There are no users yet</p>
            )}
          </div>
        </section>

        <section>
          <h2 className={cls.sectionTitle}>User Profiles</h2>
          <div className={cls.cardsList}>
            {profiles.length > 0 ? (
              profiles.map((p) => (
                <DataCard key={p.id} title="Profile Details" data={p} onDelete={(id) => handleDelete(id, "profiles")} />
              ))
            ) : (
              <p className={cls.emptyMsg}>No profiles yet</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
