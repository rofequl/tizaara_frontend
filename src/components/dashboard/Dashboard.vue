<template>
  <div class="content">
    <!-- Widgets  -->
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="stat-widget-five">
              <div class="stat-icon dib flat-color-1">
                <i class="pe-7s-cash"></i>
              </div>
              <div class="stat-content">
                <div class="text-left dib">
                  <div class="stat-text">$<span class="count">0</span></div>
                  <div class="stat-heading">Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="stat-widget-five">
              <div class="stat-icon dib flat-color-2">
                <i class="pe-7s-cart"></i>
              </div>
              <div class="stat-content">
                <div class="text-left dib">
                  <div class="stat-text"><span class="count">0</span></div>
                  <div class="stat-heading">Sales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="stat-widget-five">
              <div class="stat-icon dib flat-color-3">
                <i class="pe-7s-browser"></i>
              </div>
              <div class="stat-content">
                <div class="text-left dib">
                  <div class="stat-text"><span class="count">0</span></div>
                  <div class="stat-heading">Product</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="stat-widget-five">
              <div class="stat-icon dib flat-color-4">
                <i class="pe-7s-users"></i>
              </div>
              <div class="stat-content">
                <div class="text-left dib">
                  <div class="stat-text"><span class="count">0</span></div>
                  <div class="stat-heading">Quotation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Widgets -->

    <!-- Orders -->
    <div class="orders">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h4 class="box-title">Orders </h4>
            </div>
            <div class="card-body--">
              <div class="table-stats ov-h">
                <table class="table">
                  <thead>
                  <tr>
                    <th class="serial">#</th>
                    <th class="avatar">Avatar</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="serial">1.</td>
                    <td class="avatar">
                      <div class="round-img">
                        <a href="#"><img class="rounded-circle" src="images/avatar/1.jpg" alt=""></a>
                      </div>
                    </td>
                    <td> #5469 </td>
                    <td>  <span class="name">Louis Stanley</span> </td>
                    <td> <span class="product">iMax</span> </td>
                    <td><span class="count">231</span></td>
                    <td>
                      <b-badge>Complete</b-badge>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div> <!-- /.table-stats -->
            </div>
          </div> <!-- /.card -->
        </div>  <!-- /.col-lg-8 -->
      </div>
    </div>
    <!-- /.orders -->
  </div>
</template>

<script>
export default {
  name: "Dashboard"
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/dashboard/index';
</style>
