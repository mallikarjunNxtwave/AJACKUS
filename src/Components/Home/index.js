import { Component } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
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
                this.setState({
                    usersList: data,
                    apiStatus: apiStatuses.success
                })
            } else {
                this.setState({
                    apiStatus: apiStatuses.failure,
                    errorMsg: 'Error'
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

    renderOutput = () => {
        const { apiStatus, usersList } = this.state
        switch (apiStatus) {
            case "SUCCESS":
                return (
                    <div className='users-container'>
                        {usersList.map(each => (
                            <Users userDetails={each} />
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
        return (
            <div className='home-container'>
                <div className='logo-container'>
                    <h1 className='logo'>A.</h1>
                    <h1 className='company-name'>AJACKUS</h1>
                </div>
                <div className='add-button-container'>
                    <button type='button' className='add-button'>Add User</button>
                </div>
                {this.renderOutput()}
            </div>
        )
    }
}

export default Home;