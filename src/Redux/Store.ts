import { combineReducers,createStore } from "redux";
import { adminReducer } from "./AdminAppState";
import { companyReducer } from "./CompanyAppState";
import { customerReducer } from "./CustomerAppState";
import { userReducer } from "./UserAppState";


const reducers = combineReducers({userReducer:userReducer,adminReducer: adminReducer,companyReducer:companyReducer,customerReducer:customerReducer});
const store = createStore(reducers);


export default store;