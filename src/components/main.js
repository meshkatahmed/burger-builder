import React,{Component} from 'react';
import Header from './Header/header.js';
import BurgerBuilder from './BurgerBuilder/burgerBuilder.js';
import Orders from './Orders/orders.js';
import Checkout from './Orders/Checkout/checkout.js';
import AuthForm from './Auth/authForm';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { authCheck  } from '../redux/authActionCreators.js';
import Logout from './Auth/logout.js';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}
class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render () {
        let routes = null;
        if (this.props.token===null) {
            routes = (
                <Switch>
                    <Route path='/login' exact component={AuthForm} />
                    <Redirect to='/login' />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/orders' exact component={Orders} />
                    <Route path='/checkout' exact component={Checkout} />
                    <Route path='/logout' exact component={Logout} />
                    <Redirect to='/' />
                </Switch>
            );
        }
        return (
            <div>
                <Header />
                <div className='container'>
                    {routes}
                </div>
            </div>
        );
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);