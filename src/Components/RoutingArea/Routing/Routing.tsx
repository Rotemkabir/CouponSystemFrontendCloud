import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../PagesArea/About/About";
import Developer from "../../PagesArea/Developer/Developer";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../../PagesArea/Page404/Page404";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AddCoupon from "../../CompanyServiceArea/AddCoupon/AddCoupon";
import AddCompany from "../../AdminServiceArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminServiceArea/AddCustomer/AddCustomer";
import AllCompanies from "../../AdminServiceArea/AllCompanies/AllCompanies";
import AllCustomers from "../../AdminServiceArea/AllCustomers/AllCustomers";
import UpdateCompany from "../../AdminServiceArea/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../AdminServiceArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminServiceArea/DeleteCustomer/DeleteCustomer";
import UpdateCustomer from "../../AdminServiceArea/UpdateCustomer/UpdateCustomer";
import AllPurchasedCoupons from "../../CustomerServiceArea/AllPurchasedCoupons/AllPurchasedCoupons";
import PurchaseNewCoupon from "../../CustomerServiceArea/PurchaseNewCoupon/PurchaseNewCoupon";
import AllCoupons from "../../CompanyServiceArea/AllCoupons/AllCoupons";
import DeleteCoupon from "../../CompanyServiceArea/DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../../CompanyServiceArea/UpdateCoupon/UpdateCoupon";
import CustomerDetails from "../../CustomerServiceArea/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../CompanyServiceArea/CompanyDetails/CompanyDetails";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
			<Routes>
            <Route path="/" element={<App />} />
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/allCompanies" element={<AllCompanies />} />
            <Route path="/allCustomers" element={<AllCustomers />} />
            <Route path="/allCoupons" element={<AllCoupons/>} />
            <Route path="/allCompanies/add" element={<AddCompany />} />
            <Route path="/allCustomers/add" element={<AddCustomer />} />
            <Route path="/allCoupons/add" element={<AddCoupon />} />
            <Route path="/allCompanies/delete/:id/" element={<DeleteCompany />} />
            <Route path="/allCustomers/delete/:id/" element={<DeleteCustomer />} />
            <Route path="/allCoupons/delete/:id/" element={<DeleteCoupon />} />
            <Route path="/allCompanies/update/:id" element={<UpdateCompany />} />
            <Route path="/allCustomers/update/:id" element={<UpdateCustomer />} />
            <Route path="/allCoupons/update/:id" element={<UpdateCoupon />} />
            <Route path="/companyDetails" element={<CompanyDetails />} />
            <Route path="/allPurchasedCoupons" element={<AllPurchasedCoupons />} />
            <Route path="/purchaseNewCoupon" element={<PurchaseNewCoupon />} />
            <Route path="/customerDetails" element={<CustomerDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
