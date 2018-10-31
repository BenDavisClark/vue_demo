import Mock from 'mockjs';
const data = Mock.mock({
  areaList: [
    [{
      id: 330000,
      parentId: 0,
      name: "浙江省",
      shortName: "浙江",
      longitude: 120.15358,
      latitude: 30.287458,
      level: 1,
      isEnable: true
    }],
    [{
      id: 330100,
      parentId: 330000,
      name: "杭州市",
      shortName: "杭州",
      longitude: 120.15358,
      latitude: 30.287458,
      level: 2,
      isEnable: true
    },
      {
        id: 330200,
        parentId: 330000,
        name: "宁波市",
        shortName: "宁波",
        longitude: 121.54979,
        latitude: 29.868387,
        level: 2,
        isEnable: true
      },
      {
        id: 330300,
        parentId: 330000,
        name: "温州市",
        shortName: "温州",
        longitude: 120.67211,
        latitude: 28.000574,
        level: 2,
        isEnable: true
      },
      {
        id: 330400,
        parentId: 330000,
        name: "嘉兴市",
        shortName: "嘉兴",
        longitude: 120.75086,
        latitude: 30.762653,
        level: 2,
        isEnable: true
      },
      {
        id: 330600,
        parentId: 330000,
        name: "绍兴市",
        shortName: "绍兴",
        longitude: 120.582115,
        latitude: 29.997116,
        level: 2,
        isEnable: true
      },
      {
        id: 330800,
        parentId: 330000,
        name: "衢州市",
        shortName: "衢州",
        longitude: 118.87263,
        latitude: 28.941708,
        level: 2,
        isEnable: true
      },
      {
        id: 331000,
        parentId: 330000,
        name: "台州市",
        shortName: "台州",
        longitude: 121.4286,
        latitude: 28.661379,
        level: 2,
        isEnable: true
      },
      {
        id: 331100,
        parentId: 330000,
        name: "丽水市",
        shortName: "丽水",
        longitude: 119.92178,
        latitude: 28.451994,
        level: 2,
        isEnable: true
      }
    ],
    [{
      id: 330102,
      parentId: 330100,
      name: "上城区",
      shortName: "上城",
      longitude: 120.17146,
      latitude: 30.250237,
      level: 3,
      isEnable: true
    },
      {
        id: 330104,
        parentId: 330100,
        name: "江干区",
        shortName: "江干",
        longitude: 120.20264,
        latitude: 30.266603,
        level: 3,
        isEnable: true
      },
      {
        id: 330105,
        parentId: 330100,
        name: "拱墅区",
        shortName: "拱墅",
        longitude: 120.150055,
        latitude: 30.314697,
        level: 3,
        isEnable: true
      },
      {
        id: 330106,
        parentId: 330100,
        name: "西湖区",
        shortName: "西湖",
        longitude: 120.14738,
        latitude: 30.272934,
        level: 3,
        isEnable: true
      }
    ],
    [{
      id: 330102001,
      parentId: 330102,
      name: "清波街道",
      shortName: "清波街道",
      longitude: 120.16153,
      latitude: 30.24093,
      level: 4,
      isEnable: true
    },
      {
        id: 330102003,
        parentId: 330102,
        name: "湖滨街道",
        shortName: "湖滨街道",
        longitude: 120.16789,
        latitude: 30.248837,
        level: 4,
        isEnable: true
      },
      {
        id: 330102004,
        parentId: 330102,
        name: "小营街道",
        shortName: "小营街道",
        longitude: 120.17676,
        latitude: 30.23979,
        level: 4,
        isEnable: true
      },
      {
        id: 330102008,
        parentId: 330102,
        name: "南星街道",
        shortName: "南星街道",
        longitude: 120.16806,
        latitude: 30.21308,
        level: 4,
        isEnable: true
      },
      {
        id: 330102009,
        parentId: 330102,
        name: "紫阳街道",
        shortName: "紫阳街道",
        longitude: 120.168526,
        latitude: 30.230879,
        level: 4,
        isEnable: true
      },
      {
        id: 330102010,
        parentId: 330102,
        name: "望江街道",
        shortName: "望江街道",
        longitude: 120.197914,
        latitude: 30.235298,
        level: 4,
        isEnable: true
      }
    ]
  ],
  initialArea: {
    id: 330000,
    parentId: 0,
    name: "浙江省",
    shortName: "浙江",
    longitude: 120.15358,
    latitude: 30.287458,
    level: 1,
    isEnable: true
  }
});

export default {
  data
}
