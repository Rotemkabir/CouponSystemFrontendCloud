import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {

  const [userType, setUserType] = useState<string>(store.getState().userReducer.user.clientType);
  useEffect(()=> {
    store.subscribe(() => {
      setUserType(store.getState().userReducer.user.clientType);
    })
  }, [])

  return (
    <div className="Menu bg-secondary">
      {
        userType === "ADMINISTRATOR" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/allCompanies">All companies</Link>
            <Link to="/allCustomers">All customers</Link>
            <Link to="/about">About</Link>
            <Link to="/developer">Developer</Link>
          </>
        )}
      {
        userType === "COMPANY" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/allCoupons">All coupons</Link>
            <Link to="/companyDetails">My profile</Link>
            <Link to="/about">About</Link>
            <Link to="/developer">Developer</Link>
          </>
        )}
      {
        userType === "CUSTOMER" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/allPurchasedCoupons">All purchased coupons</Link>
            <Link to="/purchaseNewCoupon">Purchase new coupon</Link>
            <Link to="/customerDetails">My profile</Link>
            <Link to="/about">About</Link>
            <Link to="/developer">Developer</Link>
          </>
        )}
    </div>
  );
}

export default Menu;
