<template>
  <div id="iframe-wrap">
    <div class="notfoud-container">
      <div class="img-404">
      </div>
      <p class="notfound-p">哎呀迷路了...</p>
      <div class="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>原来的页面不存在了</li>
          <li>我们的服务器被外星人劫持了</li>
        </ul>
      </div>
      <div class="notfound-btn-container">
        <router-link to="/index">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "404.png"
    }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .notfoud-container .img-404 {
    height: 270px;
    background-size: 200px;
    background: url(../../assets/404_images/page-404.png) center center no-repeat;
    margin-top: 100px;
    margin-bottom: 20px;
  }
  .notfoud-container .notfound-p {
    line-height: 22px;
    font-size: 18px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;
    text-align: center;
    color: #262b31;
  }
  .notfoud-container .notfound-reason {
    color: #9ca4ac;
    font-size: 13px;
    line-height: 13px;
    text-align: left;
    width: 280px;
    margin: 0 auto;
  }

  .notfoud-container .notfound-reason p {
    margin-top: 13px;
  }
  ul,
  menu,
  dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  .notfoud-container .notfound-reason ul li {
    margin-top: 10px;
    margin-left: 36px;
    font-size: 15px;
  }

  .notfoud-container .notfound-btn-container {
    margin: 40px auto 0;
    text-align: center;
  }

  .notfoud-container .notfound-btn-container .notfound-btn {
    display: inline-block;
    border: 1px solid #ebedef;
    background-color: #239bf0;
    color: #fff;
    font-size: 15px;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    line-height: 16px;
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }
</style>
