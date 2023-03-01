import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletedCustomerAction } from "../../../Redux/AdminAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const clientType = store.getState().userReducer.user.clientType;
        if (token === "" || token == undefined || token == null || clientType !== "ADMINISTRATOR") {
            navigate("/login")
        }
    }, []);

    const cancel = () => {
        navigate("/allCustomers");
    }

    const yes = async () => {
        await webApi.deleteCustomer(id)
            .then(res => {
                notify.success('deleted successfully');
                store.dispatch(deletedCustomerAction(id));
                navigate("/allCustomers");
            })
            .catch(err => {
                notify.error(err);
            });
    }

    return (
        <div className="DeleteCustomer col">
			<h3>Attention</h3>
            <div className="wrapper col">
                <div className="row">
                    <p>Are you sure you want to delete customer #{id} ?</p>
                </div>
                <div className="row gap">
                    <button className="cancel" onClick={cancel}>Cancel</button>
                    <button className="yes" onClick={yes}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;
