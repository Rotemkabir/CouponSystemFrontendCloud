import axios, { AxiosResponse } from "axios";
import { CompanyModel, CustomerModel } from "../Models/AdminService";
import { Credentials, User } from "../Models/Auth";
import { CouponModel } from "../Models/CustomerService";
import tokenAxios from "./AxiosToken";

class WebApi {
    // Local
    // private loginApi = "http://localhost:8080/api";
    // private adminApi = "http://localhost:8080/api/admin";
    // private companyApi = "http://localhost:8080/api/companies";
    // private customerApi = "http://localhost:8080/api/customers";

    // Cloud
    private loginApi = "https://couponsystembackendcloud-production.up.railway.app/api";
    private adminApi = "https://couponsystembackendcloud-production.up.railway.app/api/admin";
    private companyApi = "https://couponsystembackendcloud-production.up.railway.app/api/companies";
    private customerApi = "https://couponsystembackendcloud-production.up.railway.app/api/customers";

    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        return axios.post<User>(this.loginApi + "/login", credentials);
    }

    public addCompany(company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.post<CompanyModel>(this.adminApi + "/companies", company);
    }

    public updateCompany(companyId: number, company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.put<CompanyModel>(this.adminApi + "/companies/"+companyId, company);
    }

    public deleteCompany(companyId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<CompanyModel>(this.adminApi + "/companies/"+companyId);
    }

    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        return tokenAxios.get<CompanyModel[]>(this.adminApi + "/companies");
    }

    public getSingleCompany(companyId: number): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get<CompanyModel>(this.adminApi + "/companies/"+companyId);
    }

    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.post<CustomerModel>(this.adminApi + "/customers", customer);
    }

    public updateCustomer(customerId: number, customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.put<CustomerModel>(this.adminApi + "/customers/"+customerId, customer);
    }

    public deleteCustomer(customerId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<CustomerModel>(this.adminApi + "/customers/"+customerId);
    }

    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        return tokenAxios.get<CustomerModel[]>(this.adminApi + "/customers");
    }

    public getSingleCustomer(customerId: number): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get<CustomerModel>(this.adminApi + "/customers/"+customerId);
    }

    public addCoupon(coupon:CouponModel): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.post<CouponModel>(this.companyApi + "/coupons", coupon);
    }

    public updateCoupon(couponId: number, coupon:CouponModel): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.put<CouponModel>(this.companyApi + "/coupons/"+couponId, coupon);
    }

    public deleteCoupon(couponId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<CouponModel>(this.companyApi +"/"+couponId);
    }

    public getSingleCouponCompany(couponId: number): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.get<CouponModel>(this.companyApi + "/coupons/" + couponId);
    }

    public getAllCouponsByCompanyId(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyApi + "/coupons");
    }

    public getCompanyCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyApi + "/coupons/by/" + category);
    }

    public getCompanyCouponsByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyApi + "/coupons/" + price + "/under");
    }

    public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get<CompanyModel>(this.companyApi + "/details");
    }

    public purchaseCoupon(couponId: number): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.post<CouponModel>(this.customerApi + "/coupons/" + couponId);
    }

    public getCustomerPurchaseCoupon(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons");
    }

    public getSingleCouponCustomer(couponId: number): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.get<CouponModel>(this.customerApi + "/coupons/" + couponId);
    }

    public getCustomerCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/by/" + category);
    }

    public getCustomerCouponsByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/" + price + "/under");
    }

    public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get<CustomerModel>(this.customerApi + "/details");
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/all/coupons");
    }
}

const webApi = new WebApi();

export default webApi;