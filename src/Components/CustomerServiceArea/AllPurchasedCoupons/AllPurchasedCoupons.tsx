import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CustomerService";
import { gotAllCouponsAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./AllPurchasedCoupons.css";

function AllPurchasedCoupons(): JSX.Element {

  const navigate = useNavigate();
  useEffect(() => {
    const token = store.getState().userReducer.user.token;
    const clientType = store.getState().userReducer.user.clientType;
    if (token === "" || token == undefined || token == null || clientType !== "CUSTOMER") {
      navigate("/login")
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPrice, setSelectedPrice] = useState<number>(1000);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [filterCoupons, setFilterCoupons] = useState<CouponModel[]>([]);

  const filteredNone = coupons;
  const filteredByPrice = coupons.filter(coupon => coupon.price <= selectedPrice);
  const filteredByCategory = coupons.filter(coupon => { return coupon.category === selectedCategory; });
  const filteredBoth = coupons
    .filter(coupon => coupon.price <= selectedPrice)
    .filter(coupon => coupon.category === selectedCategory);

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    let price = 1000;
    if (selected !== "ALL") {
      price = +selected;
    }
    setSelectedPrice(price);
  };

  useEffect(() => {
    webApi.getCustomerPurchaseCoupon()
      .then((res) => {
        setFilterCoupons(res.data)
        setCoupons(res.data)
        store.dispatch(gotAllCouponsAction(res.data));
        store.subscribe(() => {
          setCoupons(store.getState().customerReducer.coupons);
        })
      })
      .catch((err) => notify.error(err));
  }, []);

  useEffect(() => {

    if (selectedCategory === "ALL" && selectedPrice === 1000) {
      setFilterCoupons(filteredNone);
      return;
    }
    if (selectedCategory === "ALL" && selectedPrice < 1000) {
      setFilterCoupons(filteredByPrice);
      return;
    }
    if (selectedCategory !== "ALL" && selectedPrice === 1000) {
      setFilterCoupons(filteredByCategory);
      return;
    }
    if (selectedCategory !== "ALL" && selectedPrice < 1000) {
      setFilterCoupons(filteredBoth);
      return;
    }
  }, [selectedCategory, selectedPrice]);

  return (
    <div className="AllPurchasedCoupons">
      <h3>All purchased coupons</h3>
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
        {filterCoupons.length > 0 ? (
          <>
            {filterCoupons.map((coupon) => (
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

export default AllPurchasedCoupons;
