import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage'; // Import Task 2!
import { api } from './api'; // Import our Django API service

// --- TASK 1 CUSTOM LIBRARY COMPONENTS ---
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger' | 'success';
}

function CustomLibraryButton({ onClick, children, type = 'button', variant = 'primary' }: ButtonProps) {
  const getBackgroundColor = () => {
    if (variant === 'danger') return '#ef4444';
    if (variant === 'success') return '#10b981';
    return '#0066cc'; // primary
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      style={{
        padding: '12px 24px', 
        fontSize: '16px', 
        fontWeight: 'bold',
        backgroundColor: getBackgroundColor(), 
        color: 'white', 
        border: 'none',
        borderRadius: '6px', 
        cursor: 'pointer', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.2s',
        width: '100%'
      }}
    >
      {children}
    </button>
  );
}

// Interface for Task Type
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function App() {
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');

  // --- TASK 1 (TASK MANAGER) STATES ---
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Load tasks if logged in and looking at Task 1
  useEffect(() => {
    if (token && activeTask === 'task1') {
      fetchUserTasks();
    }
  }, [token, activeTask]);

  const fetchUserTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let data;
      if (isRegistering) {
        data = await api.register(username, password);
      } else {
        data = await api.login(username, password);
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(isRegistering ? 'Registration failed.' : 'Invalid username or password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const createdTask = await api.createTask(newTaskTitle);
      setTasks([createdTask, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await api.updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', minHeight: '100vh', margin: 0 }}>
      {/* Task Selection Bar */}
      <div style={{
        background: '#18181b', padding: '12px 20px', display: 'flex',
        justifyContent: 'center', gap: '15px', position: 'sticky', top: 0, zIndex: 1000
      }}>
        <button 
          onClick={() => setActiveTask('task1')}
          style={{
            padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', backgroundColor: activeTask === 'task1' ? '#0066cc' : '#3f3f46',
            color: 'white'
          }}
        >
          Task 1: Task Manager App
        </button>
        <button 
          onClick={() => setActiveTask('task2')}
          style={{
            padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', backgroundColor: activeTask === 'task2' ? '#0066cc' : '#3f3f46',
            color: 'white'
          }}
        >
          Task 2: Responsive Landing Page
        </button>
      </div>

      {/* Render Selected View */}
      {activeTask === 'task1' ? (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ 
            textAlign: 'center', 
            color: '#18181b', 
            fontSize: '28px', 
            lineHeight: '1.3', 
            marginBottom: '30px',
            fontWeight: 'bold'
          }}>
            Django React Task Manager
          </h1>
          
          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

          {/* AUTHENTICATION VIEW */}
          {!token ? (
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
                {isRegistering ? 'Create an Account' : 'Sign In'}
              </h2>
              <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '16px' }}
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '16px' }}
                  required
                />
                
                <CustomLibraryButton type="submit">
                  {isRegistering ? 'Register' : 'Log In'}
                </CustomLibraryButton>
              </form>

              <p style={{ marginTop: '20px', textAlign: 'center', color: '#71717a' }}>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span 
                  onClick={() => setIsRegistering(!isRegistering)}
                  style={{ color: '#0066cc', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {isRegistering ? 'Log In' : 'Register'}
                </span>
              </p>
            </div>
          ) : (
            // TASKS DASHBOARD VIEW
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontWeight: 'bold', color: '#3f3f46' }}>Logged in as active user</span>
                <div style={{ width: '120px' }}>
                  <CustomLibraryButton onClick={handleLogout} variant="danger">
                    Log Out
                  </CustomLibraryButton>
                </div>
              </div>

              {/* Create Task Form */}
              <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <input 
                  type="text" 
                  placeholder="Add a new task..." 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '16px' }}
                  required
                />
                <div style={{ width: '140px' }}>
                  <CustomLibraryButton type="submit" variant="success">
                    Add Task
                  </CustomLibraryButton>
                </div>
              </form>

              {/* Task List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#71717a' }}>No tasks found. Add your first one!</p>
                ) : (
                  tasks.map((task) => (
                    <div 
                      key={task.id} 
                      style={{ 
                        background: 'white', padding: '16px', borderRadius: '8px', 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input 
                          type="checkbox" 
                          checked={task.completed} 
                          onChange={() => handleToggleTask(task)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ 
                          fontSize: '16px', 
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? '#a1a1aa' : '#18181b'
                        }}>
                          {task.title}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer' }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}