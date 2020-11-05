
<template>
  <div class="prop-panel">
    <template v-if="node">
      <div class="form-group">
        <div class="group-name">{{node.name}}</div>
        <div class="form-group-body">
          <div class="form-item">
            <div class="form-label">NodeName：</div>
            <div class="form-value">
              <input type="text" v-model.number="node.name" />
            </div>
          </div>
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

          <div class="form-item">
            <div class="form-label">color：</div>
            <div class="form-value">
              <input type="color" v-model="node.color" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group" v-for="(comp,i) in components" :key="i">
        <div class="group-name">
          <div class="comp-title">{{comp.name}}</div>
          <div class="tool-list">
            <div class="tool-item" @click="showDocument(comp)">
              <i class="fa fa-book"></i>
            </div>
            <div class="tool-item" @click="removeComponent(comp)">
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
        <div class="form-group-body">
          <div class="form-item" v-for="(prop,j) in comp.properties" :key="j">
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

            <template v-else-if="prop.type == vs.VSBlueprint">
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <button class="vs-btn" @click="openBlueprint(node,comp,prop,j)">
                  <i class="fa fa-code-fork"></i>
                  配置数据流
                </button>
              </div>
            </template>
            <!-- 按钮 -->
            <template v-else-if="prop.type == vs.VSButton">
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <button
                  class="vs-btn"
                  @click="compClick(node,comp,prop,j)"
                >{{prop.btnName?prop.btnName:'触发'}}</button>
              </div>
            </template>
            <!-- 事件 -->
            <template v-else-if="prop.type == vs.Event">
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <!-- <button
                  class="vs-btn"
                  @click="compClick(node,comp,prop,j)"
                >{{prop.btnName?prop.btnName:'触发'}}</button>-->
                <!-- <select name id>
                  <option
                    :value="event.valie"
                    v-for="(event,z) in vs.Event.BtnEventType"
                    :key="z"
                  >{{event.label}}</option>
                </select>-->
                <input type="text" v-model="comp[j]" />
              </div>
            </template>
            <!-- 请求体 -->
            <template v-else-if="prop.type == vs.VSHttpBody">
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <el-row :gutter="3" v-for="(body,z) in comp[j]" :key="z">
                  <el-col :span="8">
                    <input type="text" v-model="body.field" placeholder="字段名" />
                  </el-col>
                  <el-col :span="12">
                    <input type="text" v-model="body.origin" placeholder="值来源" />
                  </el-col>
                  <el-col :span="2">
                    <button class="vs-btn" @click="comp[j].splice(z,1)">
                      <i class="el-icon-close"></i>
                    </button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <button class="vs-btn" @click="addHttpBody(node,comp,prop,j)">增加字段</button>
                  </el-col>
                </el-row>
              </div>
            </template>

            <template v-else>
              <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
              <div class="form-value">
                <template v-if="!prop.valueOption">
                  <template v-if="prop.type==String">
                    <input type="text" v-model="comp[j]" v-if="!prop.rows" />
                    <textarea v-model="comp[j]" v-if="prop.rows" rows="10"></textarea>
                  </template>

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
        <button
          class="vs-btn"
          v-for="(comp,key) in vs.classList"
          :key="key"
          @click="addComp(key)"
        >{{comp.name}}</button>
        <!-- <button class="vs-btn" @click="addComp('Table')">表格</button> -->
        <!-- <button class="vs-btn" @click="addComp('ChartsLine')">图表1</button> -->
        <!-- <button class="vs-btn" @click="addComp('ChartsPie')">图表2</button> -->
        <button class="vs-btn vs-btn-danger" @click="delNode()">删除节点</button>
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
    },
    app: {
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
        this.handler();
      } else {
        this.components = [];
      }
    }
  },
  methods: {
    addHttpBody(node, comp, prop, j) {
      comp[j].push({
        field: '',
        origin: '',//节点.组件.值
      });
    },
    compClick(node, comp, prop, j) {
      if (typeof comp[prop.clickFunction] == 'function') {
        comp[prop.clickFunction]();
      }
    },
    openBlueprint(node, comp, prop, j) {
      console.warn(node, comp, prop);
    },
    delNode() {
      this.app.removeNode(this.node);
      this.$emit('delete', this.node);
    },
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
      this.handler();
    },
    removeComponent(comp) {
      this.node.removeComponent(comp);
      this.handler();
    }
  }
}
</script>
<style lang="scss" scoped>
.tool {
  .vs-btn {
    width: 100%;
    margin-bottom: 3px;
  }
}
.prop-panel {
  width: 100%;
  background-color: rgb(56, 56, 56);
  padding: 10px;
  height: 100%;
  .form-group {
    .group-name {
      color: rgb(216, 216, 216);
      text-shadow: 1px 1px 1px rgba($color: #000, $alpha: 0.3);
      display: flex;
      align-items: center;
      .comp-title {
        flex: 1;
      }
      .tool-list {
        font-size: 11px;
        display: flex;
        align-items: center;

        .tool-item {
          margin-right: 10px;
          cursor: pointer;
        }
      }
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
      textarea,
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
  cursor: pointer;
}
.upload-img {
  max-height: 100%;
  max-width: 100%;
  display: block;
}
.upload-origin-input {
  display: none !important;
}
</style>