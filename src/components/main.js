import React from 'react';
import Header from './Header/header.js';
import BurgerBuilder from './BurgerBuilder/burgerBuilder.js';

const Main = props => {
    return (
        <div>
            <Header />
            <div className='container'>
                <BurgerBuilder />
            </div>
        </div>
    );
}

export default Main;