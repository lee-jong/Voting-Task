import React from 'react'
import { handleRouter } from '../../helpers/router'

class UserInfo extends React.Component {
    state = {
        userId : null
    }
    componentDidMount(){
        if(localStorage.getItem('id') != null) {
            this.setState({
                userId : localStorage.getItem('id')  
            })
        }else{
            this.setState({
                userId : null  
            })
        }
    }

    logout = () => {
        localStorage.removeItem('id')
        handleRouter('login')
    }

    render(){
        const {userId} = this.state
        return (
            <div className="userInfo">
                <div>
                    <span className="pointer" onClick={() => handleRouter()}>Home</span>
                </div>
                <div>
                    <span>( {userId} 님 )-</span>
                    <span className="pointer" onClick={() => this.logout()}>Logout</span>
                </div>
            </div>            
        )
    }
}

export default UserInfo