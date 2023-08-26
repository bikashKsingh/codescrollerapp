import * as Yup from 'yup';

// loginSchema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 character')
    .required('Password is required'),
});

// signupSchema
export const signupSchema = Yup.object({
  name: Yup.string('').required('Name is a required field'),
  email: Yup.string()
    .email('Must enter a valid Email')
    .required('Email is a required field'),
  mobile: Yup.string()
    .required('Mobile is a required field')
    .matches(/^[0]?[6789]\d{9}$/, 'Mobile number must be a valid'),
  password: Yup.string()
    .required('Password is a required field')
    .min(5, 'Password must be at least 5 character'),
  cPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});

// updateProfile
export const updateProfile = Yup.object({
  name: Yup.string('').required('Name is a required field'),
  email: Yup.string()
    .email('Must enter a valid Email')
    .required('Email is a required field'),
  mobile: Yup.string()
    .required('Mobile is a required field')
    .matches(/^[0]?[6789]\d{9}$/, 'Mobile number must be a valid'),
  dob: Yup.date().required('Date Of Birth is required'),
  gender: Yup.string().required('Gender is a required'),
  state: Yup.string().required('State is a required'),
  city: Yup.string().required('City is a required'),
  address: Yup.string().required('Address is a required'),
});

// forgotPasswordSchema
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required'),
});

// otpSchema
export const otpSchema = Yup.object({
  otp: Yup.string()
    .min(4, 'OTP must be at least 4 digits')
    .max(4, 'OTP must be maximum 4 digits')
    .required('OTP is required'),
});

// createNewPasswordSchema
export const createNewPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Password is a required field')
    .min(5, 'Password must be at least 5 character'),
  cPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});
