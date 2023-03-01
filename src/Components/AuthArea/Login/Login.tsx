import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/Auth";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { loggedIn } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
function Login(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email pattern")
                .required("Email is required"),
        password:
            yup.string()
                .min(4, "password length minimum is 4 letters")
                .required("Password is required"),
        clientType:
            yup.string()
                .required("client Type is required")
    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { email: obj.email, password: obj.password, clientType: obj.clientType};
        await webApi.login(credentials)
        .then(res => {
            notify.success('login successfully');
            store.dispatch(loggedIn(res.data));
            navigate("/home");
        })
        .catch(err => notify.error(err));
    }
    return (
        <div className="Login col">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(postLogin)}>
                {(!errors.email) ? <label className="bold" htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} name="email" type="email" placeholder="email" />
                {(!errors.password) ? <label className="bold" htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} name="password" type="password" placeholder="password" />
                <p className="bold">Please chose your type</p>
                <div className="row">
                <input {...register("clientType")} type="radio" id="admin" name="clientType" value="ADMINISTRATOR"/>
                <label htmlFor="admin">Admin</label><br/>
                <input {...register("clientType")} type="radio" id="company" name="clientType" value="COMPANY"/>
                <label  htmlFor="company">Company</label><br/>
                <input {...register("clientType")} type="radio" id="customer" name="clientType" value="CUSTOMER"/>
                <label htmlFor="customer">Customer</label><br/>
                </div>
                <br/>
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
