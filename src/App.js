import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Error  from './Components/Error';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route path='*' Component={Error} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
