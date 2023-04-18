import React,{Component} from "react";
import { Modal,ModalBody,Button } from "reactstrap";
import { connect } from "react-redux";
import axios from 'axios';
import Spinner from '../../Spinner/spinner';
import {resetIngredients} from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        token: state.token,
        userId: state.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: '',
            phone: '',
            paymentType: 'Cash on delivery'
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: ''
    }
    goBack = () => {
        this.props.history.goBack('/');
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }
    submitHandler = () => {
        this.setState({isLoading: true});
        const ingredients = [...this.props.ingredients];
        const ingredientObj = {};
        for (let i of ingredients) {
            ingredientObj[i.type] = i.amount;
        }
        const order = {
            ingredients: ingredientObj,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            user: this.props.userId
        }
        const header = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        }
        axios.post('http://127.0.0.1:8000/api/order/',order,header)
                    .then(response => {
                        console.log(response);
                        if (response.status === 201) {
                            this.setState({
                                isLoading: false,
                                isModalOpen: true,
                                modalMsg: 'Order Placed Successfully!'
                            });
                            this.props.resetIngredients();
                        }
                        else 
                            this.setState({
                                isLoading: false,
                                isModalOpen: true,
                                modalMsg: 'Something went wrong, order again!'
                            })
                    })
                    .catch(err => {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: 'Something went wrong, order again'
                        });
                    });
    }
    render() {
        let form = (
            <div>
                <h4 style={{
                    border: '1px solid grey',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px'
                }}>Payment: {this.props.totalPrice} BDT</h4>
                <form style={{
                    border: '1px solid grey',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px'
                }}>
                    <textarea name="deliveryAddress" 
                        value={this.state.values.deliveryAddress} 
                        className="form-control" placeholder="Address"
                        onChange={(e)=>this.inputChangeHandler(e)}>
                    </textarea>
                    <br/>
                    <input name="phone" className="form-control" 
                        value={this.state.values.phone} 
                        placeholder="Phone Number"
                        onChange={(e)=>this.inputChangeHandler(e)}
                    />
                    <br/>
                    <select name="paymentType" className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(e)=>this.inputChangeHandler(e)}>
                            <option value='Cash on delivery'>
                                Cash on Delivery
                            </option>
                            <option value='Bkash'>Bkash</option>
                    </select>
                    <br/>
                    <Button style={{backgroundColor:'#D70F64'}} 
                        className="mr-auto" onClick={this.submitHandler}
                        disabled={!this.props.purchasable}>
                            Place Order
                    </Button>
                    <Button color="secondary" className="ml-1"
                        onClick={this.goBack}>
                            Cancel
                    </Button>
                </form>
            </div>
        );
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);