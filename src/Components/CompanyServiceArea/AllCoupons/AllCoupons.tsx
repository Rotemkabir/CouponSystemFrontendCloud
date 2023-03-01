import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CustomerService";
import { gotAllCouponsAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./AllCoupons.css";

function AllCoupons(): JSX.Element {

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPrice, setSelectedPrice] = useState<string>("ALL");
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);

  useEffect(() => {
    const token = store.getState().userReducer.user.token;
    const clientType = store.getState().userReducer.user.clientType;
    if (token === "" || token == undefined || token == null || clientType !== "COMPANY") {
      navigate("/login")
    }
  }, []);

  useEffect(() => {
    webApi
      .getAllCouponsByCompanyId()
      .then((res) => {
        setCoupons(res.data);
        store.dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => notify.error(err));
  }, []);

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    let filteredCoupons = store.getState().companyReducer.coupons;
    if (selectedPrice !== "ALL") {
      filteredCoupons = filteredCoupons.filter((coupon) => {
        return coupon.price <= Number(selectedPrice);
      })
    }
    if (selected !== "ALL") {
      filteredCoupons = filteredCoupons.filter((coupon) => {
        return coupon.category === selected;
      })
    }
    setCoupons(filteredCoupons);
    setSelectedCategory(selected);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priced = e.target.value;
    let filteredCoupons = store.getState().companyReducer.coupons;
    if (selectedCategory !== "ALL") {
      filteredCoupons = filteredCoupons.filter((coupon) => {
        return coupon.category === selectedCategory;
      })
    }
    if (priced !== "ALL") {
      filteredCoupons = filteredCoupons.filter((coupon) => {
        return coupon.price <= Number(priced);
      })
    }
    setCoupons(filteredCoupons);
    setSelectedPrice(priced);
  };

  return (
    <div className="AllCoupons">
      <h3>All coupons</h3>
      <div>
        <button className="addButton" onClick={() => navigate("add")}>
          Add new coupon
        </button>
      </div><br />
      <div>
        <select className="row" onChange={onChangeCategory} value={selectedCategory}>
          <option disabled value={""}>Filter by category...</option>
          <option value={"ALL"}>All</option>
          <option value={"FOOD"}>Food</option>
          <option value={"ELECTRICITY"}>Electricity</option>
          <option value={"RESTAURANT"}>Restaurant</option>
          <option value={"VACATION"}>Vacation</option>
        </select>
      </div>
      <div>
        <select className="row" onChange={onChangePrice} value={selectedPrice}>
          <option disabled value={""}>Filter by max price...</option>
          <option value={"ALL"}>All</option>
          <option value={"100"}>100</option>
          <option value={"200"}>200</option>
          <option value={"300"}>300</option>
          <option value={"400"}>400</option>
          <option value={"500"}>500</option>
          <option value={"600"}>600</option>
          <option value={"700"}>700</option>
          <option value={"800"}>800</option>
        </select>
      </div>
      <div className="row">
        {coupons.length > 0 ? (
          <>
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} showButtons={true} startDate={coupon.startDate} endDate={coupon.endDate} />
            ))}
          </>
        ) : (
          <p>NO COUPON YET..</p>
        )}
      </div>
    </div>
  );
}

export default AllCoupons;
