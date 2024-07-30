import { useState, useEffect } from 'react';
import styles from '../styles/DarkModeToggle.module.css';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}
