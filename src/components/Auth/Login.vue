<template>
  <div class="login">
    <div class="img-wrapper">
      <img alt="Vue logo" src="../../assets/Identifyme-logo.png" />
    </div>
    <el-card>
      <h2>Login to Identify.Me</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="Username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Đăng nhập</el-button
          >
        </el-form-item>
        <el-popover
          placement="top-start"
          title="Tài khoản demo"
          trigger="click"
        >
          <el-table :data="validCredentials" border>
            <el-table-column
              width="70"
              property="role"
              label="Role"
            ></el-table-column>
            <el-table-column
              width="120"
              property="username"
              label="Username"
            ></el-table-column>
            <el-table-column
              width="120"
              property="password"
              label="Password"
            ></el-table-column>
          </el-table>
          <el-button type="text" class="forgot-password" slot="reference"
            >Quên mật khẩu?</el-button
          >
        </el-popover>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      validCredentials: [
        {
          role: "user",
          username: "user_demo",
          password: "user_demo"
        },
        {
          role: "admin",
          username: "admin_demo",
          password: "admin_demo"
        }
      ],
      model: {
        username: "user_demo",
        password: "user_demo"
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username không thể trống",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username phải có ít nhất 5 ký tự",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password không thể trống",
            trigger: "blur"
          },
          {
            min: 5,
            message: "Password phải có ít nhất 6 ký tự",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("auth/", ["loginUser"]),
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      const isValidCred = this.validCredentials.some(
        cred =>
          cred.username === this.model.username &&
          cred.password === this.model.password
      );
      if (isValidCred) {
        let user = this.validCredentials.find(
          cred => cred.username === this.model.username
        );
        const userLogged = await this.loginUser(user);

        if (userLogged) {
          this.$message.success("Login thành công");
          if (localStorage.getItem("user") !== null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if (user.role === "admin") {
                this.$router.push("/schemas/list");
              } else {
                this.$router.push("/");
              }
            }
          }
        }
      } else {
        this.$message.error("Username hoặc password không đúng!");
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: #ef5734;
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
