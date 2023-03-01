import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/AdminService";
import { CouponModel } from "../../../Models/CustomerService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "COMPANY") {
            navigate("/login")
        }
    }, []);

    const [company, setCompany] = useState<CompanyModel>();
    useEffect(() => {
        webApi.getCompanyDetails()
            .then((res) => { setCompany(res.data) })
            .catch((err) => notify.error(err));
    }, []);

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect(() => {
        webApi.getAllCouponsByCompanyId()
            .then((res) => { setCoupons(res.data) })
            .catch((err) => notify.error(err));
    }, []);

    return (
        <div className="CompanyDetails">
                <div className="boxUser row">
                <img src="https://i.imgur.com/rNIkITf.jpg" alt="image" />&nbsp;&nbsp;&nbsp;&nbsp;
                First name:&nbsp;<span className="bold2">{company && company.name}</span>&nbsp;&nbsp;
                Email:&nbsp;<span className="bold2">{company && company.email}</span>&nbsp;&nbsp;
                Password:&nbsp;<span className="bold2">{company && company.password}</span>
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

export default CompanyDetails;
