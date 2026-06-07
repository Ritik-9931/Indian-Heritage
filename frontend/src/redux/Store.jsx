import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import templeReducer from "./slices/templeSlice";
import cityReducer from "./slices/citySlice";
import stateReducer from "./slices/stateSlice";
import circuitReducer from "./slices/circuitSlice";
import deityReducer from "./slices/deitySlice";
import festivalReducer from "./slices/festivalSlice";
import reviewReducer from "./slices/reviewSlice";
import ritualReducer from "./slices/ritualSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    temple: templeReducer,
    city: cityReducer,
    state: stateReducer,
    circuit: circuitReducer,
    deity: deityReducer,
    festival: festivalReducer,
    review: reviewReducer,
    ritual: ritualReducer,
    user: userReducer,
  },
});

export default store;
