<template>
  <div class="input-group cus-input-group">
    <div class="input-group-prepend">
      <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">{{ type }}
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" @click.prevent="type = 'Products'">Products</a>
        <a class="dropdown-item" href="#" @click.prevent="type = 'Suppliers'">Suppliers</a>
      </div>
    </div>
    <vue-suggestion :items="products"
                    v-model="selectKeyword"
                    :setLabel="setLabel"
                    :itemTemplate="itemTemplate"
                    @changed="(text)=>{ this.keyword = text; this.products = []}"
                    @enter="itemEnter" @selected="itemSelected">
    </vue-suggestion>
    <button @click.prevent="itemSelected" type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
  </div>
</template>

<script>
import itemTemplate from "@/components/layout/inc/itemTemplate";
import {debounce} from "lodash";
import {mapGetters} from "vuex";
import {SEARCH_PRODUCT} from "@/core/services/store/module/search";

export default {
  name: "Search",
  data() {
    return {
      type: 'Products',
      selectKeyword: '',
      keyword: '',
      products: [],
      itemTemplate,
    }
  },
  methods: {
    itemSelected(item = false) {
      console.log(item)
      if (this.keyword === '') return;
      this.$router.push({name: "category", query: {pro: item.name, type: this.type}})
    },
    itemEnter() {
      console.log(this.keyword)
      if (this.keyword === '') return;
      this.$router.push({name: "category", query: {pro: this.keyword, type: this.type}})
    },
    setLabel(item) {
      return item.name;
    },
    search() {
      let data = this.getProductName(this.keyword);
      if (data.length > 5) {
        this.products = data.slice(0, 6);
      } else {
        this.products = data;
        this.$store.dispatch(SEARCH_PRODUCT, this.keyword);
      }
    },
    searchAgain() {
      this.products = this.getProductName(this.keyword).slice(0, 6);
    },
    loadQuery(){
      this.selectKeyword['name'] = this.$route.query.pro;
    }
  },
  created() {
    this.debounceName = debounce(this.search, 500)
  },
  watch: {
    keyword() {
      if (!this.keyword || this.keyword.length < 2) return;
      this.debounceName();
    },
    searchProductLoad() {
      this.searchProductLoad ? this.searchAgain() : '';
    },
    '$route.query.pro'() {
      this.loadQuery();
    }
  },
  computed: {
    ...mapGetters(["getProductName", "searchProductLoad"]),
  }
}
</script>

<style lang="scss">
.vue-suggestion {
  width: 70%;

  .vs__selected {
    border: 0;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  .vs__input {
    width: 100%;
    height: calc(1.5em + .75rem + 5px) !important;
  }

  .vs__list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #023d7b;
    position: relative;

    .vs__list-item {
      background-color: #fff;
      padding: 10px;
      border-left: 1px solid #023d7b;
      border-right: 1px solid #023d7b;
    }

    .vs__list-item:last-child {
      border-bottom: none;
    }

    .vs__list-item:hover {
      background-color: #eee !important;
    }

    .vs__list-item {
      cursor: pointer;
    }
  }

  .vs__list,
  .vs__loading {
    position: absolute;
  }
}
</style>