import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CompanyModel } from "../../../Models/AdminService";
import store from "../../../Redux/Store";
import "./AddCompany.css";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { addedCompanyAction } from "../../../Redux/AdminAppState";

function AddCompany(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "ADMINISTRATOR") {
            navigate("/login")
        }
    }, []);
    
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        name:
            yup.string()
                .required("name is required"),
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

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });

    const postCompany = async (company: CompanyModel) => {
        await webApi.addCompany(company)
            .then(res => {
                notify.success('company added successfully');
                store.dispatch(addedCompanyAction(res.data));
                navigate('/allCompanies');
            })
            .catch(err => {
                notify.error(err);
            })
    }

    return (
        <div className="AddCompany col">
			<h3>Add Company</h3>
            <form onSubmit={handleSubmit(postCompany)}>
                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid}>Add Company</button>
            </form>
        </div>
    );
}

export default AddCompany;
