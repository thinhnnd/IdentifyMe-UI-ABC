<template>
  <el-container class="create-invitation">
    <div v-if="!isMobileAgent">
      <h2>
        Hệ thống kết nối các công dân, người lao động sử dụng Self-Soverereign
        Identity
      </h2>
      <h2 v-if="isConnected">SSI Client has been accepted</h2>
      <h2 v-else>
        Ứng viên sử dụng IdentifyMe quét mã sau để kết nối
      </h2>
      <QRCode v-if="show" :value="invitationUrl" size="200"></QRCode>
      <el-divider></el-divider>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Invitation url"
        v-model="invitationUrl"
        disabled
      ></el-input>
    </div>
    <div v-else>
      <h2 v-if="isConnected">SSI Client has been accepted</h2>
      <h3 v-else>
        Ứng viên nhấn vào liên kết dưới để thực hiện các bước tiếp theo trên ứng
        dụng IdentifyMe.
      </h3>
      <el-divider></el-divider>
      <el-button
        v-if="didcomm"
        type="success"
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
          >Mở trên ứng dụng IdentifyMe
        </el-link>
      </el-button>
    </div>
  </el-container>
</template>

<script>
import QRCode from "qrcode.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { fetchConnectionInvitationById } from "../../api/connections.api";
export default {
  name: "CreateConnection",
  props: ["applicantGlobalVar"],
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
  async mounted() {
    try {
      this.applicant = this.applicantGlobalVar;
      this.invitationUrl = this.applicantGlobalVar.invitation_url;
      this.show = true;
      this.handleConnectionConnected();
      if (this.error) {
        this.$notify({
          title: "Error",
          type: "error",
          message: this.errorMessage
        });
        this.reset();
      }
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      isConnected: false,
      show: false,
      invitationUrl: "",
      applicant: null
    };
  },
  methods: {
    handleConnectionConnected() {
      //state o trang thai active hoac response moi nhan duoc data de notify
      this.sockets.subscribe(
        this.applicant.connection_id,
        connectionPayload => {
          this.$notify({
            title: "Accepted",
            message: `Invitation has been accepted by ${connectionPayload.their_label}`,
            type: "success",
            duration: 5000
          });
          this.isConnected = true;
          this.show = false;
          this.$emit("submitApplicant", this.applicant);
        }
      );
    }
  },
  computed: {
    ...mapState(["isMobileAgent"]),
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
</style>
