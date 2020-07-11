<template>
  <div class="home">
    <div class="img-wrapper">
      <img alt="Vue logo" src="../assets/Identifyme-logo.png" />
    </div>

    <HelloWorld
      msg="Identify.Me - Ứng dụng mô hình Self-Sovereign Identity (SSI) trong quản lý thông tin cá nhân."
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
<style>
.img-wrapper {
  max-width: 200px;
  margin: 0 auto;
}
.img-wrapper > img {
  width: 100%;
}
</style>
