import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CouponModel } from "../../../Models/CustomerService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./UpdateCoupon.css";
import { updatedCouponACtion } from "../../../Redux/CompanyAppState";

function UpdateCoupon(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0)
    const toUpdate = store.getState().companyReducer.coupons.filter(coupon => coupon.id === id)[0]
    const [obj, setObj] = useState<CouponModel>(toUpdate);

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "COMPANY") {
            navigate("/login")
        }
    }, []);

    const schema = yup.object().shape({
        category:
            yup.string()
                .required("category is required"),
        title:
            yup.string()
                .required("title is required"),
        description:
            yup.string().required("description is missing"),
        startDate:
            yup.date()
                .typeError("You must specify a date")
                .required("Date is required"),
        endDate:
            yup.date()
                .min(new Date(), 'there is not option for previous time')
                .default(new Date())
                .typeError("You must specify a date")
                .required("Date is required")
                .min(yup.ref("startDate"))
                .nullable().default(() => new Date()),
        amount:
            yup.number()
                .min(1)
                .required("amount is required"),
        price:
            yup.number()
                .min(0)
                .required("price is required"),
        image:
            yup.string()
                .required("image is required")
    });

    const putCoupon = async (coupon: CouponModel) => {
        await webApi.updateCoupon(id, coupon)
            .then(res => {
                notify.success('coupon updated successfully');
                store.dispatch(updatedCouponACtion(coupon));
                navigate('/allCoupons');
            })
            .catch(err => {
                notify.error(err);
            })
    }

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });

    const uuid = Math.floor(Math.random() * 1_000_000_000);

    return (
        <div className="UpdateCoupon col">
            <h3>Update Coupon</h3>
            <form onSubmit={handleSubmit(putCoupon)}>
                <input {...register("id")} disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />
                {(errors.category) ? <span>{errors.category?.message}</span> : <label htmlFor="category">Category</label>}
                <select {...register("category")} id="category" name="category" className="row">
                    <option disabled value={""}>Category</option>
                    <option value={"FOOD"}>Food</option>
                    <option value={"ELECTRICITY"}>Electricity</option>
                    <option value={"RESTAURANT"}>Restaurant</option>
                    <option value={"VACATION"}>Vacation</option>
                </select>
                {(errors.title) ? <span>{errors.title?.message}</span> : <label htmlFor="title">Title</label>}
                <input {...register("title")} id="title" name="title" type="text" placeholder="Title..." />
                {(errors.description) ? <span>{errors.description?.message}</span> : <label htmlFor="description">Description</label>}
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description..." />
                {(errors.startDate) ? <span>{errors.startDate?.message}</span> : <label htmlFor="startDate">Start date</label>}
                <input {...register("startDate")} id="startDate" name="startDate" type="date" placeholder="StartDate..." />
                {(errors.endDate) ? <span>{errors.endDate?.message}</span> : <label htmlFor="endDate">End date</label>}
                <input {...register("endDate")} id="endDate" name="endDate" type="date" placeholder="EndDate..." />
                {(errors.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">Amount</label>}
                <input {...register("amount")} id="amount" name="amount" type="text" placeholder="Amount..." />
                {(errors.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">Price</label>}
                <input {...register("price")} id="price" name="price" type="text" placeholder="Price..." />
                {(errors.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">Image</label>}
                <input {...register("image")} id="image" name="image" type="text" placeholder="Image..." defaultValue={"https://picsum.photos/200/150?" + uuid} />
                <button disabled={!isValid || !isDirty}>Update Coupon</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
