import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateReview from "./pages/CreateReview";
import Header from './components/Header';
import Post from "./pages/Post"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Verification from './pages/Verification';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createreview" element={<CreateReview />} />
          <Route path="/gameposts/:id" element={<Post />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/registration/" element={<Registration />} />
          <Route path="/verification/:token" element={<Verification />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
