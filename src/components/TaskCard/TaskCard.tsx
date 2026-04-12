import type { FC } from "react";
import { Button } from "../Button/Button";
import cls from "./TaskCard.module.css";

interface TaskCardProps {
  title: string;
  description: string;
  link: string;
}

export const TaskCard: FC<TaskCardProps> = ({ title, description, link }) => (
  <div className={cls.card}>
    <h3 className={cls.title}>{title}</h3>
    <p className={cls.desc}>{description}</p>
    <div className={cls.cardButtonWrapper}>
      <Button to={link}>Open task</Button>
    </div>
  </div>
);
