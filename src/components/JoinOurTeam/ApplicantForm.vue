<template>
  <el-form ref="applicantForm" :model="applicantForm" label-width="120px">
    <el-form-item label="Họ tên">
      <el-input v-model="applicantForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Ngày sinh">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="applicantForm.date_of_birth"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="applicantForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Số điện thoại">
      <el-input v-model="applicantForm.phone_number"></el-input>
    </el-form-item>
    <el-form-item label="Địa chỉ">
      <el-input v-model="applicantForm.address"></el-input>
    </el-form-item>
    <el-form-item label="Trường">
      <el-input v-model="applicantForm.school"></el-input>
    </el-form-item>
    <el-form-item label="Vị trí ứng tuyển">
      <el-radio-group v-model="applicantForm.position">
        <el-radio label="Fresher IT Security Analyst"></el-radio>
        <el-radio label="Senior IT Security Analyst"></el-radio>
        <el-radio label="Fresher Pentest Engineer"></el-radio>
        <el-radio label="Senior Pentest Engineer"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Support SSI (Only for UIT)">
      <el-switch v-model="applicantForm.is_ssi_support"></el-switch>
    </el-form-item>
    <el-form-item label="Tin nhắn">
      <el-input type="textarea" v-model="applicantForm.message"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Gửi</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { submitApplicantFormRequest } from "../../api/applicant.api";
export default {
  data() {
    return {
      applicantForm: {
        name: "Thinh nnd",
        address: "TP HCM",
        date_of_birth: new Date(),
        school: "UIT",
        is_ssi_support: true,
        phone_number: "032115115",
        position: "Fresher IT Security Analyst",
        email: "16521179@gm.uit.edu.vn",
        message: ""
      },
      applicant: null
    };
  },
  methods: {
    async onSubmit(event) {
      this.$emit("toggleLoadding");
      const result = await submitApplicantFormRequest(this.$data.applicantForm);
      this.$emit("toggleLoadding");
      this.applicant = result;
      // const res = {
      //   id: 8,
      //   connection_id: "3624eaac-1df9-451f-b9d2-af67c9ded470",
      //   name: "Thinh Nie Nguyen",
      //   date_submit: "2020-06-22T00:00:00.000Z",
      //   date_of_birth: "1998-09-11T00:00:00.000Z",
      //   address: "Ho chi Minh city",
      //   position: "IT Security",
      //   is_validate_degree: false,
      //   is_ssi_support: true,
      //   school: "UIT" ,
      //   invitation_url: "http://45.119.83.216:8050?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMjE2MmY1YzItZjY4My00YzQ0LTkxNDAtYzM1MTFkZDVkMjMyIiwgInJlY2lwaWVudEtleXMiOiBbIjZRa25Uekxpck5rNTZTRjZ1cTdHaUhNWDdISG9SOU1xdDI0ckFQeFk4aXRwIl0sICJsYWJlbCI6ICJOZWVib29ib3hfQ29ycCIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovLzQ1LjExOS44My4yMTY6ODA1MCJ9"
      //   }
      //this.$router.push({ path: '/applicants/connect', name: 'ApplicantsConnections', params: { applicant : result } } );
      this.$emit("submitApplicant", this.applicant);
    }
  }
};
</script>
