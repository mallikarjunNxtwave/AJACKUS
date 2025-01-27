import { Component } from 'react'
import './index.css'

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

    componentDidMount(){
        this.GetUsers()
    }

    GetUsers = async () => {
        this.setState({
            apiStatus: apiStatuses.loading
        })
        try {
            const url = 'https://jsonplaceholder.typicode.com/users'
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                this.setState({
                    usersList: data,
                    apiStatus: apiStatuses.success
                })
            }else {
                this.setState({
                    apiStatus: apiStatuses.failure,
                    errorMsg: 'Error'
                })
            }
        } catch (error) {
            
        }
    }

    render() {
        const {usersList} = this.state
        return (
            <div className='home-container'>
                <div className='logo-container'>
                    <h1 className='logo'>A.</h1>
                    <h1 className='company-name'>AJACKUS</h1>
                </div>
                <div className='add-button-container'>
                <button type='button' className='add-button'>Add User</button>
                </div>
            </div>
        )
    }
}

export default Home;