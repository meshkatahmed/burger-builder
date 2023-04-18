import React from "react";

const Order = props => {
    const ingredientObj = props.order.ingredients;
    const ingredients = [];
    for (let[key,value] of Object.entries(ingredientObj)) {
        ingredients.push({type:key,amount:value});
    }
    const ingredientSummary = ingredients.map(item => {
        return (
            <span key={item.type} style={{
                border: '1px solid grey',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px'}}>
                    {item.amount} x <span style={{textTransform: 'capitalize'}}>
                                        {item.type}
                                    </span>
            </span>
        );
    })
    return (
        <div style={{
            border: '1px solid grey',
            boxShadow: '1px solid #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px'
        }}>
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Adress: {props.order.customer.deliveryAddress}</p>
            <hr/>
            {ingredientSummary}
            <hr/>
            <p>Total: {props.order.price} BDT</p>
        </div>
    );
}

export default Order;