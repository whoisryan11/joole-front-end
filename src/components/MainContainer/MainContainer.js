import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import Login from '../Login/Login';


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn
        }
        
    }

    componentDidMount(){
        //console.log(this.props);
    }


    render(){
        const routeGuard = this.state.loggedIn || this.props.loggedIn;
        return (
        <div className="Main-Container">
            
            {routeGuard ? <h1>Logged In</h1> : <h1>Not Logged In</h1>} 

            <Switch>
                <Route exact path='/' render={() => <div><p><Link  to={`/login`}>
                    Please click here to login!</Link></p></div>} />
                <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
            </Switch>
        </div>)
    }
}
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        loggedIn: state.auth.isLoggedIn,
    }
};


export default connect(mapStateToProps, null)(MainContainer);
