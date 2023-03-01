import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/AdminService";
import { gotAllCompaniesAction } from "../../../Redux/AdminAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import CompanyCard from "../../SharedArea/CompanyCard/CompanyCard";
import "./AllCompanies.css";

function AllCompanies(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "ADMINISTRATOR") {
        navigate("/login")
        }
    },[]);

    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    useEffect(() => {
        webApi.getAllCompanies()
            .then((res) => {
                setCompanies(res.data)
                store.dispatch(gotAllCompaniesAction(res.data));
            })
            .catch(err => notify.error(err))
    },[]);

    return (
        <div className="AllCompanies">
            <h3>All companies</h3>
            <div>
                <button className="addButton" onClick={() => navigate("add")}>Add new Company</button>
            </div>
            <div className="row">
                {companies.map(company =>
                    <CompanyCard key={company.id} company={company} />
                )}
            </div>
        </div>
    );
}

export default AllCompanies;
