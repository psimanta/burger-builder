import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import axios from '../../AxiosInstance/axios-instance';
import Loading from './Loading/Loading';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 80,
        purchasable: false,
        modalOpen: false,
        isLoading: false,
    }

    componentDidMount() {
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        const ingredients = {
            ...this.state.ingredients
        }
        ingredients[type] = updatedCount;
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(ingredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        const ingredients = {
            ...this.state.ingredients
        }
        ingredients[type] = updatedCount;
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(ingredients);
    }

    purchaseContinueHandler = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: [{ hello: 1, hello2: 2 }, { hello: 1, hello2: 2 }],
            price: this.state.totalPrice,
            customer: {
                name: 'Simanta Paul',
                address: {
                    street: 'Mid Town By Lane',
                    postal: '4000',
                    country: 'Bangladesh'
                },
                email: 'test@gmail.com',
                paymentMethod: 'Cash On Delivery'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ isLoading: false });
                this.toggleModal();
            })
            .catch(error => {
                this.setState({ isLoading: false });
                this.toggleModal();
            });
    }


    render() {
        let modal = null;
        if (this.state.isLoading) {
            modal = <Loading />
        } else if (this.state.ingredients !== null) {
            modal = (<div>
                <ModalHeader>Your Order Summary</ModalHeader>
                <ModalBody>
                    <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
                    <Summary ingredients={this.state.ingredients} />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.purchaseContinueHandler}>Continue to Checkout</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
            </div>);
        }
        let burger_controls = null;
        if (this.state.ingredients === null) {
            burger_controls = <Loading />
        }
        else {
            burger_controls = (<div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    toggleModal={this.toggleModal}
                />
            </div>)
        }

        return (
            <div>
                {burger_controls}
                <Modal isOpen={this.state.modalOpen}>
                    {modal}
                </Modal>
            </div>

        )
    }
}
