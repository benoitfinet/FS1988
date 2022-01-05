import './App.css';
import Home from './components/Home'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="layout" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
