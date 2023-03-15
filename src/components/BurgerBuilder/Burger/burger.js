import React from 'react';
import './burger.css';
import Ingredient from '../Ingredients/ingredients.js';

const Burger = props => {
    let ingredArr = props.ingredients.map(item=>{
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(()=>{
            return <Ingredient type={item.type} key={Math.random()}/>
        });
    }).reduce((arr,element)=>{
        return arr.concat(element);
    },[]);
    
    if (ingredArr.length===0) {
        ingredArr = <p>Please add some ingredients!</p>
    }
    return (
        <div className='burger'>
            <Ingredient type='bread-top'/>
            {ingredArr}
            <Ingredient type='bread-bottom'/>
        </div>
    );
}

export default Burger;