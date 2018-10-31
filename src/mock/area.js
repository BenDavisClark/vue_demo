import Mock from 'mockjs';
const data = Mock.mock({
  data: [{
    value: '01',
    label: '江苏',
    children: [
      {
        value: '010101',
        label: '南京',
        children: [
          {
            value: '010101',
            label: '夫子庙',
          }
        ]
      }]
  },{
    value: '01',
    label: '浙江',
    children: [
      {
        value: '010101',
        label: '杭州',
        children: [
          {
            value: '010101',
            label: '建德',
          }
        ]
      }]
  }]
});

export default {
  data
}
