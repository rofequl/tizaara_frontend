<template>
  <div>
    <div class="weekly-market-wrapper" v-for="(category, k) in homeCategoryProduct" :key="k">
      <div class="container-fluid grid-bg-pad">
        <div class="row">
          <h2 class="page-title"><a href="">{{ category.name }}</a></h2>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <div class="custom-feature-grid item-1"
                 v-bind:style="{ backgroundImage: 'url(' + showImage(category.banner) + ')' }" style="height: 370px">
              <h4>{{ category.title }}</h4>
              <router-link :to="'category/'+category.slug" class="btn-more btn-more-bottom border">View More
              </router-link>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="row" v-if="getSubcategoryById(category.id).length > 0">
              <div class="col-sm-4 mb-3" v-for="subcategories in getSubcategoryById(category.id)" :key="subcategories.id">
                <b-card>
                  <b-media>
                    <template #aside>
                      <b-img v-lazy="showImage(subcategories.banner)" width="64" alt="placeholder"></b-img>
                    </template>

                    <h6 class="mt-0"><router-link :to="'category/'+category.slug+'/'+subcategories.slug">{{ subcategories.name }}</router-link></h6>
                    <router-link :to="'category/'+category.slug+'/'+subcategories.slug+'/'+subsubcategories.slug" v-for="subsubcategories in getSubsubcategoryById(subcategories.id).slice(0,5)"
                    :key="subsubcategories.id">
                    {{ subsubcategories.name }}<br></router-link>
                  </b-media>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {api_base_url} from "@/core/config/app";

export default {
  name: "Cat_product",
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    jsonDecode(e) {
      return JSON.parse(e);
    },
  },
  computed: {
    ...mapGetters(["homeCategoryProduct", "getSubcategoryById", "getSubsubcategoryById"])
  },
}
</script>

<style scoped>

</style>