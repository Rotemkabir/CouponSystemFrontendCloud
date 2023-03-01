import { CustomerModel } from "../Models/AdminService";
import { CouponModel } from "../Models/CustomerService";

export class CustomerAppState {
    // Step 1 - create the app state object
    public customers: CustomerModel[] = [];
    public coupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
    GOT_CUSTOMER_DETAILS = "GOT_CUSTOMER_DETAILS",
    GOT_ALL_CUSTOMER_COUPONS = "GOT_ALL_CUSTOMER_COUPONS",
    GOT_CUSTOMER_COUPONS_BY_CATEGORY = "GOT_CUSTOMER_COUPONS_BY_CATEGORY",
    GOT_CUSTOMER_COUPONS_BY_PRICE = "GOT_CUSTOMER_COUPONS_BY_PRICE",
    PURCHASE_COUPON = "PURCHASE_COUPON"
}

// Step 3 - define what is action in terms of data
export interface CustomerAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCouponsAction(coupons: CouponModel[]): CustomerAction {
    return {
        type: ActionType.GOT_ALL_CUSTOMER_COUPONS,
        payload: coupons
    };
}

export function gotCustomerCouponsByCategoryAction(coupons: CouponModel[]): CustomerAction {
    return {
        type: ActionType.GOT_CUSTOMER_COUPONS_BY_CATEGORY,
        payload: coupons
    };
}

export function gotCustomerCouponsByPriceAction(coupons: CouponModel[]): CustomerAction {
    return {
        type: ActionType.GOT_CUSTOMER_COUPONS_BY_PRICE,
        payload: coupons
    };
}

export function gotCustomerDetailsAction(customer: CustomerModel): CustomerAction {
    return {
        type: ActionType.GOT_CUSTOMER_DETAILS,
        payload: customer
    };
}

export function gotSingleCouponAction(coupon: CouponModel): CustomerAction {
    return {
        type: ActionType.GOT_SINGLE_COUPON,
        payload: coupon
    };
}

export function purchaseCouponAction(coupon: CouponModel): CustomerAction {
    return {
        type: ActionType.PURCHASE_COUPON,
        payload: coupon
    };
}


// Step 5 - Reducer function perform the required action
export function customerReducer(currentState: CustomerAppState = new CustomerAppState(),action:CustomerAction): CustomerAppState{

    const newState = {...currentState}
    switch(action.type){
        case ActionType.GOT_ALL_CUSTOMER_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_CUSTOMER_COUPONS_BY_CATEGORY: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_CUSTOMER_COUPONS_BY_PRICE: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_SINGLE_COUPON: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.GOT_CUSTOMER_DETAILS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.PURCHASE_COUPON:{
            newState.coupons.push(action.payload);
            break;
        }
    }
    return newState;

}