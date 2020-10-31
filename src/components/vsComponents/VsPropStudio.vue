
<template>
  <div class="prop-panel">
    <template v-if="node">
      <div class="form-group">
        <div class="group-name">{{node.name}}</div>
        <div class="form-group-body">
          <div class="form-item">
            <div class="form-label">x：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.position.x" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">y：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.position.y" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">w：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.size.w" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">h：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.size.h" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">zIndex：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.zIndex" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group" v-for="(comp,i) in components" :key="i">
        <div class="group-name">{{comp.name}}</div>
        <div class="form-group-body">
          <div class="form-item" v-for="(prop,j) in comp.properties" :key="j">
            <template v-if="prop.type == vs.VSImage">
              <template v-if="prop.type == vs.VSImage">
                <input
                  type="file"
                  class="upload-origin-input"
                  ref="upload"
                  @change="upload(comp)"
                  name="file"
                />
                <div class="upload-input" @click="$refs.upload[0].click()">
                  <span v-if="!comp.src">点击或拖拽上传</span>
                  <img :src="comp.src" v-if="comp.src" class="upload-img" />
                </div>
              </template>
            </template>
            <template v-else>
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <template v-if="!prop.valueOption">
                  <input type="text" v-model="comp[j]" v-if="prop.type==String" />
                  <input type="checkbox" v-model="comp[j]" v-if="prop.type==Boolean" />
                  <input type="number" v-model="comp[j]" v-if="prop.type==Number" />
                  <input type="color" v-model="comp[j]" v-if="prop.type=='color'" />
                </template>

                <select v-if="prop.valueOption" v-model="comp[j]">
                  <option :value="opt" :key="opt" v-for="opt in prop.valueOption">{{opt}}</option>
                </select>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="tool">
        <button @click="addComp('Interval')">计时器</button>
        <button @click="addComp('Table')">表格</button>
        <button @click="addComp('ChartsLine')">图表1</button>
        <button @click="addComp('ChartsPie')">图表2</button>
      </div>
    </template>
  </div>
</template>
<script>
import vs from '../../lib/vs/vs'

export default {
  name: 'VsPropStudio',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      components: [],
      vs: vs,
    }
  },
  watch: {
    'node.id'() {
      if (this.node) {
        this.components = this.node.components;
        this.handler();
      } else {
        this.components = [];
      }
    }
  },
  methods: {

    upload(comp) {

      let file = this.$refs.upload[0].files[0];


      let a = new FileReader();
      a.readAsDataURL(file);
      a.onload = (f) => {
        comp.src = f.target.result;
      }
      return false;

    },
    handler() {


      this.components = this.node.components;

    },
    addComp(comp) {
      this.node.addComponent(comp);
    }
  }
}
</script>
<style lang="scss" scoped>
.prop-panel {
  width: 100%;
  background-color: rgb(56, 56, 56);
  padding: 10px;
  height: 100%;
  .form-group {
    .group-name {
      color: rgb(216, 216, 216);
      text-shadow: 1px 1px 1px rgba($color: #000, $alpha: 0.3);
    }
    padding: 10px 0;
  }
  .form-group-body {
    .form-item {
      .form-value {
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 5px;
        &:hover {
          input,
          select {
            background-color: rgb(106, 106, 106);
          }
        }
      }
    }
  }
  .form-item {
    font-size: 12px;
    color: rgb(216, 216, 216);
    display: flex;
    align-items: flex-start;

    .form-label {
      width: 100px;
      text-align: right;
      margin-right: 5px;
      text-shadow: 1px 1px 1px rgba($color: #000, $alpha: 0.3);
    }

    .form-value {
      flex: 1;

      @mixin form-input {
        text-shadow: 1px 1px 1px rgba($color: #000, $alpha: 0.3);
        line-height: 1.2;
        padding: 3px 5px;
        width: 100%;
        border: none;
        display: block;
        outline: none;
        color: rgb(216, 216, 216);
        background-color: rgb(89, 89, 89);
      }

      input {
        @include form-input;

        &:focus {
          background-color: rgb(128, 128, 128);
          color: #fff;
        }
      }

      input[type="color"] {
        width: 30px;
        height: 30px;
      }

      select {
        @include form-input;
        background-color: rgb(44, 44, 44);
        border: solid 1px rgb(68, 68, 68);
        display: inline-block;
      }
    }
  }
  button {
    background-color: rgb(88, 88, 88);
    border: none;
    outline: none;
    color: rgb(216, 216, 216);
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 2px 10px;
    box-sizing: border-box;
    margin-bottom: 3px;
    &:hover {
      background-color: rgb(106, 106, 106);
    }
  }
}
.upload-input {
  border-radius: 5px;
  border: dashed 3px rgb(88, 88, 88);
  width: 100%;
  height: 120px;
  color: rgb(88, 88, 88);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px 0;
}
.upload-img {
  max-height: 100%;
  display: block;
}
.upload-origin-input {
  display: none !important;
}
</style>