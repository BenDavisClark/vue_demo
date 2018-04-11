<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10" :offset="1">
        <el-form :model="formData" :rules="rules" ref="userForm" label-width="100px">
          <!-- Input -->
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>

          <!-- Select -->
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="formData.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- Date -->
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" id="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" id="time" placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="formData.delivery"></el-switch>
          </el-form-item>

          <!-- Checkbox -->
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="formData.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- Radio -->
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="formData.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- Textarea -->
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>

          <!-- 自定义校验 -->
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
          </el-form-item>

          <!-- 数字-加修饰符number -->
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formData.age"></el-input>
          </el-form-item>

          <!-- 单图上传 -->
          <el-form-item label="单图上传">
            <single-upload></single-upload>
          </el-form-item>

          <!-- 多图上传 -->
          <el-form-item label="多图上传">
            <muti-upload></muti-upload>
          </el-form-item>

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
export default {
  components: { SingleUpload, MutiUpload },
  data () {
    // 自定义校验规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      formData: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.line {
  text-align: center;
}
</style>
