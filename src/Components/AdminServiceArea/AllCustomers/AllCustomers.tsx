import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/AdminService";
import { gotAllCustomersAction } from "../../../Redux/AdminAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CustomerCard from "../../SharedArea/CustomerCard/CustomerCard";
import "./AllCustomers.css";

function AllCustomers(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "ADMINISTRATOR") {
            navigate("/login")
        }
    }, []);

    const [customers, setCustomers]=useState<CustomerModel[]>([]);

    useEffect(()=>{
        webApi.getAllCustomers()
        .then(res=>{
            setCustomers(res.data);
            store.dispatch(gotAllCustomersAction(res.data));
        })
        .catch(err=>notify.error(err))
    },[]);

    return (
        <div className="AllCustomers">
			<h3>All customers</h3>
            <div>
            <button className="addButton" onClick={() => navigate("add")}>Add new Customer</button>
            </div>
            <div className="row">
            {customers.map(customer=>
                <CustomerCard key={customer.id}customer={customer}/>
            )}
            </div>
        </div>
    );
}

export default AllCustomers;
