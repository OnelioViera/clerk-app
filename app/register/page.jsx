'use client';
import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        password
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Change UI to show verification code input
      setPendingVerification(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Verify User Email code handler
  const onPressVerify = async (e) => {

  };

  return (
    <div className='border p-5 rounded' style={{ width: '500px' }}>
      <h1 className="text-2xl mb-4">Register</h1>
      {!pendingVerification && (
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
          <div>
            <label htmlFor="first-name" className='block mb-2 text-sm font-medium text-gray-900'>
              First Name
            </label>
            <input type='text'
              name='first-name'
              id='first-name'
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              required={true}
            />
          </div>
          <div>
            <label htmlFor="first-name" className='block mb-2 text-sm font-medium text-gray-900'>
              Last Name
            </label>
            <input type='text'
              name='first-name'
              id='first-name'
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              required={true}
            />
          </div>
          <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
              Email Address
            </label>
            <input type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              className='bgg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              placeholder='name@company.com'
              required={true} />
          </div>
          <div>
            <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>
              Password
            </label>
            <input type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' />
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-600 hover:bg-blue-700 fi=ont-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Create an account
          </button>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form className="space-y-4 md:space-y-6">
            <input
              value={code}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
              placeholder='Enter Verification Code...'
              onChangeCapture={(e) => setCode(e.target.value)}
            />
            <button
              type='submit'
              onClick={onPressVerify}
              className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};



export default RegisterPage;