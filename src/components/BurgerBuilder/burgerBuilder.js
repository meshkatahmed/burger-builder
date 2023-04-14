import React, {Component} from 'react';
import Burger from './Burger/burger.js';
import Controls from './Controls/controls.js';
import {Modal,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap';
import Summary from './Summary/summary.js';
import {connect} from 'react-redux';
import {addIngredient,removeIngredient,updatePurchasable} from '../../redux/actionCreators.js';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igType) => dispatch(addIngredient(igType)),
        removeIngredient: (igType) => dispatch(removeIngredient(igType)),
        updatePurchasable: () => dispatch(updatePurchasable())
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }
    addIngredientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }
    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }
    toggleModal = () => { 
        this.setState(
            {
                modalOpen: !this.state.modalOpen
            }
        )
    }
    handleCheckout = () => {
        this.props.history.push('/checkout');
    }

    render () {
        return (
            <div>
                <div className='d-flex flex-md-row flex-column'>
                    <Burger ingredients={this.props.ingredients}/>
                    <br/>
                    <Controls ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice} toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor: '#D70F64'}} 
                            onClick={this.handleCheckout}>
                                Continue to Checkout
                        </Button>
                        <Button color='secondary' 
                            onClick={this.toggleModal}>
                                Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);