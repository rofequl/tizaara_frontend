import ApiService from "@/core/services/api.service";
// action types
export const QUOTATION_LIST = "quotation/list";

// mutation types
export const SET_QUOTATION_LIST = "setQuotationList";

const state = {
    quotation: {},
};

const getters = {
    quotationList(state) {
        return state.quotation;
    },
};

const mutations = {
    [SET_QUOTATION_LIST](state, quotation) {
        state.quotation = quotation;
    },
};

const actions = {
    [QUOTATION_LIST]({commit}) {
        ApiService.get("supplier-quotation")
            .then(({data}) => {
                commit(SET_QUOTATION_LIST, data);
            })
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};