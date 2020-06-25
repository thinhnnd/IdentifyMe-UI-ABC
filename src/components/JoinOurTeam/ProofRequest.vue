<template>
  <el-container class="create-invitation">
    <h2>
      Chúng tôi đã gửi một Proof Request message trên thiết bị di động của bạn <br/> Vui lòng chấp thuận để tiến hành xác minh.
    </h2>

    <h3>Trạng thái xác minh:</h3>
    <h2 v-if="isValidated">Đã xác minh</h2>
    <h2 v-else>
      Chưa xác minh
    </h2>
  </el-container>
</template>

<script>
  import { createProofRequest } from '../../api/proof.api'
  const credential_definition_id = `Dkckb8nZty927vFbm1NbK2:3:CL:24112:UIT-University_default`;
  const requestedAttributes = {
    schema_attrs: ["date_of_birth", "major", "name", "mode_of_study", "degree_classification"],
    restrictions: [{cred_def_id: credential_definition_id}],
  }

  const requestedPredicates =  [
        {
          name: 'score',
          p_type: ">=",
          p_value: "7",
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          name: 'graduated_year',
          p_type: ">=",
          p_value: "2015",
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        }
      ]   
  
  
  
  export default {
    data: () => ({
      credential_definition_id: `Dkckb8nZty927vFbm1NbK2:3:CL:24112:UIT-University_default`,
      isValidated: false,
      isFinished: false,
      proofReqName: 'UIT Degree Verification',
      applicant: null,
      connectionId: '',
      comment: '',
      requestedAttributes: [
        {
          schema_attrs: 'name',
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          schema_attrs: 'date_of_birth',
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          schema_attrs: 'major',
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          schema_attrs: 'degree_classification',
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          schema_attrs: 'mode_of_study',
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        }
      ],
      requestedPredicates: [
        {
          name: 'score',
          p_type: ">=",
          p_value: "7",
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        },
        {
          name: 'graduated_year',
          p_type: ">=",
          p_value: "2015",
          restrictions: [
            {
              cred_def_id: credential_definition_id
            }
          ]
        }
      ]
    }),
    async mounted () {
      console.log('props', this.$route.params)
      const {applicant} = this.$route.params;
      this.applicant = applicant;
      await this.sendRequest();
    },
    methods: {
      async sendRequest() { 
        console.log('proof request data', this.$data);
        const payload = {
          connection_id: this.applicant.connection_id,
          proof_request_name: this.proofReqName,
          requested_attributes: requestedAttributes,
          requested_predicates: requestedPredicates,
          comment: this.comment
        };
        console.log('payload', payload);
        if (this.requestedAttributes.length === 0) {
          this.$alert("Không thể thiếu các thuộc tính", "Lưu ý", {
            confirmButtonText: "OK"
          });
          return;
        }
        const result = await createProofRequest(payload);
        console.log("sendRequest -> result", result);
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
            this.updateProofList(presentationExchange);
          }
        );
      }
    },
      handleFinished(isFinished) {
        this.isFinished = isFinished;
      }
    }
  }
//Dkckb8nZty927vFbm1NbK2:3:CL:24149:UIT-University_default
</script>

<style scoped>
.create-invitation {
  flex-direction: column;
  align-items: center;
}
</style>