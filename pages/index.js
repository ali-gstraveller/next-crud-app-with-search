import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search`, {
        params: { query: query }
      });
      setResults(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get('/api/tasks');
    setTasks(data.data);
  };

  const createTask = async () => {
    const newTask = { title, description };
    await axios.post('/api/tasks', newTask);
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const updateTask = async (id) => {
    const updatedTask = { title, description };
    await axios.put(`/api/tasks/${id}`, updatedTask);
    setTitle('');
    setDescription('');
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => (editingTask ? updateTask(editingTask._id) : createTask())}>
        { editingTask ? 'Update Task' : 'Add Task'}
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => { setEditingTask(task); setTitle(task.title); setDescription(task.description); }}>
              Edit
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>


      <h1>  search area </h1>
      <input  type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..." />
      <button onClick={handleSearch}> search </button>
      <ul>
        {results.map((item) => (
          <li key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
