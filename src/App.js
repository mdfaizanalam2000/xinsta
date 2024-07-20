import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Upload instagram zip file to use tool!");
  const [cardMessage, setCardMessage] = useState("");

  return (
    <div className="App">
      <Navbar />
      <div className="container px-3">
        <Header setData={setData} setMessage={setMessage} setCardMessage={setCardMessage} />
        <Dashboard data={data} message={message} cardMessage={cardMessage} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
