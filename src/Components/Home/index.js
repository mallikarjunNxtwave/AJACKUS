import { Component } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import Popup from 'reactjs-popup';
import './index.css'
import Users from '../Users'

const apiStatuses = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

class Home extends Component {
    state = {
        usersList: [],
        apiStatus: apiStatuses.initial,
        errorMsg: '',
        newName: '',
        newUsername: '',
        newEmail: '',
        mailValidMsg: '',
        newCompany: '',
        formErrorMsg: ''
    }

    componentDidMount() {
        this.GetUsers()
    }

    GetUsers = async () => {
        this.setState({
            apiStatus: apiStatuses.loading
        })
        try {
            const url = 'https://jsonplaceholder.typicode.com/users'
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
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
                this.setState({
                    apiStatus: apiStatuses.failure,
                })
            }
        } catch (error) {
            this.setState({
                apiStatus: apiStatuses.failure,
                errorMsg: error.message
            })
        }
    }

    onClickTryAgain = () => {
        this.GetUsers()
    }

    deleteUser = async id => {
        const { usersList } = this.state
        try {
            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            await fetch(url, { method: 'DELETE' })
            const filteredUsers = usersList.filter(each => each.id !== id)
            this.setState({ usersList: filteredUsers })

        } catch (error) {
            this.setState({ apiStatus: apiStatuses.failure })
        }
    }

    editUser = async (id, userDetails) => {
        const { usersList } = this.state
        try {
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

    editError = msg => {
        this.setState({ errorMsg: msg })
    }

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

    onChangeNewName = event => {
        this.setState({ newName: event.target.value })
    }
    onChangeNewUsername = event => {
        this.setState({ newUsername: event.target.value })
    }
    onChangeNewEmail = event => {
        const { value } = event.target
        if (value.endsWith("@gmail.com")) {
            this.setState({ newEmail: value, mailValidMsg: '' })
        } else {
            this.setState({ newEmail: value, mailValidMsg: "Must ends with @gmail.com" })
        }
    }
    onChangeNewCompany = event => {
        this.setState({ newCompany: event.target.value })
    }

    onSubmitForm = async event => {
        event.preventDefault()
        const { newName, newUsername, newEmail, newCompany, mailValidMsg } = this.state
        if (newName !== '' && newUsername !== '' && mailValidMsg === '' && newCompany !== '') {
            try {
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
                if (response.ok) {
                    this.setState({errorMsg: ''})
                    const data = await response.json()
                    alert(`New User is created successfully. ID:-${data.id}`)
                } else {
                    this.setState({ apiStatus: apiStatuses.failure, errorMsg: '' })
                }
            } catch (error) {
                this.setState({ apiStatus: apiStatuses.failure , errorMsg: ''})
            }
        }else {
            this.setState({errorMsg: "Fill all the details while add New User"})
        }


    }

    renderPopup = () => {
        const { mailValidMsg } = this.state
        return (
            <Popup
                modal
                trigger={
                    <div className='add-button-container'>
                        <button type='button' className='add-button'>Add User</button>
                    </div>
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

    render() {
        const { errorMsg } = this.state
        return (
            <div className='home-container'>
                <div className='logo-container'>
                    <h1 className='logo'>A.</h1>
                    <h1 className='company-name'>AJACKUS</h1>
                </div>
                {this.renderPopup()}
                {errorMsg !== '' ? <p className='error-msg'>*{errorMsg}</p> : null}
                {this.renderOutput()}
            </div>
        )
    }
}

export default Home;