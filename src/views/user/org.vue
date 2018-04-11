<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small">添加</el-button>
    </table-operate>
    <table-search>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="所属地区">
          <group v-on:selected="getgroupid"></group>
        </el-form-item>
        <el-form-item label="分组类型">
          <el-select v-model="listQuery.orgType" placeholder="所有组织">
            <el-option label="真实组织" value="0"></el-option>
            <el-option label="虚拟组织" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="listQuery.keyword" placeholder="组织名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </table-search>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border fit stripe style="with:100%">
         <el-table-column type="selection" width="55"></el-table-column>
         <el-table-column prop="parentName" label="上级机构" style="width:35%"></el-table-column>
        <el-table-column prop="orgName" label='组织名称' style="width:10%"></el-table-column>
        <el-table-column  label="组织类型" style="width:10%">
          <template slot-scope="scope">
            <div v-if="scope.row.isVirtual == 0 ">真实组织</div>
            <div v-else>虚拟组织</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" style="width:10%"></el-table-column>
        <el-table-column prop="contacts" label="联系人" style="width:10%"></el-table-column>
        <el-table-column prop="tel" label="联系电话" style="width:10%"></el-table-column>
        <el-table-column prop="belongAreaName" label="所属区域" style="width:35%"></el-table-column>
        <el-table-column prop="address" label="详细地址" style="width:35%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.orgId)">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.orgId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination v-if="pagishow">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </table-pagination>
    </div>
  </div>
</template>

<script>
import { orgList } from '@/api/org'
import { deleteOrg } from '@/api/org'
import TableOperate from '@/components/Table/Operate'
import TableSearch from '@/components/Table/Search'
import TablePagination from '@/components/Table/PagiContainer'
import { mapGetters } from 'vuex'
import Group from '@/components/Group/index'
export default {
  components: {
    TableOperate,
    TableSearch,
    TablePagination,
    Group
  },
  data () {
    return {
      listQuery: {
        areaId: '',
        orgType: '',
        keyword: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 1000,
      list: null,
      listLoading: false,
      currentPage: 1,
      pagishow: false,
      multipleSelection: []
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['token', 'JSESSIONID', 'account'])
  },
  methods: {
    onSubmit: function () {
      console.log('submit!')
    },
    fetchData () {
      this.listLoading = true
      orgList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.recordsTotal
        this.listLoading = false
        this.pagishow = true
      })
    },
    edit: function (index) {
      alert(index)
    },
    remove: function (orgId) {
      var index = this._.findIndex(this.list, ['orgId', orgId])
      deleteOrg(orgId).then(response =>{
        if(response.success){
            this.list.splice(index,1)
            this.$message({
              message: response.message,
              type: 'success'
            })
        }else{
            this.$message({
              message: response.message,
              type: 'warning'
            })
        }
      })
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.fetchData()
    },
     handleSelectionChange(val) {
      let ids = ''
      val.forEach(element => {
        ids+=element['orgId']+','
      });
      console.log(ids)
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    getgroupid: function (data) {
      this.listQuery.areaId = data
    }
  }
}
</script>
