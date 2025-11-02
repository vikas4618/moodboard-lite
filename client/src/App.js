import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MoodBoard from './pages/MoodBoard';
import './index.css';

function App() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('mood');

  useEffect(() => {
    if (!token) setView('login');
    else setView('mood');
  }, [token]);

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div className="App">
      {/* 🌟 Header */}
      <header>
        {/* Make title clickable to return to MoodBoard */}
        <h2 onClick={() => setView('mood')} className="title">
          MoodBoard Lite
        </h2>
        {token && <button onClick={handleLogout}>Logout</button>}
      </header>

      {/* 🔹 Main content */}
      <main className="card">
        {!token && view === 'login' && (
          <Login
            onLogin={(t) => {
              localStorage.setItem('token', t);
              setToken(t);
            }}
            onSwitch={() => setView('signup')}
          />
        )}

        {!token && view === 'signup' && (
          <Signup
            onSignup={(t) => {
              localStorage.setItem('token', t);
              setToken(t);
            }}
            onSwitch={() => setView('login')}
          />
        )}

        {token && <MoodBoard token={token} />}
      </main>
    </div>
  );
}

export default App;
