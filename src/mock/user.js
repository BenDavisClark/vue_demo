import Mock from 'mockjs';
const response = Mock.mock({
  data: {
  "message": "数据查询成功！",
    "role": "admin",
    "name": "系统管理员",
    "param": [{
    "name": "系统配置",
    "meta": {
      "icon": "cog",
    },
    "noDropdown": false,
    "children": [{
      "name": "平台信息",
      "url": "systemInfo/Detail",
      "meta": {
        "handleAuth": {}
      }
    }, {
      "name": "菜单权限",
      "url": "auth/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "基础参数",
      "url": "baseParam/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "数据字典",
      "url": "dictInfo/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "区域设置",
      "url": "areas/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "操作日志",
      "url": "operationLog/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "访问记录",
      "url": "loginAccessRecord/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "定时任务",
      "url": "scheduleTask/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }],
    "url": ""
  }, {
    "name": "用户管理",
    "meta": {
      "icon": "user",
    },
    "noDropdown": false,
    "children": [{
      "name": "机构管理",
      "url": "orgManage/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "角色管理",
      "url": "roleManage/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "账号管理",
      "url": "account/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "开户管理",
      "url": "openOrgAcc/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }, {
      "name": "个性化配置",
      "url": "personalized/list",
      "meta": {
        "handleAuth": {
          "add": true,
          "edit": false,
          "del": false
        }
      }
    }],
    "url": ""
  }],
    "status": 200
}
});

export default {
  response
}
