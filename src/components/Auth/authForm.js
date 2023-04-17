import React,{Component} from 'react';
import {Formik} from 'formik';
import {auth} from '../../redux/authActionCreatorsDjangoREST';
import {connect} from 'react-redux';
import Spinner from '../Spinner/spinner';
import {Alert} from 'reactstrap';

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}
const mapDisptachToProps = dispatch => {
    return {
        auth: (email,password,mode) => dispatch(auth(email,password,mode))
    }
}
class AuthForm extends Component {
    state = {
        mode: 'signup'
    }
    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode==='signup'?'login':'signup'
        })
    }
    render () {
        let err = null;
        if (this.props.authFailedMsg!==null) {
            err = <Alert color='danger'>{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik initialValues={{
                        email: '',
                        password: '',
                        passwordConfirm: '' 
                    }} onSubmit={(values) => {
                        this.props.auth(values.email,values.password,this.state.mode);
                    }}
                    validate={(values)=>{
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/i.test(values.email)) {
                            errors.email = 'Invalid Email Address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length<4) {
                            errors.password = 'Must be at least 4 characters';
                        }
                        if (this.state.mode==='signup') {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password!==values.passwordConfirm) {
                                errors.passwordConfirm = "Passwords don't match";
                            }
                        }
                        return errors;
                    }}
                >
                    {({values,handleChange,handleSubmit,errors}) => (<div style={{
                                                                    border: '1px grey solid',
                                                                    padding: '15px',
                                                                    borderRadius: '5px'
                                                                }}>
                            <button style={{
                                    width: '100%',
                                    backgroundColor: '#D70F64',
                                    color: 'white',
                                }} className='btn btn-lg' 
                                onClick={this.switchModeHandler}
                            >
                                Switch to {this.state.mode==='signup'?'Login':'Signup'}
                            </button>
                            <br/>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <input name='email' 
                                    placeholder='Enter Your Email'
                                    className='form-control'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{color:'red'}}>{errors.email}</span>
                                <br/>
                                <input name='password' 
                                    placeholder='Enter Password'
                                    className='form-control'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{color:'red'}}>{errors.password}</span>
                                <br/>
                                {this.state.mode==='signup'?
                                    <div>
                                        <input name='passwordConfirm' 
                                            placeholder='Confirm Password'
                                            className='form-control'
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                        />
                                        <span style={{color:'red'}}>{errors.passwordConfirm}</span>
                                        <br/>
                                    </div>:null}
                                <button type='submit' 
                                    className='btn btn-success'
                                >
                                    {this.state.mode==='signup'? 'Sign Up':'Login'}
                                </button>
                            </form>
                        </div>)
                    }
                </Formik>
            );
        }
        return (
            <div>
                {err}
                {form}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(AuthForm);