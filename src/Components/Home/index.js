// Import necessary components and libraries
import { Component } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import Popup from 'reactjs-popup';
import './index.css'
import Users from '../Users'

// Define API status constants
const apiStatuses = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

// Define the Home component
class Home extends Component {
      // Initialize the component's state
    state = {
        usersList: [], // List of users
        apiStatus: apiStatuses.initial, // API request status
        errorMsg: '',// Error message
        newName: '', // New user's name
        newUsername: '', // New user's username
        newEmail: '', // New user's email
        mailValidMsg: '', // Email validation message
        newCompany: '', // New user's company
        formErrorMsg: '' // Form error message
    }
    
    // Lifecycle method: called when the component is mounted
    componentDidMount() {
        // Fetch the list of users from the AP
        this.GetUsers()
    }

    // Method to fetch the list of users from the API
    GetUsers = async () => {
        // Update the API request status to "loading"
        this.setState({
            apiStatus: apiStatuses.loading
        })
        try {
            // Fetch the list of users from the AP
            const url = 'https://jsonplaceholder.typicode.com/users'
            const response = await fetch(url)
            // Check if the response is OK
            if (response.ok) {
                // Parse the response data as JSON
                const data = await response.json()
                // Update the component's state with the list of users
                const modifiedUsersList = data.map(each => ({
                    id: each.id,
                    name: each.name,
                    username: each.username,
                    email: each.email,
                    company: each.company.name
                }))
                this.setState({
                    usersList: modifiedUsersList,
                    apiStatus: apiStatuses.success
                })
            } else {
                // Update the API request status to "failure"
                this.setState({
                    apiStatus: apiStatuses.failure,
                })
            }
        } catch (error) {
            // Update the API request status to "failure"
            this.setState({
                apiStatus: apiStatuses.failure,
            })
        }
    }

    // Method to handle the "Try Again" button click
    onClickTryAgain = () => {
        // Fetch the list of users from the API again
        this.GetUsers()
    }

    // Method to delete a user from the API
    deleteUser = async id => {
        const { usersList } = this.state
        try {
            // Fetch the user data from the API
            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            await fetch(url, { method: 'DELETE' })
            // Update the component's state by removing the deleted user
            const filteredUsers = usersList.filter(each => each.id !== id)
            this.setState({ usersList: filteredUsers })

        } catch (error) {
            this.setState({ apiStatus: apiStatuses.failure })
        }
    }

