import { User } from '../Models/Auth';

export class UserAppState {
    // Step 1 - Define User global App State
    public user: User = { email: "", token: "", id:0, clientType: "" };
    public constructor() {
        try {
            const myUser = JSON.parse(localStorage.getItem("user") || "")
            if (myUser) {
                this.user = myUser;
            }
        } catch(error) {
            console.log(error)
        }
    }
}

// Step 2 - Define all actions
export enum ActionType {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT"
}

// Step 3 - define what is action in terms of data
export interface UserAction {
    type: ActionType;
    payload: any;
}

// Step 4- create creator function
export function loggedIn(user: User): UserAction {
    return {
        type: ActionType.LOGGED_IN,
        payload: user
    }
}

export function loggedOut(): UserAction {
    return {
        type: ActionType.LOGGED_OUT,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function userReducer(currentState: UserAppState = new UserAppState(), action: UserAction): UserAppState {
    const newState = { ...currentState }
    switch (action.type) {
        case ActionType.LOGGED_IN: {
            console.log(newState.user);
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        }
        case ActionType.LOGGED_OUT: {
            console.log(newState.user);
            newState.user = { email: "", token: "", id:0, clientType: "" };
            localStorage.removeItem("user");
            break;
        }
    }
    return newState;
}
