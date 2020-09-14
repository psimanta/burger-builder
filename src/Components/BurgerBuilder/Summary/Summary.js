import React from 'react';

const Summary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: "capitalize" }}>{key}</span>: {props.ingredients[key]}
                </li>
            )
        })
    return (
        <div>
            <ul>
                {ingredientSummary}
            </ul>
        </div>
    )
}

export default Summary;