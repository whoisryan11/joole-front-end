import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './productDetail.module.css';

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

    render () {
        return (
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
                    <button onClick={this.goBack}>Go Back</button>
                </div>
                <div className={styles.InlineDiv} style={{float: "right"}}>
                    <Link to={"/"}><button className={styles.Button} onClick={(event) => {this.logoutHandler(event)}}>Logout</button></Link>
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

export default connect( maptStateToProps, null )( ProductDetail );