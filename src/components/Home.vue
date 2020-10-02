<template>
  <div>
    <CategoryMenu/>
    <Deal/>
  </div>
</template>

<script>
import CategoryMenu from './home/Category_menu'
import Deal from './home/Deal'
export default {
  name: "Home",
  components: {
    CategoryMenu,
    Deal
  }
}
</script>

<style scoped>

</style>
