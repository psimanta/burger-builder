import React from 'react';
import './Ingredients.css';

const Ingredients = props => {
    let ingredient = null;

    switch (props.type) {
        case 'bread-bottom':
            ingredient = <div><img src="assets/images/bottom.png" alt="Bottom" /></div>;
            break;
        case 'bread-top':
            ingredient = <div><img src="assets/images/top.png" alt="Top" /></div>
            break;
        case ('meat'):
            ingredient = <div><img src="assets/images/meat.png" alt="Meat" /></div>;
            break;
        case ('cheese'):
            ingredient = <div><img src="assets/images/cheese.png" alt="Meat" /></div>;
            break;
        case ('salad'):
            ingredient = <div><img src="assets/images/salad.png" alt="Meat" /></div>;
            break;
        default:
            ingredient = null;
    }
    return (
        <div className="Ingredients">
            {ingredient}
        </div>
    )
}

export default Ingredients;