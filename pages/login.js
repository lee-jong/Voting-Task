import React from 'react'

import {handleRouter} from '../helpers/router'

class Login extends React.Component {
    state = {
        nickName : null
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    login = () => {
        const { nickName } = this.state
        if(nickName == null || (nickName !=null && nickName.replace(/ /g,"").length <= 0)) return alert("빈 값은 입력이 불가합니다.")
        localStorage.setItem('id', nickName)
        handleRouter()
    }

    render(){
        return(
            <div className="login">
              <div className="loginBox">
                <h1>LOGIN</h1>
                <div>
                  <div>
                    <input type="text" placeholder="닉네임을 입력하여 주세요. (최대 5글자)" name="nickName" onChange={e => this.handleChange(e)} autoComplete='off' maxLength="5"/> 
                  </div>
                </div>
                <div>
                  <button onClick={() => this.login()}>참가하기</button>
                </div>
              </div>
            </div>
        )
    }
}

export default Login