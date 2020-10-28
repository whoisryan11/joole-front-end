import React, {Component} from 'react';
import { connect } from 'react-redux';

import Input from '../Input';
import * as authAction from '../../actions/auth'
import { Redirect } from 'react-router-dom';

class Login extends Component {
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
            }
        }
    }

    checkValidaity (value, rules) {
        let isValid = true;
        if (!rules){
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
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


    componentDidMount() {
        console.log(this.props);
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value)
        .then(() => {
            console.log("Login Success")
        })
        .catch(() => {
            console.log("Login Failed")
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let errorMessage = null;
        if (this.props.message) {
            console.log(this.props.message);
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
        let authRedirect = null;
        if (this.props.loggedIn) {
            authRedirect= <Redirect to={'/LoggedIn'} />
        }

        return (
        <div>
            <form onSubmit={(event) => this.submitHandler(event)}>
                {authRedirect}
                {form}
                <button>Login</button>    
            </form>     
        </div>)
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.isLoggedIn,
        message: state.message.message,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch( authAction.login(username, password) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Login ); 