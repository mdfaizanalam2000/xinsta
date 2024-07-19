import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <div className="container py-2 px-3">
        <Header setData={setData} />
        <Dashboard data={data} />
      </div>
    </div>
  );
}

export default App;
