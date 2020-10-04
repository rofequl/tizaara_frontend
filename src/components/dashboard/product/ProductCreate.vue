<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-11 m-4">
      <b-card>
        <b-card-body>
          <form-wizard @on-complete="formSubmit" title="Add New Products" subtitle="Insert product information"
                       color="#3c4b64">
            <!-- Part - 1 -->
            <tab-content title="Product Information" icon="ti-package" :before-change="validateFirstStep">

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="input-small">Product Name :</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input id="input-small" size="sm" placeholder="Enter product name"
                                v-model="$v.form.name.$model"
                                :state="validateState('name')" aria-describedby="input-1-live-feedback">
                  </b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.name.required" id="input-1-live-feedback">Product name
                    required.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.name.maxLength" id="input-1-live-feedback">Product name not
                    more than 200 character.
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="sort-desc">Product sort description : </label>
                </b-col>
                <b-col sm="9">
                  <b-form-textarea id="sort-desc" size="sm" placeholder="Product sort description"
                                   v-model="$v.form.sort_desc.$model" rows="3"
                                   :state="validateState('sort_desc')" aria-describedby="input-2-live-feedback">
                  </b-form-textarea>
                  <b-form-invalid-feedback v-if="!$v.form.sort_desc.required" id="input-2-live-feedback">
                    Product sort description not more than 500 character.
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="select-category"> Select Category : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="$v.form.category_id.$model" :options="category" label="name"
                            placeholder="Select product category" id="select-category"
                            :reduce="name => name.id" @input="loadSubcategory"
                            :state="validateState('category_id')">
                    <template #option="{ name, icon }">
                      <img :src="showImage(icon)" class="mx-2" width="18px" height="18px" alt="Category">
                      <em>{{ name }}</em>
                    </template>
                  </v-select>
                  <div class="category_error invalid_error"></div>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="select-subcategory"> Select Subcategory : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="$v.form.subcategory_id.$model" :options="subcategory" label="name"
                            placeholder="Select product sub-category" id="select-subcategory"
                            :reduce="name => name.id" @input="loadSubSubcategory"
                            :state="validateState('subcategory_id')"></v-select>
                  <div class="subcategory_error invalid_error"></div>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="select-subsubcategory"> Select Sub Subcategory : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="$v.form.subsubcategory_id.$model" :options="subsubcategory" label="name"
                            placeholder="Select product sub-subcategory" id="select-subsubcategory"
                            :reduce="name => name.id" @input="loadProperty"
                            :state="validateState('subsubcategory_id')"></v-select>
                  <div class="subsubcategory_error invalid_error"></div>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="brand"> Select Brand : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="form.brand_id" :options="brand" label="name"
                            placeholder="Select product brand" id="brand"
                            :reduce="name => name.id">
                    <template #option="{ name, logo }">
                      <img :src="showImage(logo)" class="mx-2" width="18px" height="18px" alt="Category">
                      <em>{{ name }}</em>
                    </template>
                  </v-select>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="unit"> Select Unit : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="form.unit" :options="unit" label="name"
                            placeholder="Select product unit"
                            :reduce="name => name.id"></v-select>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="3">
                  <label for="properties"> Select Properties : </label>
                </b-col>
                <b-col sm="9">
                  <v-select v-model="form.property" :options="property" label="name"
                            placeholder="Select Properties" @input="addNewProperty" id="properties"
                            :reduce="name => name.id" multiple></v-select>
                </b-col>
              </b-row>

              <b-row class="my-3" v-for="addproperties in form.property_options">
                <b-col sm="3">
                  <label for="properties-value"> {{ addproperties.name }} : </label>
                </b-col>
                <b-col sm="9">
                  <b-input v-model="addproperties.value"
                           :placeholder="'Enter '+addproperties.name+' information'" id="properties-value"></b-input>
                </b-col>
              </b-row>


            </tab-content>
            <!-- End Part - 1 -->
            <!-- Part - 2 -->
            <tab-content title="Product Images" icon="ti-image" :before-change="validateSecondStep">
              <b-alert
                  variant="danger"
                  dismissible
                  fade
                  :show="secondStepAlert"
                  @dismissed="secondStepAlert=false">
                Please insert multiple product and thumbnail image.
              </b-alert>

              <b-row class="my-3">
                <b-col md="6">
                  <div role="group" class="d-flex justify-content-center">
                    <div class=""><label>Select Product Images :</label>
                      <vue-upload-multiple-image
                          @before-remove="(index, done, fileList) =>{ done(); form.photos = fileList}"
                          @upload-success="(formData, index, fileList) =>{ form.photos = fileList}"
                          :data-images="images" popupText="Product image, you can add only 9 image"
                          idUpload="myIdUpload" editUpload="myIdEdit" idEdit="myIdEdited"
                          dragText="Drag images (many)." browseText="Select multiple image"
                          primaryText="Product Image" accept="image/jpeg,image/png,image/bmp,image/jpg"
                          :maxImage="9" markIsPrimaryText=""
                      ></vue-upload-multiple-image>
                    </div>
                  </div>
                </b-col>
                <b-col md="6">
                  <div role="group" class="d-flex justify-content-center">
                    <div class=""><label>Select Thumbnail Image :</label>
                      <vue-upload-multiple-image
                          @before-remove="(index, done, fileList) =>{ done(); form.thumbnail_img = fileList}"
                          @upload-success="(formData, index, fileList) =>{ form.thumbnail_img = fileList[0].path}"
                          :data-images="thumbnail" popupText="Product thumbnail image, you can edit and delete"
                          idUpload="myIdUpload1" editUpload="myIdEdit1" idEdit="myIdEdited1"
                          dragText="Drag images (290x300)." browseText="Select single image"
                          primaryText="Thumbnail" accept="image/jpeg,image/png,image/bmp,image/jpg"
                          markIsPrimaryText="" :multiple="false"
                      ></vue-upload-multiple-image>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="my-5">
                <b-col md="6">
                  <div role="group" class="d-flex justify-content-center">
                    <div class=""><label>Select Featured Images :</label>
                      <vue-upload-multiple-image
                          @before-remove="(index, done, fileList) =>{ done(); form.featured_img = fileList}"
                          @upload-success="(formData, index, fileList) =>{ form.featured_img = fileList[0].path}"
                          :data-images="featured" popupText="Product Featured image, you can edit and delete"
                          idUpload="myIdUpload2" editUpload="myIdEdit2" idEdit="myIdEdited2"
                          dragText="Drag images (290x300)." browseText="Select single image"
                          primaryText="Featured" accept="image/jpeg,image/png,image/bmp,image/jpg"
                          markIsPrimaryText="" :multiple="false"
                      ></vue-upload-multiple-image>
                    </div>
                  </div>
                </b-col>
                <b-col md="6">
                  <div role="group" class="d-flex justify-content-center">
                    <div class=""><label>Select Flash Deal Image :</label>
                      <vue-upload-multiple-image
                          @before-remove="(index, done, fileList) =>{ done(); form.flash_deal_img = fileList}"
                          @upload-success="(formData, index, fileList) =>{ form.flash_deal_img = fileList[0].path}"
                          :data-images="flash_deal" popupText="Product Flash Deal image, you can edit and delete"
                          idUpload="myIdUpload3" editUpload="myIdEdit3" idEdit="myIdEdited3"
                          dragText="Drag images (290x300)." browseText="Select single image"
                          primaryText="Flash Deal" accept="image/jpeg,image/png,image/bmp,image/jpg"
                          markIsPrimaryText="" :multiple="false"
                      ></vue-upload-multiple-image>
                    </div>
                  </div>
                </b-col>
              </b-row>

              <b-row class="my-4">
                <b-col md="6">
                  <label for="video-upload">Product Videos Url:</label>
                  <b-input-group>
                    <b-form-input
                        id="video-upload" type="url"
                        v-model="form.video_link" max="100"
                        placeholder="Youtube / Vimeo / DailyMotion"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" class="btn-sm" @click="productVideo">
                        <font-awesome-icon icon="search"/>
                        Search
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col md="6">
                  <video-embed ref="youtube" src=""></video-embed>
                </b-col>
              </b-row>

            </tab-content>
            <!-- End Part - 2 -->
            <!-- Part - 3 -->
            <tab-content title="Product Price" icon="ti-money" :before-change="validateThirdStep">
              Product Attribute
              <hr>
              <b-row>
                <b-col cols="6" sm="4" md="2" class="mb-3 mb-xl-0">
                  <b-button block color="dark" size="sm" disabled>
                    Colour
                  </b-button>
                </b-col>
                <b-col cols="6" size="sm" sm="4" md="6" class="mb-3 mb-xl-0">
                  <v-select v-model="form.color" :options="color" label="name" @input="addNewColor"
                            placeholder="Select product colour"
                            :reduce="name => name.name" multiple>
                    <template #option="{ name, code }">
                      <div class="d-inline-block">
                        <div class="float-left mr-2" v-bind:style="{ backgroundColor:  code }"
                             style="width: 18px; height: 18px;"></div>
                        <div>{{ name }}</div>
                      </div>
                    </template>
                  </v-select>
                </b-col>
                <b-col cols="6" sm="4" md="3" class="mb-3 mb-xl-0">
                  <b-form-checkbox
                      id="checkbox-1"
                      v-model="color_image"
                      name="checkbox-1"
                      value="yes"
                      unchecked-value="no">
                    Colour with image
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="0" sm="0" md="2">
                </b-col>
                <b-col cols="12" sm="12" md="6">
                  <b-row>
                    <b-col cols="6" sm="6" md="4" class="mb-3 mb-xl-0 mt-3" v-for="(image, index) in form.color_image"
                           :key="index">
                      <vue-upload-multiple-image class="colorImage"
                                                 @before-remove="(index, done, fileList) =>{ done(); image.image = fileList}"
                                                 @upload-success="(formData, index, fileList) =>{ image.image = fileList[0].path}"
                                                 v-bind:idUpload="'myIdUploads'+index"
                                                 v-bind:editUpload="'myIdEdits'+index"
                                                 v-bind:idEdit="'myIdEditeds'+index"
                                                 v-bind:dragText="image.name"
                                                 accept="image/jpeg,image/png,image/bmp,image/jpg"
                                                 browseText="" :multiple="false"
                                                 :showPrimary="false"
                                                 :data-images="image.imageAlfa"
                      ></vue-upload-multiple-image>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="6" sm="4" md="2" class="mb-3 mb-xl-0">
                  <b-button size="sm" block color="dark" disabled>
                    Attributes
                  </b-button>
                </b-col>
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <v-select v-model="form.attribute" :options="attribute" label="name" @input="addNewAttribute"
                            :reduce="name => name.id" placeholder="Select product Attribute" multiple>
                  </v-select>
                </b-col>
              </b-row>

              <p class="text-info">Note: Choose the attributes of this product and then input values of each
                attribute</p>
              <b-row class="mt-3" v-for="(addAttributes, index) in addAttribute" :key="index">
                <b-col cols="6" sm="4" md="2" class="mb-3 mb-xl-0">
                  <b-button block color="dark" disabled>{{ addAttributes.name }}</b-button>
                </b-col>
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <vue-tags-input
                      v-model="addAttributes.tag" class="w-100"
                      :tags="addAttributes.value"
                      :allow-edit-tags="true" :separators="[';', ',']"
                      @tags-changed="newTags => addAttributes.value = newTags"/>
                </b-col>
              </b-row>

              <br><br><br>Product Tax, Offer & Discount
              <hr>
              <b-row class="mb-3">
                <b-col cols="6" sm="4" md="3" class="mb-3 mb-xl-0">
                  <b-form-checkbox v-model="orderQtyLimit" name="check-button" switch>
                    Order Quantity Limit:
                  </b-form-checkbox>
                </b-col>
                <b-col v-if="orderQtyLimit" cols="6" sm="4" md="3">
                  <b-form-input v-model="form.orderQtyLimitValue" placeholder="Enter maximum Order Quantity" value="1"
                                type="number" min="1"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-2">
                <b-col cols="6" sm="4" md="7" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Select Currency :"
                      label-for="select-currency">
                    <b-form-select v-model="$v.form.currency_id.$model" :options="currency" size="sm"
                                   placeholder="Please select Currency" id="select-currency"
                                   :state="validateState('currency_id')"></b-form-select>
                    <b-form-invalid-feedback v-if="!$v.form.currency_id.required">
                      Currency required.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col cols="6" sm="4" md="7" class="mb-3 mb-xl-0">
                  <b-form-group
                      id="fieldset-horizontal"
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Tax :"
                      label-for="select-tax">
                    <b-form-input v-model="form.tax" size="sm" type="number" min="0"
                                  value="0" placeholder="Enter number" id="select-tax"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="4" md="3" class="mb-3 mb-xl-0">
                  <b-form-select v-model="form.tax_type" :options="['Flat','Percent']" size="sm"
                                 placeholder="Select tax type"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-2" v-if="!discountMethod">
                <b-col cols="6" sm="4" md="7" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Discount : "
                      label-for="select-tax">
                    <b-form-input v-model="form.discount" size="sm" type="number" min="0"
                                  value="0" placeholder="Enter number" id="select-tax"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="4" md="3" class="mb-3 mb-xl-0">
                  <b-form-select v-model="form.discount_type" :options="['Flat','Percent']" size="sm"
                                 placeholder="Select Discount type"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-4">
                <b-col cols="6" sm="4" md="12" class="mb-3 mb-xl-0">
                  <b-form-checkbox
                      id="checkbox-4"
                      v-model="tier_select"
                      value="discount">
                    Enable volume tier Discount
                  </b-form-checkbox>
                </b-col>
              </b-row>

              <b-row v-if="discountMethod" class="my-4">
                <b-col cols="12" sm="12" md="8" class="mb-3 mb-xl-0">
                  <p class="text-right text-info font-weight-bold my-0" style="font-size: 12px;cursor: pointer"
                     @click="addTierDiscount">
                    + ADD VOLUME TIER</p>
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Minimum Quantity</th>
                      <th></th>
                      <th>Additional % off</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(volume, k) in form.tierDiscount" :key="k">
                      <td>
                        <b-form-input v-model="volume.unit" size="sm" type="number" min="0"
                                      value="0" placeholder="Enter minimum unit"></b-form-input>
                      </td>
                      <td>
                        or more
                      </td>
                      <td>
                        <b-input-group size="sm" append="%">
                          <b-form-input v-model="volume.value" size="sm" type="number" min="0"
                                        value="0" placeholder="Discount rate"></b-form-input>
                        </b-input-group>
                      </td>
                      <td>
                        <b-button color="secondary" @click="removeTierDiscount(k, volume)">
                          <font-awesome-icon icon="trash-alt"/>
                        </b-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>
              <br><br><br>Product price and stock
              <hr>
              <b-alert
                  variant="danger"
                  dismissible
                  fade
                  :show="showDismissibleAlert"
                  @dismissed="showDismissibleAlert=false">
                First select some attribute!
              </b-alert>
              <b-row class="mt-4">
                <b-col cols="12">
                  <b-form-group>
                    <b-form-radio-group id="radio-group-2" v-model="priceType" name="radio-sub-component">
                      <b-form-radio value="0">Simple Product</b-form-radio>
                      <b-form-radio value="1">Variable Product</b-form-radio>
                      <b-form-radio value="2">volume tier Pricing</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-4">
                <b-col cols="6" sm="4" md="12" class="mb-3 mb-xl-0">
                  <b-form-checkbox
                      id="checkbox-7"
                      v-model="form.stockManagement"
                      value="1"
                      unchecked-value="0">
                    Stock management
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row v-if="(form.priceType == 0 || form.priceType == 2) && form.stockManagement == 1">
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Quantity : "
                      label-for="quantity">
                    <b-form-input v-model="form.quantity" size="sm" type="number" min="0"
                                  value="0" placeholder="Enter product quantity" id="quantity"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="form.priceType == 0">
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Price : "
                      label-for="price">
                    <b-form-input v-model="form.unit_price" size="sm" type="number" min="0"
                                  value="0" placeholder="Enter per unit price" id="price"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="form.priceType == 0">
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="SKU : "
                      label-for="sku">
                    <b-form-input v-model="form.sku" size="sm"
                                  placeholder="Enter product sku" id="sku" readonly disabled></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <table v-if="form.priceType == 1" class="table table-bordered">
                <thead>
                <tr>
                  <th>Variant</th>
                  <th>Variant Price</th>
                  <th v-if="form.stockManagement == 1">Quantity</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(volume, index) in form.priceMenu" :key="index">
                  <td>
                    <b-badge class="p-1 mx-1" v-for="variant in volume.variant" variant="secondary">{{ variant }}
                    </b-badge>
                  </td>
                  <td>
                    <b-form-input v-model="volume.variant_price" size="sm" type="number" min="0"
                                  value="0" placeholder="Enter maximum unit"></b-form-input>
                  </td>
                  <td v-if="form.stockManagement == 1">
                    <b-form-input v-model="volume.quantity" size="sm" type="number" min="0"
                                  value="0" placeholder="Per unit price off"></b-form-input>
                  </td>
                </tr>
                </tbody>
              </table>

              <b-row v-if="form.priceType == 2" class="my-4">
                <b-col cols="12" sm="12" md="8" class="mb-3 mb-xl-0">
                  <p class="text-right text-info font-weight-bold my-0" style="font-size: 12px;cursor: pointer"
                     @click="addTierPrice">
                    + ADD VOLUME TIER</p>
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Minimum Quantity</th>
                      <th>Maximum Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(volume, k) in form.tierPrice" :key="k">
                      <td>
                        <b-form-input v-model="volume.min_unit" size="sm" type="number" min="0"
                                      value="0" placeholder="Enter minimum unit"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="volume.max_unit" size="sm" type="number" min="0"
                                      value="0" placeholder="Enter maximum unit"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="volume.value" size="sm" type="number" min="0"
                                      value="0" placeholder="Per unit price off"></b-form-input>
                      </td>
                      <td>
                        <b-button color="secondary" @click="removeTierPrice(k, volume)">
                          <font-awesome-icon icon="trash-alt"/>
                        </b-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>

            </tab-content>
            <!-- End Part - 3 -->
            <!-- Part - 4 -->
            <tab-content title="Product Description" icon="ti-receipt" :before-change="validateForthStep">
              Product Description
              <hr>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
              <br><br>

              <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Product Weight :"
                  label-for="product-weight">
                <b-form-input v-model="$v.form.weight.$model" size="sm" :state="validateState('weight')"
                              placeholder="Enter product weight" id="product-weight"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.weight.maxLength">
                  Product weight not more than 100 character.
                </b-form-invalid-feedback>
              </b-form-group>
              <div role="group" class="form-group my-3 form-row">
                <label class="col-form-label col-sm-3"> Tags : </label>
                <div class="col-sm-9">
                  <vue-tags-input
                      v-model="tag" class="w-100"
                      :tags="tags" placeholder="Enter product tags"
                      :allow-edit-tags="true" :separators="[';', ',']"
                      @tags-changed="newTags => tags = newTags"/>
                </div>
              </div>
              <div role="group" class="form-group my-3 form-row">
                <label class="col-form-label col-sm-3">Dimension : </label>
                <div class="col-sm-3">
                  <b-form-input v-model="$v.form.length.$model" size="sm" :state="validateState('length')"
                                placeholder="Length"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.length.maxLength">
                    Not more than 10 character.
                  </b-form-invalid-feedback>
                </div>
                <div class="col-sm-3">
                  <b-form-input v-model="$v.form.width.$model" size="sm" :state="validateState('width')"
                                placeholder="Width"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.width.maxLength">
                    Not more than 10 character.
                  </b-form-invalid-feedback>
                </div>
                <div class="col-sm-3">
                  <b-form-input v-model="$v.form.height.$model" size="sm" :state="validateState('height')"
                                placeholder="Height"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.height.maxLength">
                    Not more than 10 character.
                  </b-form-invalid-feedback>
                </div>
              </div>


              <b-row form class="form-group">
                <b-col sm="3">
                  Product Type :
                </b-col>
                <b-col sm="9">
                  <b-form-group>
                    <b-form-radio-group id="radio-group-1" v-model="form.product_type" name="radio-sub">
                      <b-form-radio value="New">New</b-form-radio>
                      <b-form-radio value="Used">Used</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <br>Link Product :
              <hr>

              <v-select label="name" :filterable="false" :options="options" @search="onSearch" @input="addNewProduct"
                        :reduce="name => name.id" placeholder="Search Product by name and sku" multiple>
                <template slot="no-options">
                  type to search product for link..
                </template>
                <template #option="{ name, thumbnail_img }">
                  <div class="d-center">
                    <img :src="showImage(thumbnail_img)" class="mx-2" width="18px" height="18px">
                    {{ name }}
                  </div>
                </template>
                <template slot="selected-option" slot-scope="option">
                  <div class="selected d-center">
                    <img :src="showImage(option.thumbnail_img)" class="mx-2" width="18px" height="18px">
                    {{ option.name }}
                  </div>
                </template>
              </v-select>

            </tab-content>
            <!-- End Part - 4 -->
            <!-- Part - 5 -->
            <tab-content title="Product Shipping and SEO" icon="ti-truck">
              Product Shipping Cost
              <hr>
              <b-row class="my-3">
                <b-col cols="6" sm="4" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Shipping cost : "
                      label-for="shipping-cost">
                    <b-form-input v-model="form.shipping_cost" size="sm" type="number" min="0"
                                  :disabled="shippingSwitch"
                                  value="0" placeholder="Shipping cost" id="shipping-cost"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="my-3">
                <b-col cols="6" sm="4" md="4" class="mb-3 mb-xl-0">
                  <b-form-checkbox v-model="shippingSwitch" name="check-button" switch>
                    Free Shipping:
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <br><br><br>SEO Meta Tags
              <hr>
              <b-row>
                <b-col cols="12" sm="12" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Meta Title : "
                      label-for="meta-title">
                    <b-form-input v-model="form.meta_title" size="sm"
                                  placeholder="Meta Title" id="meta-title"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="6" class="mb-3 mb-xl-0">
                  <b-form-group
                      label-cols-sm="4"
                      label-cols-lg="3"
                      label="Description : "
                      label-for="meta-title">
                    <b-form-textarea v-model="form.meta_description" size="sm" rows="5"
                                     placeholder="Product Description..." id="meta-title"></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-5">
                <b-col cols="6" sm="4" md="2" class="mb-3 mb-xl-0">
                  Meta Image:
                </b-col>
                <b-col cols="6" sm="4" md="2" class="mb-3 mb-xl-0">
                  <vue-upload-multiple-image
                      @before-remove="(index, done, fileList) =>{ done(); form.meta_img = fileList}"
                      @upload-success="(formData, index, fileList) =>{ form.meta_img = fileList[0].path}"
                      :data-images="meta_img" popupText="Product meta image, you can edit and delete"
                      idUpload="myIdUpload5" editUpload="myIdEdit5" idEdit="myIdEdited5"
                      dragText="Drag images (290x300)." browseText="Select single image"
                      primaryText="Meta Image" accept="image/jpeg,image/png,image/bmp,image/jpg"
                      markIsPrimaryText="" :multiple="false"
                  ></vue-upload-multiple-image>
                </b-col>
              </b-row>
            </tab-content>
            <!-- End Part - 5 -->
          </form-wizard>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {maxLength, required} from "vuelidate/lib/validators";
