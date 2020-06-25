<template>
  <el-container class="create-invitation">
    <h2>
      Hệ thống kết nối các công dân, người lao động sử dụng Self-Soverereign
      Identity
    </h2>
    <QRCode v-if="show" :value="invitationUrl" size="200"></QRCode>

    <h2 v-if="isConnected">SSI Client has been accepted</h2>
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
  </el-container>
</template>

<script>
import QRCode from "qrcode.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { fetchConnectionInvitationById } from '../../api/connections.api'
export default {
  name: "CreateConnection",
  props: ['applicantGlobalVar'],
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
    //console.log('props', this.$route.params)
    //const {applicant} = this.$route.params;
    this.applicant = this.applicantGlobalVar;
    console.log('applicant',this.applicantGlobalVar)
    //const related_connection = await fetchConnectionInvitationById(applicant.connection_id);
    this.invitationUrl = this.applicantGlobalVar.invitation_url;
    this.show = true;
    this.handleConnectionConnected()
    //console.log('related_connection', related_connection);
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
      invitationUrl: '',
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
          //replace connection in Array with new connection payload
          //this.setConnection(connectionPayload);
          this.isConnected = true;
          this.show = false;
          this.$emit('submitApplicant', this.applicant)
          //this.setInvitation(null);
        }
      );
    }
  }
  // methods: {
  //   ...mapActions("connections/", [
  //     "createInvitation",
  //     "setConnection",
  //     "setInvitation"
  //   ]),
  //   ...mapActions(["reset"]),
  //   async onClickCreateInvitation() {
  //     await this.createInvitation();
  //     if (this.invitationUrl) this.show = true;
  //     this.handleConnectionConnected();
  //   },
  //   handleConnectionConnected() {
  //     //state o trang thai active hoac response moi nhan duoc data de notify
  //     this.sockets.subscribe(
  //       this.invitation.connection_id,
  //       connectionPayload => {
  //         this.$notify({
  //           title: "Accepted",
  //           message: `Invitation has been accepted by ${connectionPayload.their_label}`,
  //           type: "success",
  //           duration: 5000
  //         });
  //         //replace connection in Array with new connection payload
  //         this.setConnection(connectionPayload);
  //         this.isConnected = true;
  //         this.show = false;
  //         this.setInvitation(null);
  //       }
  //     );
  //   }
  // },
  // computed: {
  //   ...mapGetters("connections/", ["invitationUrl"]),
  //   ...mapState("connections/", ["invitation"]),
  //   ...mapState(["loading", "error", "errorMessage"])
  // }
};
</script>

<style scoped>
.create-invitation {
  flex-direction: column;
  align-items: center;
}
</style>
