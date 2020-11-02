import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import * as authAction from '../../actions/auth';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import SearchPage from '../SearchPage/SearchPage';
import ProductContainer from '../Product/ProductContainer';

import styles from './MainContainer.module.css'
import ProductDetail from '../ProductDetail/ProductDetail';


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
            <Switch>
                <Route exact path='/' render={() => 
                <div>
                    <p><Link  to={`/login`}>Login</Link></p>
                </div>} />
                <Route exact path='/signup' render={ ( routeProps ) => <Signup {...routeProps} />} />
                <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
                <Route exact path="/search" render={(routeProps) => ( routeGuard ? (<div><div className={styles.Header}><Link to={"/"}><button onClick={(event) => {this.logoutHandler(event)}}>Logout</button></Link></div><SearchPage {...routeProps}/></div>) : (<Redirect to='/login'/>) ) }/>
                <Route exact path="/products" render={(routeProps) => ( routeGuard ? (<ProductContainer {...routeProps}/>) : (<Redirect to='/login'/>) ) }/>
                <Route path='/productDetail/:productId' exact render={(routeProps) => ( routeGuard ? ( <ProductDetail {...routeProps} /> ) : (<Redirect to='/login'/>) )} />
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
