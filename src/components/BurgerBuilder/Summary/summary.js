import React from "react";
import Ingredient from "../Ingredients/ingredients";

const Summary = props => {
    const ingredSummary = props.ingredients.map(item => {
        return (
            <li key={item.type}>
                <span style={{textTransform:'capitalize'}}>{item.type}</span>: {item.amount}
            </li>
        );
    });
    return (
        <div>
            <ul>
                {ingredSummary}
            </ul>
        </div>
    );
}

export default Summary;