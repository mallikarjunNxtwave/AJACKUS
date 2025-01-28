// Import necessary dependencies
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from 'reactjs-popup';
import './index.css'

// Define the Users component
const Users = props => {
    // Destructure props
    const { userDetails, deleteUser, editUser, editError } = props
    // Destructure userDetails
    const { id, name, username, email, company } = userDetails

    // Initialize state for input fields
    const [inputName, setInputName] = useState('')
    const [inputUsername, setInputUsername] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputCompany, setInputcompany] = useState('')

    
    // Define functions
    const onClickYes = () => {
        deleteUser(id)
    }

    const onHandleStateChange = (event, setFunction) => {
        // Update state of input fields
        setFunction(event.target.value)
    }

    const onSubmitForm = event => {
        // Prevent default form submission behavior
        event.preventDefault()
        // Check if at least one input field has a value
        if(inputName !== '' || inputUsername !== '' || inputEmail !== '' || inputCompany !== ''){
            // Create new user object with updated details
            const editedUser = {
                ...(inputName && { name: inputName }),
                ...(inputUsername && { username: inputUsername }),
                ...(inputEmail && { email: inputEmail }),
                ...(inputCompany && { company: inputCompany }),
              }
              // Call editUser function with user's ID and new user object
            editUser(id, editedUser)

            // Reset input fields
            setInputName('')
            setInputUsername('')
            setInputEmail('')
            setInputcompany('')
        }else {
            // Display error message if no input fields have a value
            editError('Fill at least one value on edit a User')
        }
        
    }

    // Define popup components
    const deletePopup = () => (
        <Popup
            modal
            trigger={
                <button type="button" className="edit-delete-button">
                    <MdDelete className="delete" />
                </button>
            }
        >
            {close => (
                <div className="delete-popup">
                    <p className="delete-popup-text">Are you sure ?</p>
                    <div>
                        <button className="delete-popup-yes" onClick={() => {
                            onClickYes();
                            close();
                        }}>Yes</button>
                        <button className="delete-popup-no" onClick={() => close()}>No</button>
                    </div>
                </div>
            )}
        </Popup>
    )

    const editPopup = () => (
        <Popup
            modal
            trigger={
                <button type="button" className="edit-delete-button">
                    <MdEdit className="edit" />
                </button>
            }
        >
            {close => (
                <form className="edit-form" onSubmit={event => {
                    onSubmitForm(event);
                    close();
                }}>
                    <div className="input-container">
                        <label htmlFor="NAME" className="label-text">Previous Name:- {name}</label>
                        <input id="NAME" type="text" placeholder="Name" className="input-box" value={inputName} onChange={(event) => onHandleStateChange(event, setInputName)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="USERNAME" className="label-text">Previous Username:- {username}</label>
                        <input id="USERNAME" type="text" placeholder="Username" className="input-box" value={inputUsername} onChange={(event) => onHandleStateChange(event, setInputUsername)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="EMAIL" className="label-text">Previous Email:- {email}</label>
                        <input id="EMAIL" type="text" placeholder="Email" className="input-box" value={inputEmail} onChange={(event) => onHandleStateChange(event, setInputEmail)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="COMPANY" className="label-text">Previous Company:- {company}</label>
                        <input id="COMPANY" type="text" placeholder="Company" className="input-box" value={inputCompany} onChange={(event) => onHandleStateChange(event, setInputcompany)} />
                    </div>
                    <div className="edit-form-buttons-container">
                        <button type="submit" className="form-submit-button">Submit</button>
                        <button type="button" onClick={close} className="form-cancel-button">Cancel</button>
                    </div>
                </form>
            )}
        </Popup>
    )

    // Render the component
    return (
        <div className="user-container">
            <div className="profile-container">
                <CgProfile className="profile-icon" />
                <h1 className="name">{name}</h1>
            </div>
            <p className="username">USERNAME:- {username}</p>
            <div className="details-container">
                <p className="id">ID:- {id}</p>
                <p className="email">EMAIL:- {email}</p>
                <p className="company">COMPANY:- {company}</p>
                {editPopup()}
                {deletePopup()}
            </div>
        </div>
    )
}

// Export the Users component
export default Users;