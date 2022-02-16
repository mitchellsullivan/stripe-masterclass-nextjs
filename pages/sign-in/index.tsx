import React, {useState} from 'react';
import {Formik} from 'formik';
import {useAuth} from "../../context/auth-context";
import {NextPage} from "next";
import {useRouter} from "next/router";

const validate = values => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const SignInPage: NextPage = (props) => {
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    console.log('values', values);
    const {email, password} = values;
    try {

      //signin with firebase
      await auth.signIn(email, password);
      setSubmitting(false);
      await router.push('/shop');

    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
      setError(error);
    }

  }

  return (
    <div className='sign-up'>
      <h1>Sign In</h1>
      <div className='form-container'>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}>
          {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => {
            const {email} = errors;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='Email'
                    className={'nomad-input email ' + (email ? 'error' : '')}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    placeholder='Password'
                    className='nomad-input password'
                  />
                </div>
                <div className='submit-btn'>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button is-black nomad-btn submit">
                    Submit
                  </button>
                </div>
                <div className='error-message'>
                  {
                    error && <p>{error.message}</p>
                  }
                </div>
              </form>
            )
          }
          }
        </Formik>
      </div>
    </div>
  );
}

export default SignInPage;
