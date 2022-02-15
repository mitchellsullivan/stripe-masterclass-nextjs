import React, { useState } from 'react';
import { Formik } from 'formik';
import {NextPage} from "next";
import {useAuth} from "../../context/auth-context";
import {useRouter} from "next/router";

const validate = values => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // if (!values.firstname) { errors.firstname = 'Required' }
  if (!values.password) { errors.password = 'Required' }
  return errors;
}

const SignUpPage: NextPage = (props) => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const router = useRouter();

  const initialValues = {
    // firstname: '',
    email: '',
    password: '',
  }

  const handleSignUp = async (values, { setSubmitting }) => {
    console.log("handleSignUp");
    const { firstname, email, password } = values;

    try {
      await auth.signUp(email, password);
      await router.push('/shop');
      setSubmitting(false);
    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
      setError(error);
    }
  }

  return (
      <div className='sign-up'>
        <h1>Sign Up</h1>
        <div className='form-container'>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignUp}
          >
            {
              ({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
                const { firstname, email, password } = errors;
                return (
                  <form onSubmit={handleSubmit}>
                    {/*<div>*/}
                    {/*  <input*/}
                    {/*    type='text'*/}
                    {/*    name='firstname'*/}
                    {/*    onChange={handleChange}*/}
                    {/*    value={values.firstname}*/}
                    {/*    placeholder='First Name'*/}
                    {/*    className={ 'nomad-input ' + ( firstname ? 'error' : '' ) }*/}
                    {/*  />*/}
                    {/*</div>*/}
                    <div>
                      <input
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                        placeholder='Email'
                        className={ 'nomad-input ' + ( email ? 'error' : '' ) }
                      />
                    </div>
                    <div>
                      <input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                        placeholder='Password'
                        className={ 'nomad-input ' + ( password ? 'error' : '' ) }
                      />
                    </div>
                    <div className='submit-btn'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='button is-black nomad-btn submit'
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className='error-message'>
                      {
                        error && <p>{error.message}</p>
                      }
                    </div>
                  </form>
                );
              }
            }
          </Formik>
        </div>
      </div>
  );
}

export default SignUpPage;
