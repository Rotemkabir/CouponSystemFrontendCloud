import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/AdminService";
import { CouponModel } from "../../../Models/CustomerService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "CUSTOMER") {
            navigate("/login")
        }
    }, []);

    const [customer, setCustomer] = useState<CustomerModel>();
    useEffect(() => {
        webApi.getCustomerDetails()
            .then((res) => { setCustomer(res.data) })
            .catch((err) => notify.error(err));
    }, []);

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect(() => {
        webApi.getCustomerPurchaseCoupon()
            .then((res) => { setCoupons(res.data) })
            .catch((err) => notify.error(err));
    }, []);

    return (
        <div className="CustomerDetails">
                <div className="boxUser row">
                <img src="https://i.imgur.com/rNIkITf.jpg" alt="image" />&nbsp;&nbsp;&nbsp;&nbsp;
                First name:&nbsp;<span className="bold2">{customer && customer.firstName}</span>&nbsp;&nbsp;
                Last name:&nbsp;<span className="bold2">{customer && customer.lastName}</span>&nbsp;&nbsp;
                Email:&nbsp;<span className="bold2">{customer && customer.email}</span>&nbsp;&nbsp;
                Password:&nbsp;<span className="bold2">{customer && customer.password}</span>
                </div>
                <div className="row">
                {coupons.length > 0 ? (
                    <>
                        {coupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} showButtons={false} startDate={coupon.startDate} endDate={coupon.endDate} />
                        ))}
                    </>
                ) : (
                    <p>NO COUPON YET..</p>
                )}
                </div>
        </div>
    );
}

export default CustomerDetails;
