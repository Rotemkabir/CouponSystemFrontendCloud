import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/AdminService";
import * as yup from "yup";
import store from "../../../Redux/Store";
import "./UpdateCustomer.css";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

function UpdateCustomer(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0)
    const toUpdate = store.getState().adminReducer.customers.filter(customer => customer.id === id)[0]

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "ADMINISTRATOR") {
            navigate("/login")
        }
    }, []);

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string()
                .required("last name is required"),
        email:
            yup.string()
                .required("email is required")
                .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                "please enter valid email"),
        password:
            yup.string()
                .min(4)
                .required("password is missing")
    });


    const putCustomer = async (customer: CustomerModel) => {
        await webApi.updateCustomer(id, customer)
            .then(res => {
                notify.success('customer updated successfully');
                navigate('/allCustomers');
            })
            .catch(err => {
                notify.error(err);
            })
        console.log(customer);
    }
    
    let defaultValuesObj = { ...toUpdate };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({control});
    
    return (
        <div className="UpdateCustomer col">
			<h3>Update Customer</h3>
            <form onSubmit={handleSubmit(putCustomer)}>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />
                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="FirstName..." />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="LastName..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid || !isDirty}>Update Customer</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
