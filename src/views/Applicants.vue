<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="date_submit"
      label="Ngày nộp"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Họ tên"
      width="240">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Địa chỉ"
      width="300">
    </el-table-column>
    <el-table-column
      prop="position"
      label="VT ứng tuyển"
      width="240">
    </el-table-column>
    <el-table-column
      prop="school"
      label="Trường"
      width="120">
    </el-table-column>
    <el-table-column
      prop="is_validate_degree"
      label="Đã XM bằng"
      :formatter="isValidateFormatter"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="">
        <el-button @click="handleClick" type="text" size="small">Detail</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import { getApplicants } from '../api/applicant.api'
  export default {
    methods: {
      handleClick() {
        console.log('click');
      },
      isValidateFormatter(row, column) {
          if(row.is_validate_degree) {
              return "Đã xác minh";
          }
          else {
              return "Chưa xác minh"
          }
      }
    },
    data() {
      return {
        tableData: []
      }
    },
    async mounted () {
        const res = await getApplicants();
       
        this.tableData = res;
    }
  }

</script>