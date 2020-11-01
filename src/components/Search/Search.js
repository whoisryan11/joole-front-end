import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginHeader from '../LoginHeader/LoginHeader';
import * as searchAction from '../../actions/search'


class Search extends Component {
    state = {
        type: '',
    }
    
    inputChangeHandler = (event) => {
        this.setState({
            type: event.target.value
        });
    }
    
    submitHandler(event) {
        event.preventDefault();
        this.props.onSearch(this.state.type)
        .then(() => {
            console.log("Search Success")
        }).catch(() => {
            console.log("Search Fail")
        });
    }

    render() {
        if (this.props.searched){
            //console.log(this.props.mechanicalList.mechanicalList);
            return ( <Redirect to={"/products"} />);
        }
        return (
        <div>
            <LoginHeader />
            <input 
                value={this.state.type}
                onChange={(event) => {this.inputChangeHandler(event)}}/>
            <button onClick={(event) => this.submitHandler(event)}>Search</button>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        mechanicalList: state.search.mechanicalList,
        searched: state.search.searched
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (type) => dispatch( searchAction.search(type) ),
        finishSearch: () => dispatch( searchAction.finishSearch() ),
    }
}


export default connect( mapStateToProps, mapDispatchToProps)(Search);