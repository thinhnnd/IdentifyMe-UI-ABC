<template>
  <el-row>
    <el-col :span="24">
      <h1>THÔNG TIN TUYỂN DỤNG</h1>
      <h3>Giới thiệu</h3>
      <p>
        NeeBooBox là một công ty công nghệ thông tin. Chúng tôi cung cấp các
        dịch vụ về an toàn và bảo mật cho hệ thống mạng của doanh nghiệp
      </p>
      <p>
        Khách hàng của chúng tôi là những doanh nghiệp vừa và nhỏ ở trong và
        ngoài nước
      </p>
      <p>
        Với một môi trường năng động, các nhân viên có trình độ, kỹ năng cao.
        Chúng tôi sẽ đem đến sự hài lòng cho tất cả các đối tác của mình.
      </p>
      <h3>Trở thành thành viên của NeeBooBox bạn sẽ được những ưu đãi:</h3>
      <ul style="display: inline-block">
        <li>Mức đãi ngộ hấp dẫn</li>
        <li>Review tăng lương 2 lần / năm</li>
        <li>Miễn phí bảo hiển y tế</li>
        <li>Team building 2 lần / năm</li>
        <li>Miễn phí đồ ăn vặt, phòng tập GYM</li>
      </ul>
      <h3>Chúng tôi hiện đang tuyển dụng các vị trí sau:</h3>
      <ul style="display: inline-block">
        <li>03 Fresher IT Security Analyst</li>
        <li>02 Fresher IT Security Analyst</li>
        <li>05 Fresher Pentest Engineer</li>
        <li>01 Senior Pentest Engineer</li>
      </ul>

      <p>
        Gửi CV về email:
        <b>recruitment@neeboobox.example.com</b>
      </p>
      <el-divider></el-divider>
      <p>
        <b
          >Hoặc nộp CV thông qua hệ thống Identify.Me để xác minh đại học (chỉ
          hỗ trợ sinh viên UIT):</b
        >
      </p>
      <el-button type="primary" @click="handleNavigateToIdentifyMe"
        >Sử dụng Identify.Me</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleNavigateToIdentifyMe() {
      if (this.$route.path !== "/join-us") this.$router.push("/join-us");
    }
  }
};
</script>
