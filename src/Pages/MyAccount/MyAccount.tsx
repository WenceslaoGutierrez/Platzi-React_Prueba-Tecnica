import { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { getValidAccount } from "../../utils";
import type { Account } from "../../Types";
import AccountForm from "../../Components/AccountForm/AccountForm";

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState<"user-info" | "edit-user-info">("user-info");

  const parsedAccount = getValidAccount(context.account);

  const updateAccount = (data: Account): void => {
    localStorage.setItem("account", JSON.stringify(data));
    context.setAccount(data);
    setView("user-info");
  };

  const renderEditUserInfo = () => (
    <AccountForm
      initialData={parsedAccount ?? undefined}
      buttonLabel="Update"
      onSubmit={updateAccount}
    />
  );

  const renderUserInfo = () => (
    <div className="flex flex-col w-80">
      <p>
        <span className="font-light text-sm">Name: </span>
        <span>{parsedAccount?.name || "No name"}</span>
      </p>
      <p>
        <span className="font-light text-sm">Email: </span>
        <span>{parsedAccount?.email || "No email"}</span>
      </p>
      <button
        className="border border-black rounded-lg mt-6 py-3"
        onClick={() => setView("edit-user-info")}
      >
        Edit
      </button>
    </div>
  );

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My Account</h1>
      {view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo()}
    </Layout>
  );
}

export default MyAccount;
