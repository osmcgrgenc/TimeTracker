import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import styles from '../styles/Home.module.css';

export default function Header({ name, setName }) {
  const { t } = useTranslation('common');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <header className={styles.header}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className={styles.title}>{t('time_tracker')}</h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className={styles.userInfo}>
              <label>
                {t('name')}:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`${styles.input} ${styles.textarea}`} />
              </label>
              <div className={styles.dateTime}>{currentTime}</div>
            </div>
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
        </div>
      </header>
  );
}
