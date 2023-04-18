import React,{Component} from "react";
import {connect} from 'react-redux';
import {fetchOrders,fetchOrdersDjangoREST} from '../../redux/actionCreators';
import Order from "./Order/order";
import Spinner from "../Spinner/spinner";

const mapStateToProps = state => {
    return {
        orders: state.orders,
        ordersLoading: state.ordersLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token,userId) => dispatch(fetchOrders(token,userId)),
        fetchOrdersDjangoREST: (token,userId) => dispatch(fetchOrdersDjangoREST(token,userId))
    }
}
class Orders extends Component {
    componentDidMount() {
        // this.props.fetchOrders(this.props.token,this.props.userId);
        this.props.fetchOrdersDjangoREST(this.props.token,this.props.userId);
    }
    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{
                            border: '1px solid grey',
                            boxShadow: '1px solid #888888',
                            borderRadius: '5px',
                            padding: '20px',
                            marginBottom: '10px'}}>
                                Sorry, failed to load orders!
                    </p>
        } else {
            if (this.props.orders.length===0) {
                orders = <p style={{
                            border: '1px solid grey',
                            boxShadow: '1px solid #888888',
                            borderRadius: '5px',
                            padding: '20px',
                            marginBottom: '10px'}}>
                        No order placed yet!
                    </p>
            } else {
                orders = this.props.orders.map(order=>{
                    return (
                        <Order order={order} key={order.id}/>
                    );
                })
            }
        };
        return (
            <div>
                {this.props.ordersLoading ? <Spinner/> : orders}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);