<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10" :offset="1">
        <el-form :model="formData" :rules="rules" ref="userForm" label-width="100px">
          <!-- Input -->
          <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account"></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="realName">
            <el-input v-model="formData.realName"></el-input>
          </el-form-item>

            <!-- 自定义校验 -->
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
          </el-form-item>

          <!-- Select -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status" placeholder="">
              <el-option v-for="item in formData.stats" :key="item.statusId" :label="item.statusName" :value="item.statusId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属地区" >
            <group v-on:selected="getgroupid" ></group>
          </el-form-item>

          <el-form-item label="所属组织" prop="orgId">
              <el-select v-model="formData.orgId" placeholder="">
                <el-option v-for="item in formData.orgs" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="角色" prop="roleId">
              <el-select v-model="formData.roleId" placeholder="">
                 <el-option v-for="item in formData.roles" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                </el-option>
              </el-select>
          </el-form-item>

           <el-form-item label="性别" prop="sex">
              <el-select v-model="formData.sex" placeholder="">
                 <el-option v-for="item in formData.sexs" :key="item.sexId" :label="item.sexName" :value="item.sexId">
                </el-option>
              </el-select>
          </el-form-item>

          <!-- Textarea -->
          <el-form-item label="手机" prop="tel">
            <el-input v-model="formData.tel"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="memo">
            <el-input type="textarea" v-model="formData.memo"></el-input>
          </el-form-item>

          <!-- 单图上传 -->
          <!-- <el-form-item label="个人图像">
            <single-upload></single-upload>
          </el-form-item> -->

          <!-- 提交表单 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SingleUpload from '@/components/Upload/SingleUpload'
import MutiUpload from '@/components/Upload/MutiUpload'
import Group from '@/components/Group/index'
export default {
  data () {
    // 自定义校验规则
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.formData.checkPass !== '') {
    //       this.$refs.userForm.validateField('checkPass')
    //     }
    //     callback()
    //   }
    // }
    var validatePass2 = (rule, value, callback) => {
      // if (value === '') {
      //   callback(new Error('请再次输入密码'))
      // } else
      if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        accountId:'',
        account: '',
        pass: '',
        password: '',
        realName: '',
        status: '',
        stats:[],
        areaId:'' ,
        orgId:'',
        orgs:[],
        roleId:'',
        roles:[],
        sex: '',
        sexs:[],
        tel: '',
        email: '',
        memo: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // pass: [{required:true, validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }],
        orgId: [
          { required: true, message: '请选择组织', trigger: 'change' }
        ],
         roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        tel: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
      }
    }
  },
  created (){
    var id = this.$route.query.accountId
    var that  = this.formData
    if(id) {
      this.init(id,that)
    }else{
      editAccount().then(response =>{
        that.stats = response.statusList
        that.orgs = response.orgList
        that.roles = response.roleList
        that.sexs= response.sexList
      })
    }
  },
  methods: {
    init: function (id,that) {
        editAccount(id).then(response =>{
          console.log(response)
          that.accountId = response.account.accountId
          that.account = response.account.account
          that.realName = response.account.realName
          that.status = response.account.status
          that.stats = response.statusList
          that.areaId = response.account.areaFullPath
          that.orgId = response.account.orgId
          that.orgs = response.orgList
          that.roleId = response.account.roleId
          that.roles = response.roleList
          that.sexs= response.sexList
          that.sex = response.account.sex
          if(that.sex === true){
            that.sex = 1
          }else{
            that.sex = 0
          }
          that.tel = response.account.tel
          that.email = response.account.email
          that.memo = response.account.memo
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitAccount(this.formData).then(response =>{
            if(response.success){

            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getgroupid: function (data) {
      this.formData.areaId = data
    }
  }
}
</script>
<style>
.line {
  text-align: center;
}
</style>
