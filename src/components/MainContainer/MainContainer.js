import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import * as authAction from '../../actions/auth';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Search from '../Search/Search';
import Product from '../Product/Product';

import styles from './MainContainer.module.css'


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn
        }
        
    }

    componentDidMount(){
        console.log(this.props);
    }

    logoutHandler(event) {
        event.preventDefault();
        this.props.onLogout();
    }

    render(){
        const routeGuard =  this.props.loggedIn;
        return (
        <div className={styles.Main}>
            
            {routeGuard ? <h1><button onClick={(event) => {this.logoutHandler(event)}}>Logout</button></h1> : null} 

            <Switch>
                <Route exact path='/' render={() => 
                <div>
                    <p><Link  to={`/login`}>Login</Link></p>
                    <p><Link  to={`/signup`}>Sign Up</Link></p>
                </div>} />

                <Route exact path='/signup' render={ ( routeProps ) => <Signup {...routeProps} />} />
                <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
                <Route exact path="/search" render={(routeProps) => ( routeGuard ? (<Search {...routeProps}/>) : (<Redirect to='/login'/>) ) }/>
                <Route exact path="/product" render={(routeProps) => ( routeGuard ? (<Product {...routeProps}/>) : (<Redirect to='/login'/>) ) }/>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( authAction.logout() ),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
