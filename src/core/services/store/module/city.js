import ApiService from "@/core/services/api.service";

// action types
export const CITY_LIST = "city/list";

// mutation types
export const SET_CITY_LIST = "setCityList";

const state = {
    city: [],
};

const getters = {
    cityList(state) {
        return state.city;
    },

    getCityById: state => id => state.city.filter(value => value.division_id === id),

    getCityNameById: state => id => state.city.find(value => value.id === id),
};

const mutations = {
    [SET_CITY_LIST](state, city) {
        state.city = city;
    }
};

const actions = {
    [CITY_LIST]({commit}) {
        ApiService.get("city")
            .then(({data}) => {
                commit(SET_CITY_LIST, data);
            })
    }
};


export default {
    state,
    actions,
    mutations,
    getters
};