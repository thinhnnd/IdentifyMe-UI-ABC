<template>
  <el-container class="create-invitation">
    <h2>
      Chúng tôi đã gửi một Proof Request message trên thiết bị di động của bạn <br/> Vui lòng chấp thuận để tiến hành xác minh.
    </h2>

    <h3>Trạng thái xác minh:</h3>
    <h2 v-if="isConnected">SSI Client has been accepted</h2>
    <h2 v-else>
      Chưa xác minh
    </h2>
  </el-container>
</template>

<script>
export default {
    
}
//Dkckb8nZty927vFbm1NbK2:3:CL:24149:UIT-University_default
</script>

<style scoped>
.create-invitation {
  flex-direction: column;
  align-items: center;
}
</style>