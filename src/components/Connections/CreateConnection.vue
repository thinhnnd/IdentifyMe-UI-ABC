<template>
  <el-container class="create-invitation">
    <h2>
      Hệ thống kết nối các công dân, người lao động sử dụng Self-Soverereign
      Identity
    </h2>
    <QRCode v-if="show" :value="invitationUrl" size="200"></QRCode>
    <el-button
      type="primary"
      @click="onClickCreateInvitation()"
      :disabled="isConnected || !!didcomm"
      :loading="loading"
      >Tạo mã QR
    </el-button>
    <br />
    <el-col v-if="!isMobileAgent" width="100%">
      <h2 v-if="isConnected">Client đã kết nối</h2>
      <h2 v-else>
        Công dân, người lao động dùng app tạo và quét mã sau để kết nối
      </h2>
      <el-divider></el-divider>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Invitation url"
        v-model="invitationUrl"
        disabled
      ></el-input>
    </el-col>
    <div v-else>
      <el-button
        v-if="didcomm"
        type="text"
        plain
        :disabled="!didcomm"
        @click="() => {}"
      >
        <el-link
          :disabled="!didcomm"
          :underline="false"
          icon="el-icon-connection"
          :href="didcomm"
          class="btn__text"
          >Kết nối bằng ứng dụng IdentifyMe
        </el-link>
      </el-button>
    </div>
  </el-container>
</template>

<script>
import QRCode from "qrcode.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "CreateConnection",
  components: {
    QRCode
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    connected: function(data) {
      console.log("Message received:", data);
    }
  },
  mounted() {
    if (this.error) {
      this.$notify({
        title: "Error",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  data() {
    return {
      isConnected: false,
      show: false
    };
  },
  methods: {
    ...mapActions("connections/", [
      "createInvitation",
      "setConnection",
      "setInvitation"
    ]),
    ...mapActions(["reset"]),
    async onClickCreateInvitation() {
      await this.createInvitation();
      if (this.invitationUrl) this.show = true;
      this.handleConnectionConnected();
    },
    handleConnectionConnected() {
      //state o trang thai active hoac response moi nhan duoc data de notify
      this.sockets.subscribe(
        this.invitation.connection_id,
        connectionPayload => {
          this.$notify({
            title: "Accepted",
            message: `Invitation has been accepted by ${connectionPayload.their_label}`,
            type: "success",
            duration: 5000
          });
          //replace connection in Array with new connection payload
          this.setConnection(connectionPayload);
          this.isConnected = true;
          this.show = false;
          this.setInvitation(null);
        }
      );
    }
  },
  computed: {
    ...mapGetters("connections/", ["invitationUrl"]),
    ...mapState("connections/", ["invitation"]),
    ...mapState(["loading", "error", "errorMessage", "isMobileAgent"]),
    didcomm() {
      const b64 = this.invitationUrl && this.invitationUrl.split("?c_i=")[1];
      return b64 && "didcomm://invite?c_i=" + b64;
    }
  }
};
</script>

<style scoped>
.create-invitation {
  flex-direction: column;
  align-items: center;
}
.btn__text {
  margin: 0 5px 0 5px;
}
</style>