    // Method to edit a user in the API
    editUser = async (id, userDetails) => {
        const { usersList } = this.state
        try {
            // Fetch the user data from the API
            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(userDetails),
                headers: {
                    'Content-type': "application/json"
                }
            })

        } catch (error) {
            this.setState({ apiStatus: apiStatuses.failure })
        }
        // Update the component's state by editing the user
        const editedUsers = usersList.map(each => {
            if (each.id === id) {
                return {
                    id,
                    name: userDetails.name || each.name,
                    username: userDetails.username || each.name,
                    email: userDetails.email || each.email,
                    company: userDetails.company || each.company
                }
            }
            return each
        })
        this.setState({ usersList: editedUsers, errorMsg: '' })

    }

    // Method to update the error message
    editError = msg => {
        this.setState({ errorMsg: msg })
    }

    // Method to render the output based on the current state
    renderOutput = () => {
        const { apiStatus, usersList } = this.state
        switch (apiStatus) {
            case "SUCCESS":
                return (
                    <div className='users-container'>
                        {usersList.map(each => (
                            <Users userDetails={each} deleteUser={this.deleteUser} editUser={this.editUser} editError={this.editError} />
                        ))}
                    </div>
                )
            case "FAILURE":
                return (
                    <div className='failure-container'>
                        <h1 className='failure-text'>FAILURE</h1>
                        <p className='failure-description'>We are not getting users.</p>
                        <p className='failure-description'>Please try again</p>
                        <button className='try-again-button' type='button' onClick={this.onClickTryAgain}>Try Again</button>
                    </div>
                )
            default:
                return (
                    <div className='loader-container'>
                        <ClipLoader color='#1E2ADE' size={50} />
                    </div>
                )
        }
    }

    // Method to handle changes to the new user's name
    onChangeNewName = event => {
        this.setState({ newName: event.target.value })
    }

    // Method to handle changes to the new user's username
    onChangeNewUsername = event => {
        this.setState({ newUsername: event.target.value })
    }

    // Method to handle changes to the new user's email
    onChangeNewEmail = event => {
        const { value } = event.target
        if (value.endsWith("@gmail.com")) {
            this.setState({ newEmail: value, mailValidMsg: '' })
        } else {
            this.setState({ newEmail: value, mailValidMsg: "Must ends with @gmail.com" })
        }
    }

    // Method to handle changes to the new user's company
    onChangeNewCompany = event => {
        this.setState({ newCompany: event.target.value })
    }

    // Method to handle form submission
    onSubmitForm = async event => {
        event.preventDefault()
        const { newName, newUsername, newEmail, newCompany, mailValidMsg } = this.state
        if (newName !== '' && newUsername !== '' && newEmail !== '' && mailValidMsg === '' && newCompany !== '') {
            try {
                // Create a new user in the API
                const url = 'https://jsonplaceholder.typicode.com/users'
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: newName,
                        username: newUsername,
                        email: newEmail,
                        company: newCompany
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                // Check if the response is OK
                if (response.ok) {
                    // Clear the error message
                    this.setState({errorMsg: ''})
                    // Get the new user's ID
                    const data = await response.json()
                    // Display a success message
                    alert(`New User is created successfully. ID:-${data.id}`)
                } else {
                    // Update the API request status to "failure"
                    this.setState({ apiStatus: apiStatuses.failure, errorMsg: '' })
                }
            } catch (error) {
                // Update the API request status to "failure"
                this.setState({ apiStatus: apiStatuses.failure , errorMsg: ''})
            }
        }else {
            // Display an error message if the form is not valid
            this.setState({errorMsg: "Fill all the details while add New User"})
        }


    }

    // Method to render the popup modal for adding a new user
    renderPopup = () => {
        const { mailValidMsg } = this.state
        return (
            <Popup
                modal
                trigger={
                    <button type='button' className='add-button'>Add User</button>
                }
            >
                {close => (
                    <form className='add-user-form' onSubmit={(event) => {
                        this.onSubmitForm(event);
                        close();
                    }}>
                        <h1 className='add-user-heading'>New User</h1>
                        <div className='add-user-input-container'>
                            <label htmlFor='NAME' className='add-user-label-text'>NAME</label>
                            <input id='NAME' type='text' placeholder='Name' className='add-user-input-box' onChange={this.onChangeNewName} />
                        </div>
                        <div className='add-user-input-container'>
                            <label htmlFor='USERNAME' className='add-user-label-text'>USERNAME</label>
                            <input id='USERNAME' type='text' placeholder='Username' className='add-user-input-box' onChange={this.onChangeNewUsername} />
                        </div>
                        <div className='add-user-input-container'>
                            <label htmlFor='EMAIL' className='add-user-label-text'>EMAIL</label>
                            <input id='EMAIL' type='text' placeholder='Email' className='add-user-input-box' onChange={this.onChangeNewEmail} />
                            {mailValidMsg !== '' ? <p className='mail-valid-msg'>{mailValidMsg}</p> : null}
                        </div>
                        <div className='add-user-input-container'>
                            <label htmlFor='COMPANY' className='add-user-label-text'>COMPANY</label>
                            <input id='COMPANY' type='text' placeholder='Company' className='add-user-input-box' onChange={this.onChangeNewCompany} />
                        </div>
                        <div className='add-user-buttons-container'>
                            <button type='submit' className='add-user-submit-button'>Submit</button>
                            <button type='button' onClick={close} className='add-user-cancel-button'>Cancel</button>
                        </div>
                    </form>
                )}
            </Popup>
        )
    }

    // Render method
    render() {
        const { errorMsg } = this.state
        return (
            <div className='home-container'>
                <div className='logo-container'>
                    <h1 className='logo'>A.</h1>
                    <h1 className='company-name'>AJACKUS</h1>
                </div>
                <div className='add-button-container'>
                {this.renderPopup()}
                    </div>
                {errorMsg !== '' ? <p className='error-msg'>*{errorMsg}</p> : null}
                {this.renderOutput()}
            </div>
        )
    }
}

// Export the Home component as the default export
export default Home;