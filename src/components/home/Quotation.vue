<template>
  <div class="weekly-market-wrapper newsletter-wrapper">
    <div class="container-fluid">
      <div class="row">
        <h2 class="page-title"><a href=""><img src="@/assets/image/rfq.png" class="img-fluid" width="40" alt=""> request for quotation</a>
        </h2>
      </div>
      <div class="row">
        <div class="col-sm-5">
          <div class="custom-feature-grid request-quotation">
            <h4>Global Sourcing Marketplace</h4>
            <div class="banner-number">
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">1107000 +</span>
                </div>
                <span>RFQs</span>
              </div>
              <div class="number-item">
                <div class="item-total" style="font-weight: 500;"> &lt;17h</div>
                <span>Avg Quotation Duration</span>
              </div>
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">139000 +</span>
                </div>
                <span>Active Suppliers</span>
              </div>
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">5234 </span>
                </div>
                <span>Industries</span>
              </div>
            </div>
            <a href="" class="btn-more" style="background: transparent;border: 1px solid #f23a3a;">Learn More</a>
          </div>
        </div>
        <div class="col-sm-7">
          <div class="card-wrapper">
            <div class="card request-form">
              <div class="card-body">
                <h3>One Request, Multiple Quotes</h3>
                <form>
                  <div class="form-group">
                    <input type="email" class="form-control" id="" aria-describedby="emailHelp" placeholder="What are you looking for…">
                    <small id="emailHelp" class="form-text text-muted text-left">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-row mb-4">
                    <div class="form-group col-md-6">
                      <input type="number" class="form-control" placeholder="Quantity" id="">
                    </div>
                    <div class="form-group col-md-6">
                      <select id="" class="form-control">
                        <option selected>Piece/Pieces</option>
                        <option>Bag/Bags</option>
                        <option>Barrel/Barrels</option>
                        <option>Bushel/Bushels</option>
                        <option>Cubic Meter/Cubic Meters</option>
                        <option>Dozen/Dozens</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-main">Request For Quotation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "quotation"
}
</script>

<style scoped>

</style>