
<template>
  <div class="vs-blueprint">
    <div :id="id" class="vs-blueprint-scene" ref="scene"></div>
  </div>
</template>
<script>
import BlueApp from './BlueApp'
import BluePic from './BluePic';

let app = new BlueApp();

export default {
  name: 'VsBlueprint',
  data() {
    return {
      id: this.$getRandom(),
      interval: null,
      opt: {
        x: 0,
        y: 0,
      },
      activeNode: null,
      mouse: {
        x: 0,
        y: 0,
        down: false,
      },
      nodes: [],
    }
  },
  methods: {
    initScene() {
      let scene = this.$refs.scene;
      app.init(scene);

      let node1 = new BlueApp.BlueNode();
      node1.x = 200;
      node1.y = 200;


      let node2 = new BlueApp.BlueNode();
      node2.x = 450;
      node2.y = 300;



      let node3 = new BlueApp.BlueNode();
      node3.x = 700;
      node3.y = 320;



      app.addNodes(node1);
      app.addNodes(node2);
      app.addNodes(node3);


      let pic1 = new BlueApp.BluePic(BluePic.PIC_RIGHT);
      let pic2 = new BlueApp.BluePic(BluePic.PIC_LEFT);

      node1.addPic(pic1);
      node2.addPic(pic2);

      pic1.link(pic2);


      let pic3 = new BlueApp.BluePic(BluePic.PIC_RIGHT);
      let pic4 = new BlueApp.BluePic(BluePic.PIC_LEFT);
      let pic5 = new BlueApp.BluePic(BluePic.PIC_RIGHT);
      let pic6 = new BlueApp.BluePic(BluePic.PIC_LEFT);

      node2.addPic(pic3);
      node2.addPic(pic5);

      node3.addPic(pic4);
      node3.addPic(pic6);

      pic3.link(pic4);
      pic5.link(pic6);








    },
    buildCube() {

      let two = this.two;

      for (let i = 1; i <= 2; i++) {

        let cube = this.createDargCube();
        cube.x = i * 300;
        cube.y = i * 300;
        cube.init();
        this.nodes.push(cube);
      }

      let node1 = this.nodes[0];
      let node2 = this.nodes[1];

      let points = [
        new Two.Anchor(node1.x, node1.y, 0, 0, 0, 0),
        new Two.Anchor(node1.x + 50, node1.y + 20, 0, 0, 0, 0),
        new Two.Anchor(node2.x - 50, node2.y - 20, 0, 0, 0, 0),
        new Two.Anchor(node2.x, node2.y, 0, 0, 0, 0),
      ];

      let path = two.makePath([], true,);
      path.stroke = 'rgb(240, 173, 78)';
      path.noFill();
      path.linewidth = 5;
      path.curved = true;
      path.cap = 'round';

      path.vertices = points;

      console.warn();

    },
    render() {
      this.opt.x++;
      this.opt.y++;
      if (!this.two) {
        return;

      }
      let two = this.two;
      two.clear();

      var rect = two.makeRoundedRectangle(this.opt.x, this.opt.y, 200, 100, 10);
      rect.fill = 'rgba(255, 255,255, 0.75)';
      rect.stroke = 'rgb(240, 173, 78)';
      rect.linewidth = 3;

    },


    initThread() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        app.update();
        app.render();
        app.two.update();
      }, 0);
    },
  },

  mounted() {
    this.initScene();
    // this.buildCube();
    this.initThread();
  }
}
</script>
<style lang="scss" scoped>
.vs-blueprint {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  .vs-blueprint-scene {
    position: relative;
    background-color: rgb(66, 66, 66);
    flex: 1;
  }

}
</style>