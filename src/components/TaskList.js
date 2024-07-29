import { useTranslation } from 'next-i18next';
import styles from '../styles/Home.module.css';

export default function TaskList({ tasks }) {
  const { t } = useTranslation('common');

  return (
    <div className="md:w-1/2 mt-8 md:mt-0">
      <h2 className="text-xl font-semibold">{t('tasks')}</h2>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="p-4 bg-white shadow rounded flex flex-col space-y-2">
            <span>{task.project}</span>
            <span>{task.itemNumber}</span>
            <span>{task.taskDescription}</span>
            <span>{task.startTime}</span>
            <span>{task.endTime}</span>
            <span>{task.hours.toFixed(2)} hours</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
