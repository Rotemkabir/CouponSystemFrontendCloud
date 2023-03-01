import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/AdminService";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./CompanyCard.css";

interface companyCardProps{
    company:CompanyModel;
}

function CompanyCard(props:companyCardProps): JSX.Element {

    const navigate = useNavigate();

    const deleteCompany = (id: number) => {
        navigate('/allCompanies/delete/' + id);
    }

    const updateCompany = (id: number) => {
        navigate('/allCompanies/update/' + id);
    }
    
    return (
        <div className="CompanyCard box1">
			<p>id: {props.company.id}</p>
			<p>name: {props.company.name}</p>
			<p>email: {props.company.email}</p>
            <div className="row">
                <button onClick={() => deleteCompany(props.company.id)}><FaTrash /></button>
                <button onClick={() => updateCompany(props.company.id)}><FaEdit /></button>
            </div>
        </div>
    );
}

export default CompanyCard;
