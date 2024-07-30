"use client";

import { useState, useEffect } from 'react';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { useTranslation } from 'next-i18next';
import Header from '../components/Header';
import Main from '../components/Main';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';
import Timer from '../components/Timer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { t } = useTranslation('common');
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [itemNumber, setItemNumber] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [itemNumberList, setItemNumberList] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  const handleStart = () => {
    setStartTime(moment().toISOString());
    setEndTime(null);
  };

  const handleEnd = () => {
    if (startTime) {
      const end = moment().toISOString();
      setEndTime(end);
      const duration = moment.duration(moment(end).diff(moment(startTime)));
      const hours = duration.asHours();
      const newTask = { project, itemNumber, taskDescription, startTime: moment(startTime).format('HH:mm'), endTime: moment(end).format('HH:mm'), hours };
      setTasks([...tasks, newTask]);
      if (!projectList.includes(project)) {
        setProjectList([...projectList, project]);
      }
      if (!itemNumberList.includes(itemNumber)) {
        setItemNumberList([...itemNumberList, itemNumber]);
      }
      setProject('');
      setItemNumber('');
      setTaskDescription('');
      setStartTime(null);
      setEndTime(null);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, `${name.replace(' ', '_')}_tasks.xlsx`);
  };

  return (
      <div className={styles.container}>
        <Header name={name} setName={setName} />
        <div className="flex flex-col md:flex-row md:space-x-4 px-4 py-6">
          <Main
              project={project}
              setProject={setProject}
              itemNumber={itemNumber}
              setItemNumber={setItemNumber}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              handleStart={handleStart}
              handleEnd={handleEnd}
              startTime={startTime}
              exportToExcel={exportToExcel}
              projectList={projectList}
              itemNumberList={itemNumberList}
          />
          <TaskList tasks={tasks} />
        </div>
        {startTime && !endTime && <Timer startTime={startTime} endTime={endTime} />}
        <Footer />
      </div>
  );
}
