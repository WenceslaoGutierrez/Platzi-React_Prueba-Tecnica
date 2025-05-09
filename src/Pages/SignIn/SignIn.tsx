import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';

function SignIn() {
  const context= useContext(ShoppingCartContext);

  // Account
  const account = localStorage.getItem('account');
  let parsedAccount: Record<string, unknown> = {};

  try{
    parsedAccount = account ? JSON.parse(account) : {};
  }catch{
    parsedAccount = {};
  }

  // User has account?
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 :true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 :true;
  const userHasAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  return (
    <Layout>
      <h1 className='font-medium- text-xl text-center mb-6 w-80'>Welcome</h1>
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{typeof parsedAccount.email === 'string' && parsedAccount.email.trim() !== '' ? parsedAccount.email : 'Not registered'}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <span>{typeof parsedAccount.password === 'string' && parsedAccount.password.trim() !== '' ? parsedAccount.password : 'Not registered'}</span>
        </p>
        <Link to={"/"}>
          <button className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2' disabled={!userHasAccount}>Log In</button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href="/">Forgot my password</a>
        </div>
        <button className='border border-black disabled:bg-black/40 disabled:border-black/40 rounded-lg mt-6 py-3' disabled={userHasAccount}>Sign up</button>
      </div>
    </Layout>
  );
}

export default SignIn;