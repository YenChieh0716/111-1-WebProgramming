import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import Search from './components/search';
import Layout from './components/layout';
import NoMatch from './components/Nomatch';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
