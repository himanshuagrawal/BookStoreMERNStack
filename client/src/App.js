import React from 'react';
import Guest from './Guest';
import User from './User';


class App extends React.Component {
    state={
        auth:false,
        user:{}
    }
    componentDidMount(){
        console.log("Hey Thetre");
        fetch('/userapi/getInitialUserStatus')
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            if(data.auth){
                this.setState({
                    auth:data.auth,
                    user:data.user
                })
            }
        })
    }
    updateState=(obj)=>{
        this.setState({
            auth:obj.auth,
            user:obj.user
        })
    }
    render() {
        if(this.state.auth===false){
            return <Guest authStatus={this.state.auth} updateAuthState={this.updateState}/>
        }else{
            return <User authStatus={this.state.auth} userDetails={this.state.user} updateState={this.updateState}/>
        }
    }
}

export default App;