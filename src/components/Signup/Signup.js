import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authAction from '../../actions/auth'
import Input from '../Input/Input';
import { Link, Redirect } from 'react-router-dom';
import LoginHeader from '../LoginHeader/LoginHeader';

import styles from './Signup.module.css';

class Signup extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        },
    };

    checkValidaity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, contorlName) => { 
        const updatedControls = {
            ...this.state.controls,
            [contorlName]: {
                ...this.state.controls[contorlName],
                value: event.target.value,
                valid: this.checkValidaity(event.target.value, this.state.controls[contorlName].validation),
                touched: true
            }
        };
        //console.log(updatedControls);
        //console.log(this.state);
        this.setState({controls: updatedControls});
    }


    componentDidMount(){
        console.log(this.props);
        
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(
            this.state.controls.username.value, 
            this.state.controls.password.value,
            this.state.controls.email.value
        );
    }

    checkPasswordMatched () {
        if((this.state.controls.password.touched && this.state.controls.passwordConfirm.touched) && 
            (this.state.controls.password.valid && this.state.controls.passwordConfirm.valid) &&
            (this.state.controls.password.value !== this.state.controls.passwordConfirm.value)
        ){
            return (<p>Passwords do not match.</p>);
        } else {
            return null;
        }
    }


    checkAllValid () {
        let valid = true;
        for (let key in this.state.controls) {
            if (this.state.controls[key].valid === false){
                valid = false;
            }
        }
        return valid
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => {this.inputChangeHandler(event, formElement.id)}}
            />
        ))
        
        let passwordMatch = this.checkPasswordMatched();
        let allValid = this.checkAllValid();
        console.log(allValid);
        //let errorMessage = null;
        
        if(this.props.isregisterSuccess) {
            return (<Redirect to={'/login'} />)
        }
        

        return (
        <div className={styles.Signup}>
            <div className={styles.Right}><Link to={`/login`}>Login</Link></div>

            <LoginHeader />
            {passwordMatch}
            <form onSubmit={(event) => this.submitHandler(event)}>
                {form}
                <button disabled={passwordMatch !== null || allValid === false}>Sign Up</button>
            </form>
            
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.isLoggedIn,
        message: state.message.message,
        isregisterSuccess: state.auth.registered,
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        onRegister: (username, password, email) => dispatch( authAction.register(username, password, email) ),
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( Signup );