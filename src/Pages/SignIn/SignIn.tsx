import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import { useContext, useRef, useState, type ReactNode } from 'react';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';

function SignIn() {
  const context= useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

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

  const handleSignIn = (): void => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(false);
    navigate('/');
  }

  const createAccount = () : void =>{
    if(!form.current) return;
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    localStorage.setItem('account', JSON.stringify(data));
    context.setAccount(data);
    handleSignIn();
  }

  const renderLogin = () :ReactNode =>{
    return(
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
          <button className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2' onClick={handleSignIn} disabled={!userHasAccount}>Log In</button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href="/">Forgot my password</a>
        </div>
        <button className='border border-black disabled:bg-black/40 disabled:border-black/40 rounded-lg mt-6 py-3' disabled={userHasAccount}
        onClick={() => setView ('create-user-info')}>Sign up</button>
      </div>
    )
  };

  const renderCreateUserInfo = () : ReactNode => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your name:
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            defaultValue={
              typeof parsedAccount.name === "string" &&
              parsedAccount.name.trim() !== ""
                ? parsedAccount.name
                : ""
            }
            placeholder="John Doe"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            defaultValue={
              typeof parsedAccount.email === "string" &&
              parsedAccount.email.trim() !== ""
                ? parsedAccount.email
                : ""
            }
            placeholder="exaple@email.com"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            defaultValue={
              typeof parsedAccount.password === "string" &&
              parsedAccount.password.trim() !== ""
                ? parsedAccount.password
                : ""
            }
            placeholder="********"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <Link to={"/"}>
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            onClick={(e) => {
              e.preventDefault();
              if (form.current?.reportValidity()) {
                createAccount();
              }
            }}
          >
            Create
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin();

  return (
    <Layout>
      <h1 className='font-medium- text-xl text-center mb-6 w-80'>Welcome</h1>
      {renderView()}
    </Layout>
    
  );
}

export default SignIn;