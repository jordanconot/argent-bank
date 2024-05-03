import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import authService from '../services/auth.service';
import { loginSuccess } from '../slice/sliceUser';

const SignIn = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().required('Password required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      try {
        const response = await authService.login(
          values.email,
          values.password,
          rememberMe
        );
        dispatch(loginSuccess(response));
      } catch (error) {
        console.error('Error auth', error);
      }
    },
    validationSchema: signInSchema,
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={handleChange}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="error-formik">{formik.errors.email}</div>
          )}
          {error && <div className="error-formik">{error}</div>}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={
              formik.values.email === '' || formik.values.password === ''
            }
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
