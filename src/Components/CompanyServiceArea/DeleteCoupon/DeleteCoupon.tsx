import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletedCouponAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "COMPANY") {
            navigate("/login")
        }
    }, []);

    const cancel = () => {
        navigate("/allCoupons");
    }

    const yes = async () => {
        await webApi.deleteCoupon(id)
            .then(res => {
                notify.success('deleted successfully');
                store.dispatch(deletedCouponAction(id));
                navigate("/allCoupons");
            })
            .catch(err => {
                notify.error(err);
            });
    }

    return (
        <div className="DeleteCoupon col">
			<h3>Attention</h3>
            <div className="wrapper col">
                <div className="row">
                    <p>Are you sure you want to delete coupon #{id} ?</p>
                </div>
                <div className="row gap">
                    <button className="cancel" onClick={cancel}>Cancel</button>
                    <button className="yes" onClick={yes}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCoupon;
