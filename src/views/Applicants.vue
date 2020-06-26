<template>
  <div>
    <portal-target name="proof-item-detail"></portal-target>
    <el-table v-loading="isLoading" 
      element-loading-text="Đang tải danh sách ứng viên..."
      :data="tableData" 
      style="width: 100%">
      <el-table-column fixed prop="date_submit" label="Ngày nộp" width="150">
      </el-table-column>
      <el-table-column prop="name" label="Họ tên" width="240">
      </el-table-column>
      <el-table-column prop="address" label="Địa chỉ" width="300">
      </el-table-column>
      <el-table-column prop="phone_number" label="Điện thoại" width="120">
      </el-table-column>
      <el-table-column prop="email" label="Email" width="240">
      </el-table-column>
      <el-table-column prop="position" label="VT ứng tuyển" width="240">
      </el-table-column>
      <el-table-column prop="school" label="Trường" width="120">
      </el-table-column>
      <el-table-column
        prop="proof_record.verified"
        label="Đã XM bằng"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.proof_record.verified" style="color:green;"
            >Đã xác minh</span
          >
          <span v-if="!scope.row.proof_record.verified" style="color:red;"
            >Chưa xác minh</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row.proof_record)"
            type="text"
            size="small"
            >Chi tiết xác minh</el-button
          >
          <ProofItemDetail
            v-if="showProof"
            :item="currentProof"
            :setVisible="setVisible"
            :show="showProof"
            :requested_attributes="current_requested_attributes.toString()"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getApplicants } from "../api/applicant.api";
import { getProofRecordById } from "../api/proof.api";
import { createNamespacedHelpers } from "vuex";
import ProofItemDetail from "../components/Proof/List/ProofItemDetail";
export default {
  components: {
    ProofItemDetail
  },
  methods: {
    handleClick(proof) {
      console.log("event ", proof);
      this.currentProof = proof;
      this.showProof = true;
      this.current_requested_attributes = [];
      for (let object in this.currentProof.presentation_request
        .requested_attributes) {
        const name = this.currentProof.presentation_request
          .requested_attributes[object].name;
        this.current_requested_attributes.push(name);
      }
    },
    setVisible(status) {
      this.showProof = status;
    },
    getProofById() {},
    isValidateFormatter(row, column) {
      if (row.proof_record.verified) {
        return "Đã xác minh";
      } else {
        return "Chưa xác minh";
      }
    },
    async getProofRecords(list) {
      return Promise.all(
        list.map(async item => {
          const record = await getProofRecordById(item.proof_id);
          item.proof_record = record;
          return item;
        })
      );

    }
  },
  data() {
    return {
      tableData: [],
      currentProof: null,
      showProof: false,
      isLoading: true,
      current_requested_attributes: []
    };
  },
  async mounted() {
    const res = await getApplicants();
    if (res.length > 0) {
      // const applicants = res.map( async (item) => {
      //   const record = await getProofRecordById(item.proof_id)
      //   item.proof_record = record;
      //   return item;
      // })
      const applicants = await this.getProofRecords(res);
      console.log("applicants", applicants);
      this.tableData = applicants;
      this.isLoading = false;
    }
  }
};
</script>
