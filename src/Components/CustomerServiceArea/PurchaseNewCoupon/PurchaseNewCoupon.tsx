import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CustomerService";
import { gotAllCouponsAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CouponCustomerCard from "../../SharedArea/CouponCustomerCard/CouponCustomerCard";
import "./PurchaseNewCoupon.css";

function PurchaseNewCoupon(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "CUSTOMER") {
            navigate("/login")
        }
    }, []);

    const [coupons, setCoupons]=useState<CouponModel[]>([]);
    useEffect(()=>{
        webApi.getAllCoupons()
        .then(res=>{
            setCoupons(res.data)
        })
        .catch(err=>notify.error(err))

        webApi.getCustomerPurchaseCoupon()
        .then(res=>{
            store.dispatch(gotAllCouponsAction(res.data));
        }).catch(err=>notify.error(err))
    },[]);
    
    return (
        <div className="PurchaseNewCoupon">
			<h3>Purchase New Coupon</h3>
            <div className="row">
            {coupons.map(coupon=>
                <CouponCustomerCard key={coupon.id} coupon={coupon} startDate={coupon.startDate} endDate={coupon.endDate}/>
            )}
            </div>
        </div>
    );
}

export default PurchaseNewCoupon;
