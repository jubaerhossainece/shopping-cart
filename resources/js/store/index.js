import { createStore } from "vuex";

import state from "./state.js";
import * as mutations from "./mutations.js";
import * as getters from "./getters.js";
import * as actions from "./actions.js";


const store = createStore({
    state,
    mutations,
    actions
});

export default store;