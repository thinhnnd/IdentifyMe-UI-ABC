<template>
  <el-row>
    <el-col
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
    >
      <el-steps :space="200" :active="step" simple finish-status="success">
        <el-step title="Điền thông tin" icon="el-icon-edit"></el-step>
        <el-step title="Kết nối" icon="el-icon-connection"></el-step>
        <el-step
          title="Xác minh bằng"
          icon="el-icon-document-checked"
        ></el-step>
      </el-steps>
      <el-divider></el-divider>
      <div v-if="step == 0">
        <transition name="el-fade-in-linear">
          <ApplicantForm
            @toggleLoadding="toggleLoadding"
            @submitApplicant="getApplicant"
          />
        </transition>
      </div>
      <div v-else-if="step == 1">
        <transition name="el-fade-in-linear">
          <ApplicantConnection
            @toggleLoadding="toggleLoadding"
            @submitApplicant="getApplicant"
            :applicantGlobalVar="applicantGlobalVar"
          />
        </transition>
      </div>
      <div v-else-if="step == 2">
        <transition name="el-fade-in-linear">
          <ProofRequest
            @toggleLoadding="toggleLoadding"
            :applicantGlobalVar="applicantGlobalVar"
            @hitNextStep="hitNextStep"
          />
        </transition>
      </div>
      <div v-else-if="step == 3">
        <transition name="el-fade-in-linear">
          <ProofRequest
            @toggleLoadding="toggleLoadding"
            :applicantGlobalVar="applicantGlobalVar"
            @hitNextStep="hitNextStep"
          />
        </transition>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { submitApplicantFormRequest } from "../api/applicant.api";
import ApplicantForm from "../components/JoinOurTeam/ApplicantForm";
import ApplicantConnection from "../components/JoinOurTeam/ApplicantConnection";
import ProofRequest from "../components/JoinOurTeam/ProofRequest";

export default {
  name: "JoinOurTeam",
  components: {
    ApplicantForm,
    ApplicantConnection,
    ProofRequest
  },
  data() {
    return {
      applicantGlobalVar: null,
      step: 0,
      loading: false
    };
  },
  methods: {
    getApplicant(value) {
      console.log("get Applicant", value);
      this.applicantGlobalVar = value;
      this.step = this.step + 1;
    },
    hitNextStep() {
      if (this.step < 3) this.step = this.step + 1;
    },
    toggleLoadding() {
      this.loading = !this.loading;
    }
  }
};
</script>
