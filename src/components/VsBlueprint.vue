
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
      node2.x = 500;
      node2.y = 500;

      app.addNodes(node1);
      app.addNodes(node2);

      node1.addPic(new BlueApp.BluePic(node1, node2), BluePic.PIC_RIGHT);
      // node2.addPic(new BlueApp.BluePic(node2, node1), BluePic.PIC_LEFT);







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