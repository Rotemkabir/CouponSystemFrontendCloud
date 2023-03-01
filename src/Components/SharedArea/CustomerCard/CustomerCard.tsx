import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/AdminService";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./CustomerCard.css";

interface customerCardProps{
    customer:CustomerModel;
}

function CustomerCard(props:customerCardProps): JSX.Element {

    const navigate = useNavigate();

    const deleteCustomer = (id: number) => {
        navigate('/allCustomers/delete/' + id);
    }

    const updateCustomer = (id: number) => {
        navigate('/allCustomers/update/' + id);
    }

    return (
        <div className="CustomerCard box1">
			<p>id: {props.customer.id}</p>
			<p>first name: {props.customer.firstName}</p>
			<p>last name: {props.customer.lastName}</p>
			<p>email: {props.customer.email}</p>
            <div className="row">
                <button onClick={() => deleteCustomer(props.customer.id)}><FaTrash /></button>
                <button onClick={() => updateCustomer(props.customer.id)}><FaEdit /></button>
            </div>
        </div>
    );
}

export default CustomerCard;
