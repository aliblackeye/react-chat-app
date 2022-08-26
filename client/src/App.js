import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";
import './responsive.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} exact />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
