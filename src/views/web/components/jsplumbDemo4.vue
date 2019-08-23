<template>
  <div class="hello" data-demo-id="groups">
    <a style="margin:10px 0 0 10px;display:inline-block" href="https://jsplumbtoolkit.com"></a>

    <div class="jtk-demo-main">
      <!-- demo -->
      <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">

        <div class="group-container" id="container1" group="one">
          <div class="title">业务支撑系统</div>
          <div class="del" delete-all></div>
          <div class="node-collapse"></div>
          <div id="c1_1" class="w" style="left:30px;top:35px">1.1</div>
          <div id="c1_2" class="w" style="left:160px;top:140px">1.2</div>
        </div>

        <div class="group-container" id="container2" group="two">
          <div class="title"></div>
          <div class="del"></div>
          <div class="node-collapse"></div>
          <div id="c2_1" class="w" style="left:30px;top:40px">2.1</div>
          <div id="c2_2" class="w" style="left:150px;top:160px">2.2</div>
        </div>

        <div class="group-container" id="container3" group="three">
          <div class="title"></div>
          <div class="del"></div>
          <div class="node-collapse"></div>
          <div id="c3_1" class="w" style="left:30px;top:35px">3.1</div>
          <div id="c3_2" class="w" style="left:80px;top:162px">3.2</div>
        </div>

        <div class="group-container" id="container4" group="four">
          <div class="title"></div>
          <div class="del" delete-all></div>
          <div class="node-collapse"></div>
          <div id="c4_1" class="w" style="left:30px;top:35px">4.1</div>
          <div id="c4_2" class="w" style="left:110px;top:150px">4.2</div>
        </div>

        <!--<div class="group-container" id="container5" group="five">-->
          <!--<div class="title"></div>-->
          <!--<div class="del"></div>-->
          <!--<div class="node-collapse"></div>-->
          <!--<div id="c5_1" class="w" style="left:30px;top:35px">5.1</div>-->
          <!--<div id="c5_2" class="w" style="left:140px;top:130px">5.2</div>-->
        <!--</div>-->

        <!--<div class="group-container" id="container6" group="six">-->
          <!--<div class="title"></div>-->
          <!--<div class="del" delete-all></div>-->
          <!--<div class="node-collapse"></div>-->
          <!--<div id="c6_1" class="w" style="left:160px;top:45px">6.1</div>-->
          <!--<div id="c6_2" class="w" style="left:30px;top:150px">6.2</div>-->
        <!--</div>-->

        <!--<div class="group-container" id="container7" group="seven">-->
          <!--<div class="title"></div>-->
          <!--<div class="del" delete-all></div>-->
          <!--<div class="node-collapse"></div>-->
          <!--<div id="c7_1" class="w" style="left:30px;top:35px">7.1</div>-->
          <!--<div id="c7_2" class="w" style="left:90px;top:150px">7.2</div>-->
        <!--</div>-->

        <div class="events"><h3>Events</h3><div id="events"></div></div>
      </div>
      <!-- /demo -->
      <!-- explanation -->
      <!-- <div class="description">
          <h4>GROUPS</h4>
          <p>Demonstrates all of the ways you can use Groups.</p>
      </div> -->
      <!-- /explanation -->
    </div>
  </div>
</template>

