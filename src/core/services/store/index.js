import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module';
import general from './general.module';
import category from './module/category';
import subcategory from './module/subcategory';
import subsubcategory from './module/subsubcategory';
import brand from './module/brand';
import unit from './module/unit';
import property from './module/property';
import color from './module/color';
import attribute from './module/attribute';
import currency from './module/currency';
import country from './module/country';
import division from './module/division';
import city from './module/city';
import area from './module/area';
import personal from './module/personal';
import companybasic from './module/companybasic';
import homeslider from "@/core/services/store/module/homeslider";
import businesstype from "@/core/services/store/module/businesstype";


Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        auth,
        general,
        category,
        subcategory,
        subsubcategory,
        brand,
        unit,
        property,
        color,
        attribute,
        currency,
        country,
        division,
        city,
        area,
        personal,
        companybasic,
        homeslider,
        businesstype,
    }
})
