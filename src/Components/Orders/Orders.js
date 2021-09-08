import React, { Component } from 'react';
import axios from '../../AxiosInstance/axios-instance';

const Order = props => {
    return (
        <div style={{
            border: "1px solid black",
            width: "100%",
            marginBottom: "10px",
            padding: "20px",
            boxShadow: "1px 1px grey"
        }}>
            <p>Ingredients: </p>
            <p>Price: <strong>{props.price}</strong> BDT</p>
        </div>
    )
}

export default class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                //console.log(response.data);
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({ ...response.data[key], id: key });
                }
                //console.log(fetchedOrders);
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        )
    }
}