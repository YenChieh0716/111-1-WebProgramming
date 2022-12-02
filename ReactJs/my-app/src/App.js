import logo from './logo.svg';
import './App.css';
// import './sidebar.js'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Title from './components/title';
import MySidebar from './components/sidebar';
import Main from './components/main';
function App() {
  return (
    <div className="App">
      <Title />
      <MySidebar />
      <Main />
    </div>
  );
}

export default App;