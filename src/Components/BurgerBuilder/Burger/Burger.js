import React from 'react';
import './Burger.css';
import Ingredients from '../Ingredients/Ingredients';

const Burger = props => {
    let IngredientsArr = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((item, i) => {
                return <Ingredients key={key + i} type={key} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    //console.log(IngredientsArr);
    if (IngredientsArr.length === 0) {
        IngredientsArr = <p>Please start adding ingredients!</p>
    }
    return (
        <div className="Burger">
            <Ingredients type="bread-top" />
            {/* <Ingredients type="cheese" />
            <Ingredients type="salad" />
            <Ingredients type="meat" /> */}
            {IngredientsArr}
            <Ingredients type="bread-bottom" />
        </div>
    )
}

export default Burger;