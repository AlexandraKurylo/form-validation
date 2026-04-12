import cls from "./DataCard.module.css";

interface DataCardProps<T extends { id: string | number }> {
  title: string;
  data: T;
  onDelete: (id: string | number) => void;
}

export const DataCard = <T extends { id: string | number }>({ title, data, onDelete }: DataCardProps<T>) => {
  const { id, ...displayData } = data;
  return (
    <div className={cls.card}>
      <div className={cls.cardHeader}>
        <h3 className={cls.cardTitle}>{title}</h3>
        <button className={cls.deleteBtn} onClick={() => onDelete(id)} aria-label="Delete entry">
          &times;
        </button>
      </div>

      <ul className={cls.list}>
        {Object.entries(displayData).map(([key, value]) => (
          <li key={key} className={cls.item}>
            <span className={cls.label}>{key.replace(/([A-Z])/g, " $1")}:</span>
            <span className={cls.value}>{String(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
