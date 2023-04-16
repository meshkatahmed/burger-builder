import React from 'react';
import Header from './Header/header.js';
import BurgerBuilder from './BurgerBuilder/burgerBuilder.js';
import Orders from './Orders/orders.js';
import Checkout from './Orders/Checkout/checkout.js';
import AuthForm from './Auth/authForm';
import {Route} from 'react-router-dom';

const Main = props => {
    return (
        <div>
            <Header />
            <div className='container'>
                <Route path='/' exact component={BurgerBuilder} />
                <Route path='/orders' exact component={Orders} />
                <Route path='/checkout' exact component={Checkout} />
                <Route path='/login' exact component={AuthForm} />
            </div>
        </div>
    );
}

export default Main;