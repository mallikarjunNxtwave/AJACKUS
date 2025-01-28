// Import the MdErrorOutline icon from the react-icons/md library
import { MdErrorOutline } from "react-icons/md";
// Import the index.css file for styling
import './index.css'

// Define the Error component
const Error = () => (
    // Return the JSX element that represents the error page
    <div className='notfound-container'>
        <MdErrorOutline className="notfound-error-icon" />
        <h1 className='notfound-heading'>Not Found!</h1>
        <p className='notfound-description'>We didn't find anything to show you.</p>
    </div>
)


// Export the Error component as the default export
export default Error;