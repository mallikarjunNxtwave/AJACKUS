import './App.css';

// Import the necessary components from React Router v6
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import the Home and Error components
import Home from './Components/Home'
import Error  from './Components/Error';

// Define the App component
const App = () => {
  return (
    // Use the BrowserRouter component to enable client-side routing
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route path='*' Component={Error} />
    </Routes>
    </BrowserRouter>
  )
}

// Export the App component as the default export
export default App;
