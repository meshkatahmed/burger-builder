import React,{Component} from 'react';
import {Formik} from 'formik';

class AuthForm extends Component {
    render () {
        return (
            <div>
                <Formik initialValues={{
                            email: '',
                            pssword: '',
                            passwordConfirm: '' 
                        }} onSubmit={(values)=>console.log(values)}
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

                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password!==values.passwordConfirm) {
                                errors.passwordConfirm = "Passwords don't match";
                            }
                            // console.log('Errors:', errors);
                            return errors;
                        }}
                >
                    {({values,handleChange,handleSubmit,errors}) => (<div style={{
                                                                        border: '1px grey solid',
                                                                        padding: '15px',
                                                                        borderRadius: '5px'
                                                                    }}>
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
                                    <input name='passwordConfirm' 
                                        placeholder='Confirm Password'
                                        className='form-control'
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <span style={{color:'red'}}>{errors.passwordConfirm}</span>
                                    <br/>
                                    <button type='submit' 
                                            className='btn btn-success'
                                    >
                                        Sign up
                                    </button>
                                </form>
                            </div>)
                    }
                </Formik>
            </div>
        );
    }
}

export default AuthForm;