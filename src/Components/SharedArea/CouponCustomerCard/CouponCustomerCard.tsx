import { CouponModel } from "../../../Models/CustomerService";
import { BsCartPlus } from "react-icons/bs";
import "./CouponCustomerCard.css";
import store from "../../../Redux/Store";
import { purchaseCouponAction } from "../../../Redux/CustomerAppState";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { useState } from "react";
import moment from "moment";

interface couponCardProps {
    coupon: CouponModel;
    startDate: Date;
    endDate: Date;
}

function CouponCustomerCard(props: couponCardProps): JSX.Element {
    const  [coupon, setCoupon] = useState<CouponModel>();

    const purchaseCoupon = (coupon: CouponModel) => {
        webApi.purchaseCoupon(coupon.id).then((res) => {
            notify.success("Purchased coupon successfully")
            setCoupon(res.data);
            store.dispatch(purchaseCouponAction(coupon));
        })
        .catch((err) => notify.error(err));
    }

    function isPurchasedBefore():boolean {
        const coupons = store.getState().customerReducer.coupons;
        return coupons.some((coupon) => coupon.id === props.coupon.id);
    }

    return (
        <div className="CouponCustomerCard box2">
            <img src={props.coupon.image} alt="image" />
            <p>title: {props.coupon.title}</p>
            <p>description: {props.coupon.description}</p>
            <p>category: {props.coupon.category}</p>
            <p>start date: { moment(props.startDate).format('DD/MM/YYYY')}</p>
            <p>end date: { moment(props.endDate).format('DD/MM/YYYY')}</p>
            <p>amount: {coupon ? coupon.amount : props.coupon.amount}</p>
            <p>price: {props.coupon.price}</p>
            <div className="row">
                {
                isPurchasedBefore() ?
                <button disabled={true} onClick={() => purchaseCoupon(props.coupon)}><BsCartPlus /></button>
                :
                <button onClick={() => purchaseCoupon(props.coupon)}><BsCartPlus /></button>
                }
            </div>
        </div>
    );
}

export default CouponCustomerCard;
