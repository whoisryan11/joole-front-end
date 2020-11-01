import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as searchAction from '../../actions/search';
import Filter from '../Filter/Filter';
import Products from './Product';

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
    
    constructor(props) {
        super(props);
        this.state = { 
            products: this.props.mechanicalList.mechanicalList,
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

    render() {
        let productList = [...this.state.products];
        productList = this.yearFilter(productList, this.state.filterParas.minYear, this.state.filterParas.maxYear);
        productList = this.airflowFilter(productList, this.state.filterParas.minAirflow, this.state.filterParas.maxAirflow);
        productList = this.powerFilter(productList, this.state.filterParas.minPower, this.state.filterParas.maxPower);
        productList = this.soundFilter(productList, this.state.filterParas.minSound, this.state.filterParas.maxSound);
        productList = this.diameterFilter(productList, this.state.filterParas.minDiameter, this.state.filterParas.maxDiameter);
        //console.log(this.state);
        // console.log(productList);
        return (<div>
            <Filter updateFilter={this.updateFilter}/>
            <Products products={ productList } />
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        mechanicalList: state.search.mechanicalList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        finishSearch: () => dispatch( searchAction.finishSearch() )
    }
}


export default connect( mapStateToProps, mapDispatchToProps )( ProductContainer );