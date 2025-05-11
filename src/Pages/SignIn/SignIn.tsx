import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useContext, useState, type ReactNode } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { getParsedStorageObject, getValidAccount, userHasAccountFrom } from "../../utils";
import type { Account } from "../../Types";
import AccountForm from "../../Components/AccountForm/AccountForm";

function SignIn() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const navigate = useNavigate();

  // Account
  const parsedAccount = getParsedStorageObject('account');
  const validAccount = getValidAccount(parsedAccount);
  const userHasAccount = userHasAccountFrom(parsedAccount, context.account);


  const handleSignIn = (): void => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(false);
    navigate("/");
  };

  const createAccount = (data: Account): void => {
    localStorage.setItem("account", JSON.stringify(data));
    context.setAccount(data);
    handleSignIn();
  };

  const renderLogin = (): ReactNode => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>
            {typeof parsedAccount.email === "string" &&
            parsedAccount.email.trim() !== ""
              ? parsedAccount.email
              : "Not registered"}
          </span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>
            {typeof parsedAccount.password === "string" &&
            parsedAccount.password.trim() !== ""
              ? parsedAccount.password
              : "Not registered"}
          </span>
        </p>
        <Link to={"/"}>
          <button
            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
            onClick={handleSignIn}
            disabled={!userHasAccount}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a
            className="font-light text-xs underline underline-offset-4"
            href="/"
          >
            Forgot my password
          </a>
        </div>
        <button
          className="border border-black disabled:bg-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
          disabled={userHasAccount}
          onClick={() => setView("create-user-info")}
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => (
    <AccountForm
      buttonLabel="Create"
      initialData={validAccount ?? undefined}
      onSubmit={createAccount}
    />
  );

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogin();

  return (
    <Layout>
      <h1 className="font-medium- text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
