import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CustomerService";
import { FaTrash, FaEdit } from "react-icons/fa";
import moment from 'moment';
import "./CouponCard.css";

interface couponCardProps {
    coupon: CouponModel;
    showButtons: boolean;
    startDate:Date;
    endDate:Date;
}

function CouponCard(props: couponCardProps): JSX.Element {

    const navigate = useNavigate();

    const deleteCoupon = (id: number) => {
        navigate('/allCoupons/delete/' + id);
    }

    const updateCoupon = (id: number) => {
        navigate('/allCoupons/update/' + id);
    }

    return (
        <div className="CouponCard box2">
            <img src={props.coupon.image} alt="image" />
            <p>title: {props.coupon.title}</p>
            <p>description: {props.coupon.description}</p>
            <p>category: {props.coupon.category}</p>
            <p>start date: { moment(props.startDate).format('DD/MM/YYYY')}</p>
            <p>end date: { moment(props.endDate).format('DD/MM/YYYY')}</p>
            <p>amount: {props.coupon.amount}</p>
            <p>price: {props.coupon.price}</p>
            {
                props.showButtons ?
                    <>
                        <div className="row">
                            <button onClick={() => deleteCoupon(props.coupon.id)}><FaTrash /></button>
                            <button onClick={() => updateCoupon(props.coupon.id)}><FaEdit /></button>
                        </div>
                    </>
                    :
                    <></>
            }
        </div>
    );
}

export default CouponCard;
