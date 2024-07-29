import { useTranslation } from 'next-i18next';
import styles from '../styles/Home.module.css';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="py-4 text-center bg-gray-100 mt-8">
      &copy; 2024 {t('title')}. All rights reserved.
    </footer>
  );
}