import {api_base_url} from "@/core/config/app";
import ApiService from "@/core/services/api.service";
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  mixins: [validationMixin],
  name: "ProductCreate",
  data() {
    return {
      form: new Form({
        name: '',
        sort_desc: '',
        added_by: 'supplier',
        category_id: '',
        subcategory_id: '',
        subsubcategory_id: '',
        property: '',
        brand_id: '',
        unit: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        tags: '',
        product_type: 'New',
        photos: [],
        thumbnail_img: [],
        featured_img: '',
        flash_deal_img: '',
        video_link: '',
        color: '',
        color_image: [],
        attribute: '',
        attribute_options: [],
        property_options: [],
        tax: 0,
        tax_type: 'Flat',
        discount: 0,
        discount_type: 'Flat',
        discount_variation: 0,
        tierPrice: [{
          min_unit: 1,
          max_unit: 1,
          value: 1,
        }],
        tierDiscount: [{
          unit: 1,
          value: 1,
        }],
        orderQtyLimit: 0,
        orderQtyLimitValue: 0,
        priceType: 0,
        stockManagement: 1,
        unit_price: 0,
        currency_id: '',
        quantity: 0,
        sku: '',
        variant_product: 0,
        priceMenu: [],
        description: '',
        linkProduct: '',
        meta_title: '',
        meta_description: '',
        meta_img: '',
        shipping_type: 'paid',
        shipping_cost: '',

      }),
      category: [],
      subcategory: [],
      subsubcategory: [],
      property: [],
      unit: [],
      brand: [],
      secondStepAlert: false,
      images: [],
      thumbnail: [],
      featured: [],
      flash_deal: [],
      color: [],
      color_image: 'no',
      attribute: [],
      addAttribute: [],
      orderQtyLimit: false,
      currency: [],
      discountMethod: false,
      tier_select: '',
      showDismissibleAlert: false,
      priceType: 0,
      editor: ClassicEditor,
      editorConfig: {},
      tags: [],
      tag: '',
      options: [],
      shippingSwitch: false,
      meta_img: [],
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(200)
      },
      sort_desc: {
        maxLength: maxLength(500)
      },
      weight: {
        maxLength: maxLength(100)
      },
      length: {
        maxLength: maxLength(10)
      },
      width: {
        maxLength: maxLength(10)
      },
      height: {
        maxLength: maxLength(10)
      },
      category_id: {
        required,
      },
      subcategory_id: {
        required,
      },
      subsubcategory_id: {
        required,
      },
      photos: {
        required,
      },
      thumbnail_img: {
        required,
      },
      currency_id: {
        required,
      },
    }
  },
  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    showImage(e) {
      return api_base_url + e;
    },
    validateFirstStep() {
      this.$v.form.$touch();
      if (this.$v.form.name.$anyError || this.$v.form.category_id.$anyError || this.$v.form.subcategory_id.$anyError || this.$v.form.subsubcategory_id.$anyError) {
        this.$v.form.category_id.$anyError ? $('.category_error').show().text('Category name required') : '';
        this.$v.form.subcategory_id.$anyError ? $('.subcategory_error').show().text('Subcategory name required') : '';
        this.$v.form.subsubcategory_id.$anyError ? $('.subsubcategory_error').show().text('Sub Subcategory name required') : '';
        return false
      }
      return true;
    },
    validateSecondStep() {
      this.$v.form.$touch();
      if (this.$v.form.photos.$anyError || this.$v.form.thumbnail_img.$anyError) {
        this.secondStepAlert = true;
        return false;
      } else {
        this.secondStepAlert = false;
        return true;
      }
    },
    validateThirdStep() {
      this.$v.form.$touch();
      return !this.$v.form.currency_id.$anyError;
    },
    validateForthStep() {
      this.form.tags = '';
      for (let i = 0; i < this.tags.length; i++) {
        if (i === this.tags.length - 1)
          this.form.tags += this.tags[i].text;
        else
          this.form.tags += this.tags[i].text + ",";
      }
      return true;
    },
    loadCategory() {
      let that = this;
      ApiService.get('category')
          .then(function (data) {
            that.category = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    loadSubcategory(e) {
      let that = this;
      that.subcategory = [];
      that.form.subcategory_id = '';
      that.subsubcategory = [];
      that.form.subsubcategory_id = '';
      $('.category_error').hide();
      if (e === null) return;
      ApiService.get('subcategory/', e)
          .then(function (data) {
            that.subcategory = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    loadSubSubcategory(e) {
      let that = this;
      that.subsubcategory = [];
      that.form.subsubcategory_id = '';
      $('.subcategory_error').hide();
      if (e === null) return;
      ApiService.get('subsubcategory/', e)
          .then(function (data) {
            that.subsubcategory = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    loadProperty(e) {
      $('.subsubcategory_error').hide()
      let that = this;
      that.property = [];
      that.form.property = '';
      if (e === null) return;
      ApiService.get('property/', e)
          .then(function (data) {
            that.property = data.data.property;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    loadUnit() {
      let that = this;
      ApiService.get('unit')
          .then(function (data) {
            that.unit = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    loadBrand() {
      let that = this;
      ApiService.get('brand')
          .then(function (data) {
            that.brand = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    addNewProperty: function () {
      this.form.property_options = [];
      for (let prop in this.property) {
        if (this.form.property.includes(this.property[prop].id)) {
          this.form.property_options.push({
            name: this.property[prop].name,
            value: ''
          })
        }
      }
    },
    productVideo() {
      this.$refs.youtube.src = this.form.video_link;
    },
    loadColor() {
      let that = this;
      ApiService.get('color')
          .then(function (data) {
            that.color = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    addNewColor: function () {
      this.form.color_image = [];
      let that = this;
      setTimeout(() => {
        if (this.color_image === 'yes') {
          for (let prop in that.form.color) {
            that.form.color_image.push({
              name: that.form.color[prop],
              image: '',
              imageAlfa: [],
            })
          }
        }
      }, 1000);
    },
    loadAttribute() {
      let that = this;
      ApiService.get('attribute')
          .then(function (data) {
            that.attribute = data.data;
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    addNewAttribute: function () {
      this.addAttribute = [];
      for (let prop in this.attribute) {
        if (this.form.attribute.includes(this.attribute[prop].id)) {
          this.addAttribute.push({
            name: this.attribute[prop].name,
            tag: '',
            value: []
          })
        }
      }
    },
    loadCurrency() {
      let that = this;
      ApiService.get('currency')
          .then(function (data) {
            that.currency = _.map(data.data, function (data) {
              var pick = _.pick(data, 'id', 'name', 'symbol');
              var object = {
                value: pick.id,
                text: pick.name + ' ( ' + pick.symbol + ' ) '
              };
              return object;
            })
          })
          .catch(({response}) => {
            console.log(response);
          });
    },
    addTierDiscount() {
      this.form.tierDiscount.push({
        unit: 1,
        value: 1,
      })
    },
    removeTierDiscount(index, invoice_product) {
      var idx = this.form.tierDiscount.indexOf(invoice_product);
      if (idx > -1) {
        this.form.tierDiscount.splice(idx, 1);
      }
    },
    addTierPrice() {
      this.form.tierPrice.push({
        min_unit: 1,
        max_unit: 1,
        value: 1,
      })
    },
    removeTierPrice(index, invoice_product) {
      var idx = this.form.tierPrice.indexOf(invoice_product);
      if (idx > -1) {
        this.form.tierPrice.splice(idx, 1);
      }
    },
    priceList() {
      let data = [];
      this.form.attribute_options = [];
      if (this.form.color.length > 0) data.push(this.form.color);
      for (let prop in this.addAttribute) {
        if (this.addAttribute[prop].value.length > 0) {
          var value = [];
          for (let id in this.addAttribute[prop].value) {
            value.push(this.addAttribute[prop].value[id].text);
          }
          this.form.attribute_options.push({
            'name': this.addAttribute[prop].name,
            'value': value
          })
          data.push(value);
        }
      }

      let result = [];
      let finalResult = [];
      if (data.length > 0) {
        result = this.getCombn(data);
      }
      if (result.length > 0) {
        for (var original_result of result) {
          var makeArray = original_result.split(",");
          var arrFiltered = makeArray.filter(el => {
            return el != null && el != '';
          });
          finalResult.push({
            'variant': arrFiltered,
            'variant_price': this.form.unit_price,
            'quantity': this.form.quantity,
          })
        }
      }
      this.form.priceMenu = finalResult;
      if (this.form.priceMenu.length > 0) this.form.variant_product = 1;
      else this.form.variant_product = 0;

    },
    getCombn(data) {
      var result = [];
      data.forEach(function (item, index) {
        if (index === 0) {
          for (let color of item) {
            result.push(color);
          }
        } else {
          var tmp = [];
          for (let k = 0; k < result.length; k++) {
            for (let color of item) {
              var newArray = [];
              newArray[index] = color;
              tmp.push(result[k].concat(newArray));
            }
          }
          result = tmp;
        }
      });
      return result;
    },
    addNewProduct(e) {
      this.form.linkProduct = e;
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {
      let url = 'product-search?searchProduct=' + search;
      ApiService.get(url)
          .then(res => {
            //console.log(res.data);
            vm.options = res.data;
            loading(false);
          });
    }, 350),
    formSubmit: function () {
      this.show = true;
      this.form.post('user/product')
          .then((e) => {
            this.show = false;
            swal.fire({
              title: 'Product upload successfully',
              text: "Product upload successfully",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.$router.push({name: "product-list"});
            })
          })
          .catch((error) => {
            this.show = false;
            let data = error.response;
            if (data.status === 422) {
              let allData = '', mainData = '';
              $.each(data.data.errors, function (key, value) {
                if ($.isPlainObject(value)) {
                  $.each(value, function (key, value) {
                    allData += value + "<br/>";
                  });
                } else {
                  mainData += value + "<br/>";
                }
              });
              swal.fire({
                title: 'Warning',
                html: mainData,
                type: 'error'
              })
            } else {
              swal.fire({
                title: 'Something wrong',
                text: "Your input data has some problem",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.$router.push({name: "In House Products"});
              })
            }
          })
    },
  },
  created() {
    this.loadCategory();
    this.loadUnit();
    this.loadBrand();
    this.loadColor();
    this.loadAttribute();
    this.loadCurrency();
    this.form.sku = btoa(Date.now() + Math.floor(Math.random() * 999)).replace(/[^a-zA-Z ]/g, "").toUpperCase();
  },
  components: {
    VueUploadMultipleImage
  },
  computed: {
    price() {
      return this.form.color;
    }
  },
  watch: {
    tier_select: function (val) {
      if (val === 'discount') {
        this.form.discount_variation = 1;
        this.discountMethod = true;
      } else {
        this.form.discount_variation = 0;
        this.discountMethod = false;
      }
    },
    color_image: function (val) {
      switch (val) {
        case 'no':
          this.form.color_image = [];
          break;
        default:
          this.form.color_image = [];
          this.addNewColor();
          break;
      }
    },
    addAttribute: {
      deep: true,
      handler() {
        this.priceList();
      }
    },
    orderQtyLimit: function (val) {
      val ? this.form.orderQtyLimit = 1 : this.form.orderQtyLimit = 0;
    },
    priceType: function (val) {
      if (val == 1) {
        if (this.form.priceMenu.length < 1) {
          this.showDismissibleAlert = true;
        }
        this.form.priceType = 1;
      } else if (val == 2) {
        this.form.priceType = 2;
      } else {
        this.form.priceType = 0;
      }
    },
    price() {
      this.priceList();
    },
    shippingSwitch: function (val) {
      val ? this.form.shipping_type = 'free' : this.form.shipping_type = 'paid';
    },
  }
}
</script>

<style scoped>

</style>
