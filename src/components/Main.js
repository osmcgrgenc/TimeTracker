import { useTranslation } from 'next-i18next';
import styles from '../styles/Home.module.css';

export default function Main({ project, setProject, itemNumber, setItemNumber, taskDescription, setTaskDescription, handleStart, handleEnd, startTime, exportToExcel, projectList, itemNumberList }) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:w-1/2">
      <div className={styles.formGroup}>
        <label>
          {t('project')}:
          <input
            list="projects"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className={styles.input}
          />
          <datalist id="projects">
            {projectList.map((proj, index) => (
              <option key={index} value={proj} />
            ))}
          </datalist>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          {t('item_number')}:
          <input
            list="itemNumbers"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
            className={styles.input}
          />
          <datalist id="itemNumbers">
            {itemNumberList.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          {t('task_description')}:
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className={styles.textarea}></textarea>
        </label>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleStart} disabled={startTime !== null} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          {t('start_task')}
        </button>
        <button onClick={handleEnd} disabled={startTime === null} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          {t('end_task')}
        </button>
      </div>
      <div>
        <button onClick={exportToExcel} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          {t('export_to_excel')}
        </button>
      </div>
    </div>
  );
}
