<template>
  <el-card>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-form
          ref="applicantForm"
          :rules="rules"
          :model="applicantForm"
          label-width="120px"
        >
          <el-form-item label="Họ tên" prop="name">
            <el-input v-model="applicantForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Ngày sinh" prop="date_of_birth">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="applicantForm.date_of_birth"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="applicantForm.email" required></el-input>
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="phone_number">
            <el-input v-model="applicantForm.phone_number"></el-input>
          </el-form-item>
          <el-form-item label="Địa chỉ" prop="address">
            <el-input v-model="applicantForm.address"></el-input>
          </el-form-item>
          <el-form-item label="Trường" prop="school">
            <el-input v-model="applicantForm.school"></el-input>
          </el-form-item>
          <el-form-item label="Vị trí">
            <el-radio-group v-model="applicantForm.position">
              <div class="radio-option-container">
                <el-radio
                  class="radio-option"
                  label="Fresher IT Security Analyst"
                ></el-radio>
                <el-radio
                  class="radio-option"
                  label="Senior IT Security Analyst"
                ></el-radio>
                <el-radio
                  class="radio-option"
                  label="Fresher Pentest Engineer"
                ></el-radio>
                <el-radio
                  class="radio-option"
                  label="Senior Pentest Engineer"
                ></el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Support SSI (Only for UIT)">
            <el-switch v-model="applicantForm.is_ssi_support"></el-switch>
          </el-form-item>
          <el-form-item label="Tin nhắn">
            <el-input
              type="textarea"
              v-model="applicantForm.message"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Gửi</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { submitApplicantFormRequest } from "../../api/applicant.api";
export default {
  data() {
    return {
      applicantForm: {
        name: "",
        address: "",
        date_of_birth: new Date("1998-01-01"),
        school: "",
        is_ssi_support: true,
        phone_number: "",
        position: "Fresher IT Security Analyst",
        email: "",
        message: ""
      },
      applicant: null,
      rules: {
        email: [
          {
            required: true,
            message: "Please enter you email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur"
          }
        ],
        name: {
          required: true,
          message: "Please enter your name",
          trigger: "blur"
        },
        phone_number: {
          required: true,
          message: "Please enter your phone number",
          trigger: "blur"
        },
        school: {
          required: true,
          message: "Please enter your school",
          trigger: "blur"
        },
        date_of_birth: {
          required: true,
          message: "Please enter your birth date",
          trigger: "blur"
        },
        address: {
          required: true,
          message: "Please enter your address",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    async onSubmit(event) {
      this.$refs["applicantForm"].validate(async valid => {
        if (valid) {
          this.$emit("toggleLoadding");
          const result = await submitApplicantFormRequest(
            this.$data.applicantForm
          );
          this.$emit("toggleLoadding");
          this.applicant = result;
          this.$emit("submitApplicant", this.applicant);
        } else {
          this.$message({
            title: "Invalid Form",
            message: "Please complete the form before submitting",
            type: "error"
          });
          return;
        }
      });
    }
  }
};
</script>
<style>
.radio-option-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.radio-option {
  display: flex;
  margin-bottom: 5px;
}
</style>
