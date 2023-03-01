import { CompanyModel } from "../Models/AdminService";
import { CouponModel } from "../Models/CustomerService";

export class CompanyAppState {
    // Step 1 - create the app state object
    public companies: CompanyModel[] = [];
    public coupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
    GOT_COMPANY_DETAILS = "GOT_COMPANY_DETAILS",
    GOT_ALL_COMPANY_COUPONS = "GOT_ALL_COMPANY_COUPONS",
    GOT_COMPANY_COUPONS_BY_CATEGORY = "GOT_COMPANY_COUPONS_BY_CATEGORY",
    GOT_COMPANY_COUPONS_BY_PRICE = "GOT_COMPANY_COUPONS_BY_PRICE",
    ADDED_COUPON = "ADDED_COUPON",
    UPDATED_COUPON = "UPDATED_COUPON",
    DELETED_COUPON = "DELETED_COUPON"
}

// Step 3 - define what is action in terms of data
export interface CompanyAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCouponsAction(coupons: CouponModel[]): CompanyAction {
    return {
        type: ActionType.GOT_ALL_COMPANY_COUPONS,
        payload: coupons
    };
}

export function gotCompanyCouponsByCategoryAction(coupons: CouponModel[]): CompanyAction {
    return {
        type: ActionType.GOT_COMPANY_COUPONS_BY_CATEGORY,
        payload: coupons
    };
}

export function gotCompanyCouponsByPriceAction(coupons: CouponModel[]): CompanyAction {
    return {
        type: ActionType.GOT_COMPANY_COUPONS_BY_PRICE,
        payload: coupons
    };
}

export function gotCompanyDetailsAction(company: CompanyModel): CompanyAction {
    return {
        type: ActionType.GOT_COMPANY_DETAILS,
        payload: company
    };
}

export function gotSingleCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.GOT_SINGLE_COUPON,
        payload: coupon
    };
}

export function addedCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.ADDED_COUPON,
        payload: coupon
    };
}

export function updatedCouponACtion(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.UPDATED_COUPON,
        payload: coupon
    };
}

export function deletedCouponAction(id: number): CompanyAction {
    return {
        type: ActionType.DELETED_COUPON,
        payload: id
    }
}


// Step 5 - Reducer function perform the required action
export function companyReducer(currentState: CompanyAppState = new CompanyAppState(),action:CompanyAction): CompanyAppState{

    const newState = {...currentState}
    switch(action.type){
        case ActionType.GOT_ALL_COMPANY_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_COMPANY_COUPONS_BY_CATEGORY: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_COMPANY_COUPONS_BY_PRICE: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_SINGLE_COUPON: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_COMPANY_DETAILS: {
            newState.companies = action.payload;
            break;
        }
        case ActionType.ADDED_COUPON:{
            newState.coupons.push(action.payload);
            break;
        }
        case ActionType.UPDATED_COUPON: {
            const idx = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        }
        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload);
            break;
        }
    }
    return newState;

}