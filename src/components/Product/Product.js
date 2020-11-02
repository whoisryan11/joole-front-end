import { Checkbox, Button, Card, CardActions, CardContent, GridList, GridListTile, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './product.module.css';
const Products = (props) => {
    return (
        <div className={styles.Products}>
            <GridList cols={4} cellHeight={500}>
                {props.products.map(product => (
                    <GridListTile key={product.id} cols={1}>
                        <Card className={styles.Card}>
                            <div className={styles.Verify}>Verified {product.date.substring(0,10)}</div>
                            <Link to={'/productDetail/' + product.id}>
                                <img width='200px' height='200px' alt={"Image " + product.id }></img>
                            </Link>
                            <CardContent className={styles.CardContent} style={{padding: '0px'}}>
                                <Typography className={styles.Center} component={'div'}>
                                    <h3>{product.manufacture}</h3>
                                    <h3>{product.series}</h3>
                                    <h3>{product.model}</h3>
                                </Typography>
                                <Typography className={styles.Detail} component={'div'}>
                                    <div>
                                        <span>{product.airflow.toLocaleString()} CFM</span><br/>
                                        <span>{product.maxPower} W at max speed</span><br/>
                                        <span>{product.sound} dBA at max speed</span><br/>
                                        <span>{product.diameter}" fan sweep diameter</span><br/>
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Checkbox color="default" />
                                <div>compare</div>
                                <Button variant="contained" color="primary">
                                    Add to
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default Products;