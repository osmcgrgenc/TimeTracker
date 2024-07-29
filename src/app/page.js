"use client";

import { useState, useEffect } from 'react';
import moment from 'moment';
import * as XLSX from 'xlsx';
import styles from '../styles/Home.module.css';

export default function Home() {
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
    setStartTime(moment());
  };

  const handleEnd = () => {
    const end = moment();
    setEndTime(end);
    const duration = moment.duration(end.diff(startTime));
    const hours = duration.asHours();
    const newTask = { project, itemNumber, taskDescription, startTime: startTime.format('HH:mm'), endTime: end.format('HH:mm'), hours };
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
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, `${name.replace(' ', '_')}_tasks.xlsx`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Employee Tracker</h1>
      <div className={styles.formGroup}>
        <label>
          Name Surname:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Project:
          <input
            list="projects"
            value={project}
            onChange={(e) => setProject(e.target.value)}
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
          Item Number:
          <input
            list="itemNumbers"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
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
          Task Description:
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
        </label>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleStart} disabled={startTime !== null}>Start Task</button>
        <button onClick={handleEnd} disabled={startTime === null}>End Task</button>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div className={styles.tasks}>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className={styles.taskItem}>
                <span>{task.project}</span> - <span>{task.itemNumber}</span> - <span>{task.taskDescription}</span> - <span>{task.startTime}</span> - <span>{task.endTime}</span> - <span>{task.hours.toFixed(2)} hours</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
