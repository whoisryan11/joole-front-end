import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './productDetail.module.css';
import * as authAction from '../../actions/auth';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        let products = []
        if (this.props.mechanicalList !== undefined) {
            products = this.props.mechanicalList;
        } else if (localStorage.getItem('mechanicalList') !== null) {
            products = JSON.parse(localStorage.getItem('mechanicalList'));
        }
        let product = null;
        for (let p of products) {
            if ( p.id === Number (this.props.match.params.productId) ) {
                product = p;
            }
        }
        this.state= {
            productDetail: product
        };
        console.log(this.state);
    }
    goBack() {
        this.props.history.goBack();
    }

    componentDidMount(){
        console.log(this.props);
    }

    logoutHandler(event) {
        event.preventDefault();
        this.props.onLogout();
    } 

    render () {
        return (
            <div style={{background:'linear-gradient(-45deg, #7bb5ee, #ffffff)'}}>
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
                    <button onClick={this.goBack}>Go Back</button>
                </div>
                <div className={styles.InlineDiv} style={{float: "right"}}>
                    <Link to={"/"}><button className={styles.Button} onClick={(event) => {this.logoutHandler(event)}}>Logout</button></Link>
                </div>
                <div className={styles.Nav}>
                    <Link to={'/search'}>Mechanicals</Link> {'>'} <Link to='/products'>HVAC Fans</Link> {'> ' + this.state.productDetail.model} 
                </div>
                <div className={styles.Title}>
                    <span className={styles.TitleName}>{this.state.productDetail.manufacture} / {this.state.productDetail.series} / {this.state.productDetail.model}</span>
                    <button style={{float: 'right', fontSize: 'larger'}}>Add to</button>
                </div>
                <div className={styles.Summary}>
                    <span className={styles.H1}>Product Summary</span>
                </div>
                <div className={styles.Table}>
                    <div className={styles.Column}>
                        <p className={styles.Seprator}>DESCRIPTION</p>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray' }}>
                                Manufacturer
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.manufacture}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray' }}>
                                Series
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.series}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Model
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.model}
                            </div>
                        </div>


                        <p className={styles.Seprator}>TYPE</p>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Use Type
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.type}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Application
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.application}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Mounting Location
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.mount}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Accessproes
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                With light
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Model Year
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {new Date(this.state.productDetail.date).getFullYear()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.Column}>
                        <p className={styles.Seprator}>TECHNICAL SPECIFICATION</p>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Airflow (CFM)
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.airflow}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Power (W)
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Min
                            </div>
                            <div style={{ width: '15%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.minPower}
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Max
                            </div>
                            <div style={{ width: '25%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.maxPower}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Operating voltage (VAC)
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Min
                            </div>
                            <div style={{ width: '15%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.minVAC}
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Max
                            </div>
                            <div style={{ width: '25%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.maxVAC}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Fan speed (RPM)
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Min
                            </div>
                            <div style={{ width: '15%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.minFanSpeed}
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Max
                            </div>
                            <div style={{ width: '25%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.maxFanSpeed}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Number of fan speeds
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.speeds}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Sound at max speed(dBA)
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.sound}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Fan sweep diameter(in)
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                {this.state.productDetail.diameter}
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Height(in)
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Min
                            </div>
                            <div style={{ width: '15%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                12.3
                            </div>
                            <div style={{ width: '15%', backgroundColor:'lightgray', textAlign: 'center'}}>
                                Max
                            </div>
                            <div style={{ width: '25%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                57
                            </div>
                        </div>
                        <div className={styles.Info}>
                            <div style={{ width: '30%', backgroundColor:'lightgray'}}>
                                Weight(lbs)
                            </div>
                            <div style={{ width: '70%', backgroundColor:'white', borderBottom:'1px solid lightgray'}}>
                                13
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const maptStateToProps = state => {
    return {
        mechanicalList: state.search.mechanicalList.mechanicalList
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( authAction.logout() )
    }
}

export default connect( maptStateToProps, mapDispatchToProps )( ProductDetail );