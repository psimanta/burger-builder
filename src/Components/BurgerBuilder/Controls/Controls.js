import React from 'react';
import './Controls.css';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];


const BuildControl = (props) => (
    <div className="d-flex">
        <div className="mr-auto ml-5 Label">{props.label}</div>
        <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
        <button className="btn btn-success btn-sm m-1 mr-5" onClick={props.added}>More</button>
    </div>
);

const Controls = (props) => (
    <div className="container ml-md-5" style={{ textAlign: "center" }}>
        <Card style={{ marginTop: "30px", textAlign: "center" }}>
            <CardHeader style={{ backgroundColor: "#D70F64", color: "white" }}><h4>Add Ingredients</h4></CardHeader>
            <CardBody>
                {controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        type={ctrl.type}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                    />
                ))}
            </CardBody>
            <CardFooter><h5>Price: <strong>{props.price.toFixed(0)}</strong> BDT</h5></CardFooter>
            <Button disabled={!props.purchasable} onClick={props.toggleModal}>Order Now</Button>
        </Card>
    </div>
);

export default Controls;