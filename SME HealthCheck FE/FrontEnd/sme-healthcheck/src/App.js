import './App.css';
import Forms from './Forms';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayData from './DisplayData';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/displayData" element={<DisplayData />} />
      </Routes>
    </Router>
  );
}

export default App;
