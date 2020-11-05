<template>
  <div class="vs-blueprint">
    <div :id="id" class="vs-blueprint-scene" ref="scene"></div>
  </div>
</template>
<script>
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
      let params = { fullscreen: true };
      this.two = new Two(params).appendTo(scene);
    },
    createDargCube() {

      let two = this.two;


      let node = {
        twoObject: null,
        down: false,
        app: this,
        x: 500,
        y: 500,
        mw: 0,
        mh: 0,
        id: this.$getRandom(),
        init() {
          let rect = two.makeRoundedRectangle(this.x, this.y, 200, 100, 10);
          rect.fill = 'rgba(255, 255,255, 0.75)';
          rect.stroke = 'rgb(240, 173, 78)';
          rect.linewidth = 3;
          two.update();
          rect._renderer.elem.addEventListener('mousedown', (e) => {
            this.mousedown(e);
          });

          rect._renderer.elem.addEventListener('mouseup', (e) => {
            this.mouseup(e);
          });
          this.twoObject = rect;

        },
        render() {
          this.twoObject.position.x = this.x;
          this.twoObject.position.y = this.y;
        },
        update() {
          if (this.app.mouse.down) {
            if (this.down) {
              this.x = this.app.mouse.x + this.mw;
              this.y = this.app.mouse.y + this.mh;
            }

          } else {
            this.mw = this.x - this.app.mouse.x;
            this.mh = this.y - this.app.mouse.y;
          }
        },
        mousedown(e) {
          this.down = true;
          this.app.activeNode = this;
        },
        mouseup(e) {
          this.down = false;
        }
      }
      return node;


    },
    buildCube() {


      window.addEventListener('mousedown', e => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        this.mouse.down = true;
      });


      window.addEventListener('mouseup', e => {
        this.mouse.down = false;
      });

      window.addEventListener('mousemove', e => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;

        // if (this.activeNode && this.activeNode.down) {

        //   this.activeNode.twoObject.stroke = 'rgb(0, 255, 0)';
        //   this.activeNode.twoObject.position.x = e.x - x + nodex;
        //   this.activeNode.twoObject.position.y = e.y - y + nodey;
        // }

      });

      for (let i = 0; i < 2; i++) {

        let cube = this.createDargCube();
        cube.x = i * 300;
        cube.y = i * 300;
        cube.init();
        this.nodes.push(cube);
      }

      // this.two.update();



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
    buildScene() {
      let scene = this.$refs.scene;

      let w = this.$refs.scene.offsetWidth;
      let h = this.$refs.scene.offsetHeight;

      for (let i = 0; i < w; i++) {
        if ((i * 30) < w) {
          let line = this.two.makeLine(i * 30, 0, i * 30, h);
          line.stroke = 'rgb(77,77,77)';
          line.linewidth = 1;
        } else {
          break;
        }
      }

      for (let i = 0; i < h; i++) {
        if ((i * 30) < h) {
          let line = this.two.makeLine(0, i * 30, w, i * 30);
          line.stroke = 'rgb(77,77,77)';
          line.linewidth = 1;
        } else {
          break;
        }
      }

      this.two.update();

    },

    initThread() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.two) {
          this.two.update();
          this.nodes.forEach(node => {
            node.update();
          });
          this.nodes.forEach(node => {
            node.render();
          });
        }
      }, 0);
    },
  },

  mounted() {
    this.initScene();
    this.buildScene();
    this.buildCube();
    this.initThread();
  }
}
</script>
<style lang="scss" scoped>
.vs-blueprint {
  width: 100vw;
  height: 100vh;
  position: relative;
  .vs-blueprint-scene {
    position: relative;
    background-color: rgb(66, 66, 66);
    width: 100%;
    height: 100%;
  }
}
</style>