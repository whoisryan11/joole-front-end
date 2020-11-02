import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as authAction from '../../actions/auth';
import * as searchAction from '../../actions/search';
import Filter from '../Filter/Filter';
import Products from './Product';
import styles from './product.module.css';

class ProductContainer extends Component{
    getAirflow() {
        return this.props.mechanicalList.mechanicalList.map(product => product.airflow);
    }

    getDate() {
        return this.props.mechanicalList.mechanicalList.map(product => product.date);
    }

    getDiameter() {
        return this.props.mechanicalList.mechanicalList.map(product => product.diameter);
    }

    getPower() {
        return this.props.mechanicalList.mechanicalList.map(product => product.maxPower);
    }

    getSound() {
        return this.props.mechanicalList.mechanicalList.map(product => product.sound);
    }

    searchChangeHandler = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    
    constructor(props) {
        super(props);
        this.state = { 
            products: this.props.mechanicalList.mechanicalList,
            search: '',
            filterParas: {
                minYear: '',
                maxYear: '',
                minAirflow: '',
                maxAirflow: '',
                minPower: '',
                maxPower: '',
                minSound: '',
                maxSound: '',
                minDiameter: '',
                maxDiameter: ''
            }
        };
    };

    searchFilter = (products) => {
        let productsExpand = [...products];
        let result = [];
        for (let product of productsExpand) {
            if (product.name.toLowerCase().includes(this.state.search.toLocaleLowerCase())){
                result.push(product);
            }
        }
        return result;
    }

    yearFilter = (products, minYear, maxYear) => {
        let productsExpand = [...products];
        let result = [];
        for ( let product of productsExpand ) {
            let year = new Date( product.date.substring(0, 10) ).getFullYear(); 
            if( minYear !== '' && year < ( +minYear )) continue;
            if( maxYear !== '' && year > ( +maxYear )) continue;
            result.push(product);
        }
        
        return result;
    };

    airflowFilter = (products, min, max) => {
        let productsExpand = [...products];
        let result = [];
        for ( let product of productsExpand ) {
            if ( min !== '' && product.airflow < ( +min )) continue;
            if ( max !== '' && product.airflow > ( +max )) continue;
            result.push(product);
        }
        return result;
    };

    powerFilter = (products, min, max) =>{
        let productsExpand = [...products];
        let result = [];
        for ( let product of productsExpand ) {
            if ( min !== '' && product.maxPower < ( +min )) continue;
            if ( max !== '' && product.maxPower > ( +max )) continue;
            result.push(product);
        }
        return result;
    };

    soundFilter = (products, min, max) =>{
        let productsExpand = [...products];
        let result = [];
        for ( let product of productsExpand ) {
            if ( min !== '' && product.sound < ( +min )) continue;
            if ( max !== '' && product.sound > ( +max )) continue;
            result.push(product);
        }
        return result;
    };

    diameterFilter = (products, min, max) =>{
        let productsExpand = [...products];
        let result = [];
        for ( let product of productsExpand ) {
            if ( min !== '' && product.diameter < ( +min )) continue;
            if ( max !== '' && product.diameter > ( +max )) continue;
            result.push(product);
        }
        return result;
    };

    updateFilter = (yearValue, airflowValue, powerValue, soundValue, diameterValue) => {
        let updatedFilter = {
            minYear: yearValue[0],
            maxYear: yearValue[1],
            minAirflow: airflowValue[0],
            maxAirflow: airflowValue[1],
            minPower: powerValue[0],
            maxPower: powerValue[1],
            minSound: soundValue[0],
            maxSound: soundValue[1],
            minDiameter: diameterValue[0],
            maxDiameter: diameterValue[1],
        }
        this.setState({ filterParas: updatedFilter});
    }
    
    componentDidMount() {
        this.props.finishSearch();
        
        //console.log(this.state);
        //console.log(minAirflow);
    }

    logoutHandler(event) {
        event.preventDefault();
        this.props.onLogout();
    }

    render() {
        
        let productList = [];
        if (this.state.products !== undefined) {
            productList = [...this.state.products];
        } else if (localStorage.getItem('mechanicalList') !== null ) {
            let products = JSON.parse(localStorage.getItem('mechanicalList'));
            productList = [...products];
        } 
        if(this.state.search.trim() !== '') {
            productList = this.searchFilter(productList);
        }
        productList = this.yearFilter(productList, this.state.filterParas.minYear, this.state.filterParas.maxYear);
        productList = this.airflowFilter(productList, this.state.filterParas.minAirflow, this.state.filterParas.maxAirflow);
        productList = this.powerFilter(productList, this.state.filterParas.minPower, this.state.filterParas.maxPower);
        productList = this.soundFilter(productList, this.state.filterParas.minSound, this.state.filterParas.maxSound);
        productList = this.diameterFilter(productList, this.state.filterParas.minDiameter, this.state.filterParas.maxDiameter);
        //console.log(this.state);
        // console.log(productList);
        return (
            <div>
                <div>
                    <div className={styles.InlineDiv} style={{float: "left"}}>
                        <span className={styles.logo}>j</span>
                        <span className={styles.logo}><svg width="48" height="48" className={styles.circle1}>
                            <circle cx="24" cy="24" r="23" fill="#1F4F7B" opacity="0.4" />
                        </svg></span>
                        <span><svg width="48" height="48" className={styles.circle2}>
                            <circle cx="24" cy="24" r="23" fill="#1F4F7B" opacity="0.4" />
                        </svg></span>
                        <span className={styles.logo}>l</span>
                        <span className={styles.logo}>e</span>
                    </div>
                    <div className={styles.InlineDiv}>
                        <select className={styles.Select}>
                            <option value="hvac_fans">HVAC Fans</option>
                        </select>
                        <input className={styles.Search} value={this.state.search} onChange={(event) => {this.searchChangeHandler(event)}}/>
                    </div>
                    <div className={styles.InlineDiv} style={{float: "right"}}>
                    <Link to={"/"}><button className={styles.Button} onClick={(event) => {this.logoutHandler(event)}}>Logout</button></Link>
                    </div>
                </div>
                <div>
                    <Filter updateFilter={this.updateFilter}/>
                    <Products products={ productList } />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mechanicalList: state.search.mechanicalList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        finishSearch: () => dispatch( searchAction.finishSearch() ),
        onLogout: () => dispatch( authAction.logout() ),
    }
}


export default connect( mapStateToProps, mapDispatchToProps )( ProductContainer );