<script>
  import { jsPlumb } from 'jsplumb'
  export default {
    name: 'HelloWorld',
    data () {
      return {

      }
    },
    created () {

    },
    mounted(){
      jsPlumb.ready(function () {
        var j = window.j = jsPlumb.getInstance({
          // 默认拖动选项
          DragOptions: {cursor: 'pointer', zIndex: 2000},
          // 用于装饰每个连接的叠加层
          ConnectionOverlays: [
            ['Arrow', {
              location: 1,
              visible: false,
              width: 11,
              length: 11,
              id: 'ARROW'
            }]
          ],
          Container:canvas,
          Connector:"StateMachine",
          Endpoint:["Dot",
          {radius:3}],
          Anchor:"Center"});
        j.bind("connection", function(p) {
          p.connection.bind("click", function() {
            j.detach(this);
          });
        });

        // connect some before configuring group
        j.connect({source:c1_1, target:c2_1});
        j.connect({source:c2_1, target:c3_1});
        j.connect({source:c3_1, target:c4_1});
        j.connect({source:c1_1,target:c1_2});
        j.connect({source:c2_1,target:c2_2});

        // NOTE ordering here. we make one draggable before adding it to the group, and we add the other to the group
        //before making it draggable. they should both be constrained to the group extents.
        j.draggable(c1_1);
        j.addGroup({
          el:container1,
          id:"one",
          constrain:true,
          anchor:"Continuous",
          endpoint:"Blank",
          droppable:false
        });
        j.addToGroup("one", c1_1);
        j.addToGroup("one", c1_2);
        j.draggable(c1_2);
        j.draggable(c2_1);
        j.addGroup({
          el:container2,
          id:"two",
          dropOverride:true,
          endpoint:["Dot", { radius:3 }]
        });  //(the default is to revert)
        j.addToGroup("two", c2_1);
        j.addToGroup("two", c2_2);
        j.draggable(c2_2);

        j.draggable(c3_1);
        j.addGroup({
          el:container3,
          id:"three",
          revert:false,
          endpoint:["Dot", { radius:3 }]
        });
        j.addToGroup("three", c3_1);
        j.addToGroup("three", c3_2);
        j.draggable(c3_2);

        j.draggable(c4_1);
        j.addGroup({
          el:container4,
          id:"four",
          prune:true,
          endpoint:["Dot", { radius:3 }]
        });
        j.addToGroup("four", c4_1);
        j.addToGroup("four", c4_2);
        j.draggable(c4_2);
        j.draggable("standalone");

        //... and connect others afterwards.
        j.connect({source:c3_1,target:c3_2});
        j.connect({source:c4_1,target:c4_2});
        // delete group button
        j.on(canvas, "click", ".del", function() {
          var g = this.parentNode.getAttribute("group");
          j.removeGroup(g, this.getAttribute("delete-all") != null);
        });

        // collapse/expand group button
        j.on(canvas, "click", ".node-collapse", function() {
          var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");

          j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
          j[collapsed ? "expandGroup" : "collapseGroup"](g);
        });

        jsPlumb.fire("jsPlumbDemoLoaded", j);
      });
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../assets/css/demo.css";
  @import "../../../assets/css/jsplumbtoolkit-defaults.css";
  @import "../../../assets/css/jsplumbtoolkit-demo.css";
  @import "../../../assets/css/main.css";
  .w {
    position:absolute;
    width:30px;
    height:30px;
    border:1px solid black;
    font-size:12px;
    border-radius:3px;
    text-align:center;
    background-color:WhiteSmoke;
    opacity:0.7;
    z-index:10;
    color:black;
    cursor:move;
  }

  .w:hover {
    background-color:#629f8d;
  }

  .group-container {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 12px;
    background-color: WhiteSmoke;
    font-size: 12px;
    cursor:move;
  }

  .group-container ul {
    margin-left:25px;
    padding: 0;
  }

  .group-container ul li {
    list-style-type:circle;
    margin-bottom: 7px;
  }

  .large {
    width:600px;
    height:600px;
  }

  .group-container.collapsed {
    height:40px;
  }

  .title {
    background-color:#ABC1BB;
    padding-right:16px;
    font-size:13px;
    height:30px;
  }

  #container1 { left:20px;top:50px; }
  #container2 { left:250px;top:50px; }
  #container3 { left:480px;top:50px; }
  #container4 { left:710px;top:50px; }
  /*#container5 { left:600px;top:340px; }*/
  /*#container6 { left:370px;top:340px; }*/
  /*#container7 { left:140px;top:340px; }*/

  .del, .node-collapse {
    position:absolute;
    top:5px;
    right:5px;
    background-color:white;
    padding:1px;
    cursor:pointer;
    font-size:13px;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align:center;
    display:block;
  }

  .del:after {
    content:"X";
  }

  .node-collapse {
    right:29px;
    text-align: center;
  }

  .node-collapse:after {
    content:"-";
  }

  .group-container.collapsed .node-collapse:after {
    content:"+";
  }

  .del[delete-all] {
    background-color: pink;
  }

  .jtk-connector path {
    stroke-width:1;
  }

  .jtk-group-collapsed .w, .jtk-group-collapsed ul, .jtk-group-collapsed .container, .jtk-group-collapsed .name {
    display:none;
  }

  .jtk-drag-hover {
    outline:4px solid cornflowerblue;
  }

  .katavorio-ghost-proxy {
    outline:2px solid red;
  }

</style>
