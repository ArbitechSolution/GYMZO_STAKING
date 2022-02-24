
import './App.css';
import Header from './Components/Header/Header';
import Home_page from './Components/Home_Page/Home_page'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <ToastContainer />

    <Header/>
  <Home_page/>


     


    </div>
  );
}

export default App;
