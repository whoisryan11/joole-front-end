import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Compare.module.css';
import * as authAction from '../../actions/auth';
class Compare extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        let products = [];
        products = Object.values({ ...props.location.products });
        this.state = {
            products: products
        };
        //console.log(this.state);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
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
                    </div>
                    <div className={styles.InlineDiv} style={{float: "right"}}>
                        <Link to={"/"}><button className={styles.Button} onClick={(event) => {this.logoutHandler(event)}}>Logout</button></Link>
                    </div>
                </div>
                <div className={styles.Nav}>
                    <Link to={'/search'}>Mechanicals</Link> {'>'} <Link to='/products'>HVAC Fans</Link> {'> Compare'} 
                    <button style={{float: 'right'}} onClick={this.goBack}>Go Back</button>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '15%'}} >
                        <div className={styles.LeftCell} style={{ height: '120px', background: "none"}}></div>
                        <div className={styles.LeftCell}>DESCRIPTION</div>
                        <div className={styles.LeftCell}>Manufacturer</div>
                        <div className={styles.LeftCell}>Series</div>
                        <div className={styles.LeftCell}>Model</div>
                        <div style={{ height: '35px', border: '1px solid grey' }}>TYPE</div>
                        <div className={styles.LeftCell}>Use Type</div>
                        <div className={styles.LeftCell}>Application</div>
                        <div className={styles.LeftCell}>Mounting Location</div>
                        <div className={styles.LeftCell}>Accessories</div>
                        <div className={styles.LeftCell}>Model year</div>
                        <div style={{ height: '35px', border: '1px solid grey' }}>TECHNICAL SPECIFICATIONS</div>
                        <div className={styles.LeftCell}>Airflow (CFM)</div>
                        <div className={styles.LeftCell}>Power (W)</div>
                        <div className={styles.LeftCell}>Operating voltage (VAC)</div>
                        <div className={styles.LeftCell}>Fan speed (RPM)</div>
                    </div>
                    <div className={styles.Products}>
                        {this.state.products.map(product => (
                        <div>
                            <div className={styles.ProductCell} style={{ height: '120px'}}>
                                <img alt={'Image'+product.id}></img>
                            </div>
                            <div className={styles.ProductCell}></div>
                            <div className={styles.ProductCell}>{product.manufacture}</div>
                            <div className={styles.ProductCell}>{product.series}</div>
                            <div className={styles.ProductCell}>{product.model}</div>
                            <div className={styles.ProductCell}></div>
                            <div className={styles.ProductCell}>{product.useType}</div>
                            <div className={styles.ProductCell}>{product.application}</div>
                            <div className={styles.ProductCell}>{product.mount}</div>
                            <div className={styles.ProductCell}>{product.accessories}</div>
                            <div className={styles.ProductCell}>{new Date(product.date).getFullYear()}</div>
                            <div className={styles.ProductCell}></div>
                            <div className={styles.ProductCell}>{product.airflow}</div>
                            <div className={styles.ProductCell} style={{display: 'flex', textAlign: 'center'}}>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Min</div>
                                <div className={styles.QuarterCell}>{product.minPower}</div>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Max</div>
                                <div className={styles.QuarterCell}>{product.maxPower}</div>
                            </div>
                            <div className={styles.ProductCell} style={{display: 'flex', textAlign: 'center'}}>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Min</div>
                                <div className={styles.QuarterCell}>{product.minVAC}</div>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Max</div>
                                <div className={styles.QuarterCell}>{product.maxVAC}</div>
                            </div>
                            <div className={styles.ProductCell} style={{display: 'flex', textAlign: 'center'}}>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Min</div>
                                <div className={styles.QuarterCell}>{product.minFanSpeed}</div>
                                <div className={styles.QuarterCell} style={{backgroundColor: 'lightgray'}}>Max</div>
                                <div className={styles.QuarterCell}>{product.maxFanSpeed}</div>
                            </div>
                        </div>) )}
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( authAction.logout() )
    }
}

export default connect( null, mapDispatchToProps )( Compare );