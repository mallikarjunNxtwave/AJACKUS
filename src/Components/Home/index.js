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
        errorMsg: ''
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
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        await fetch(url, { method: 'DELETE' })
        const filteredUsers = usersList.filter(each => each.id !== id)
        this.setState({ usersList: filteredUsers })
    }

    editUser = async (id, userDetails) => {
        const { usersList } = this.state
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': "application/json"
            }
        })
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

    render() {
        const { errorMsg } = this.state
        return (
            <div className='home-container'>
                <div className='logo-container'>
                    <h1 className='logo'>A.</h1>
                    <h1 className='company-name'>AJACKUS</h1>
                </div>
                <div className='add-button-container'>
                    <button type='button' className='add-button'>Add User</button>
                </div>
                {errorMsg !== '' ? <p className='error-msg'>*{errorMsg}</p> : null}
                {this.renderOutput()}
            </div>
        )
    }
}

export default Home;