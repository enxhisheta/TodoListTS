interface TaskCountProps {
  title: string;
  count: number;
}

const TaskCount: React.FC<TaskCountProps> = ({ title, count }) => {
  return (
    <div className="task-count">
      <h3>
        {title}: {count}
      </h3>
    </div>
  );
};
export { TaskCount };
