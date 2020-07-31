<template>
  <el-container class="create-invitation">
    <h2 v-if="!isValidated">
      Chúng tôi đã gửi một yêu cầu xác minh bằng cấp trên thiết bị di động của
      bạn
      <br />
      Vui lòng chấp thuận để tiến hành xác minh.
    </h2>
    <h2 v-if="isValidated">
      Xác minh thành công, NeeBooBox sẽ liên hệ bạn qua email và số điện thoại
      đã cung cấp
    </h2>
    <portal-target name="proof-item-detail"></portal-target>
    <h3>Trạng thái xác minh:</h3>
    <div v-if="proof != null">
      <ProofCard :proof="proof" />
    </div>
  </el-container>
</template>

<script>
import { createProofRequest } from "../../api/proof.api";
import { updateApplciant } from "../../api/applicant.api";
import ProofCard from "../Proof/List/ProofCard";
import { UIT_CRED_DEF_ID } from "../../config";

const credential_definition_id = UIT_CRED_DEF_ID;
const requestedAttributes = {
  schema_attrs: [
    "Name",
    "Major"
  ],
  restrictions: [
    {
      cred_def_id: credential_definition_id
    }
  ]
};

const requestedPredicates = [
  {
    name: "GPA",
    p_type: ">=",
    p_value: "70",
    restrictions: [
      {
        cred_def_id: credential_definition_id
      }
    ]
  },
  {
    name: "Graduated Year",
    p_type: ">=",
    p_value: "2015",
    restrictions: [
      {
        cred_def_id: credential_definition_id
      }
    ]
  }
];

export default {
  props: ["applicantGlobalVar"],
  data: () => ({
    isValidated: false,
    isFinished: false,
    proofReqName: "UIT Degree Verification",
    applicant: null,
    connectionId: "",
    comment: "",
    proof: null
  }),
  components: { ProofCard },
  async mounted() {
    // console.log('props', this.$route.params)
    // const {applicant} = this.$route.params;
    this.applicant = this.applicantGlobalVar;
    await this.sendRequest();
  },
  methods: {
    async sendRequest() {
      console.log("proof request data", this.$data);
      const payload = {
        connection_id: this.applicant.connection_id,
        proof_request_name: this.proofReqName,
        requested_attributes: requestedAttributes,
        requested_predicates: requestedPredicates,
        comment: this.comment
      };
      console.log("payload", payload);
      if (requestedAttributes.length === 0) {
        this.$alert("Không thể thiếu các thuộc tính", "Lưu ý", {
          confirmButtonText: "OK"
        });
        return;
      }
      const result = await createProofRequest(payload);
      this.proof = result;
      const updatedApplicant = await updateApplciant(this.applicant.id, {
        proof_id: result.presentation_exchange_id
      });
      this.applicant = updatedApplicant;
      console.log("sendRequest -> result", result);
      this.$emit("submitApplicant", this.applicant);
      if (result.presentation_exchange_id) {
        this.$notify({
          title: "Sent",
          message: "Đã gửi yêu cầu xác minh",
          type: "success"
        });
        this.sockets.subscribe(
          `proof_verified_${result.presentation_exchange_id}`,
          presentationExchange => {
            console.log(
              "sockets received -> presentationExchange",
              presentationExchange
            );
            console.log("received presentationExchange", presentationExchange);
            this.$notify({
              title: "Nhận một Presentation",
              message: `Đã nhận được một presentation từ connection_id ${presentationExchange.connection_id}`,
              type: "success",
              duration: 5000
            });
            this.proof = presentationExchange;
            this.isValidated = presentationExchange.verified;
            console.log("updated proof", this.proof);
            //this.updateProofList(presentationExchange);
            this.$emit("hitNextStep");
          }
        );
      }
    },
    handleFinished(isFinished) {
      this.isFinished = isFinished;
    }
  }
};
//Dkckb8nZty927vFbm1NbK2:3:CL:24149:UIT-University_default
</script>

<style scoped>
.create-invitation {
  flex-direction: column;
  align-items: center;
}
</style>
