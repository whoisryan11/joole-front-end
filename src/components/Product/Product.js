import { Checkbox, Button, Card, CardActions, CardContent, GridList, GridListTile, Typography } from '@material-ui/core';
import React from 'react';
import styles from './product.module.css';
const Products = (props) => {
    
    return (
        <div className={styles.Products}>
            <GridList cols={4} cellHeight={500}>
                {props.products.map(product => (
                    <GridListTile key={product.id} cols={1}>
                        <Card className={styles.Card}>
                            <div className={styles.Verify}>Verified {product.date.substring(0,10)}</div>
                            <CardContent>
                                <Typography className={styles.Center}>
                                    <div><p>{product.name}</p></div>
                                </Typography>
                                <Typography className={styles.Detail}>
                                    <div>
                                        {product.airflow.toLocaleString()} CFM <br/>
                                        {product.maxPower} W at max speed <br/>
                                        {product.sound} dBA at max speed <br/>
                                        {product.diameter}" fan sweep diameter
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