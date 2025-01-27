import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Error  from './Components/NotFound';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='error' Component={Error} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
