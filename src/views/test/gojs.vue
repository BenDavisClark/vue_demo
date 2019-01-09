<template>
  <div class="app-container">
    <div id="sample">
      <div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gojs",
  data () {
  },
  mounted(){
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    // Within this function override the definition of '$' from jQuery:
    var $ = go.GraphObject.make;  // for conciseness in defining templates in this function

    const myDiagram =
      $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
        {
          initialContentAlignment: go.Spot.Center,// 居中显示
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,//有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
         });

    // define all of the gradient brushes
    var graygrad = $(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
    var yellowgrad = $(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
    var lavgrad = $(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });

    // define the Node template for non-terminal nodes
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { isShadowed: true },
        // define the node's outer shape
        $(go.Shape,
          { fill: yellowgrad, stroke: "#D8D8D8" },
          new go.Binding("fill", "color")),
        // define the node's text
        $(go.TextBlock,
          { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
          new go.Binding("text", "key"))
      );

    // define the Link template
    // myDiagram.linkTemplate =
    //   $(go.Link,  // the whole link panel
    //     { selectable: false },
    //     $(go.Shape));  // the link shape

    // The previous initialization is the same as the doubleTree.html sample.
    // Here we request JSON-format text data from the server,
    // in this case from a static file so that you can view its contents separately.
    var jsonData =
      { "someProperty":"someValue",
        "nodes":[
          { "key":"Root", "color":"#A570AD" },
          { "key":"Left1", "parent":"Root", "dir":"left", "color":"#91ADDD" },
          { "key":"leaf1", "parent":"Left1" },
          { "key":"leaf2", "parent":"Left1" },
          { "key":"Left2", "parent":"Left1", "color":"#91ADDD" },
          { "key":"leaf3", "parent":"Left2" },
          { "key":"leaf4", "parent":"Left2" },
          { "key":"Right1", "parent":"Root", "dir":"right", "color":"#FEA200" },
          { "key":"Right2", "parent":"Right1", "color":"#FEA200" },
          { "key":"leaf5", "parent":"Right2" },
          { "key":"leaf6", "parent":"Right2" },
          { "key":"leaf7", "parent":"Right2" },
          { "key":"leaf8", "parent":"Right1" },
          { "key":"leaf9", "parent":"Right1" }
        ],
        "someOtherProperty":123 };
   load(jsonData);

    function load(jsondata) {

      // The top-level object has three properties, two of which we ignore.
      // This example assumes that the "nodes" property has the array of node data objects in it.
      // But your data is certainly going to be in a different structure,
      // so you need to figure out how to get an array of node data objects.

      // create the model for the double tree
      myDiagram.model = new go.TreeModel(jsondata["nodes"]);
      // The rest of the code is the same as the doubleTree.html sample

      doubleTreeLayout(myDiagram);
    }

    function doubleTreeLayout(diagram) {
      // Within this function override the definition of '$' from jQuery:
      var $ = go.GraphObject.make;  // for conciseness in defining templates
      diagram.startTransaction("Double Tree Layout");

      // split the nodes and links into two Sets, depending on direction
      var leftParts = new go.Set(go.Part);
      var rightParts = new go.Set(go.Part);
      separatePartsByLayout(diagram, leftParts, rightParts);
      // but the ROOT node will be in both collections

      // create and perform two TreeLayouts, one in each direction,
      // without moving the ROOT node, on the different subsets of nodes and links
      var layout1 =
        $(go.TreeLayout,
          { angle: 180,
            arrangement: go.TreeLayout.ArrangementFixedRoots,
            setsPortSpot: false });

      var layout2 =
        $(go.TreeLayout,
          { angle: 0,
            arrangement: go.TreeLayout.ArrangementFixedRoots,
            setsPortSpot: false });

      layout1.doLayout(leftParts);
      layout2.doLayout(rightParts);

      diagram.commitTransaction("Double Tree Layout");
    }

    function separatePartsByLayout(diagram, leftParts, rightParts) {
      var root = diagram.findNodeForKey("Root");
      if (root === null) return;
      // the ROOT node is shared by both subtrees!
      leftParts.add(root);
      rightParts.add(root);
      // look at all of the immediate children of the ROOT node
      root.findTreeChildrenNodes().each(function(child) {
        // in what direction is this child growing?
        var dir = child.data.dir;
        var coll = (dir === "left") ? leftParts : rightParts;
        // add the whole subtree starting with this child node
        coll.addAll(child.findTreeParts());
        // and also add the link from the ROOT node to this child node
        coll.add(child.findTreeParentLink());
      });
    }
  },
  methods: {

  }
}
</script>
<style>
.line {
  text-align: center;
}
</style>
