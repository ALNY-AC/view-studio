<template>
  <div id="drag">
    <div class="left">
      <div class="comp-list">
        <el-row :gutter="5">
          <el-col :span="12" v-for="item in comps" :key="item.id">
            <div class="comp-item" @click="add(item)">
              <i v-if="item.icon" :class="['comp-icon',item.icon]"></i>
              <span class="comp-name">{{item.name}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="studio">
      <div class="studio-panel">
        <vdr
          v-for="node in nodes"
          :key="node.id"
          :enable-native-drag="false"
          :ref="'drag_'+node.id"
          :on-resize="(handle, x, y, width, height)=>node.onResizeCallback(handle, x, y, width, height)"
          class-name-active="drag-active-class"
          class-name="drag-class"
          :snap="true"
          :on-drag-start="el=>onDragStart(node)"
          @refLineParams="getRefLineParams"
        >
          <div v-if="node.comp=='Echart'" :id="node.id" class="drag-block echart"></div>
          <img v-if="node.comp=='Image'" :id="node.id" class="drag-block img" />
          <div v-if="node.comp=='Text'" :id="node.id" class="drag-block text"></div>
        </vdr>

        <!--辅助线-->
        <span
          class="ref-line v-line"
          v-for="(item) in vLine"
          :key="item.top"
          v-show="item.display"
          :style="{ left: item.position, top: item.origin, height: item.lineLength}"
        />
        <span
          class="ref-line h-line"
          :key="item.left"
          v-for="(item) in hLine"
          v-show="item.display"
          :style="{ top: item.position, left: item.origin, width: item.lineLength}"
        />
        <!--辅助线END-->
      </div>
    </div>
    <div class="prop-panel">
      <div v-if="activeNode">
        <div class="form-item" v-for="(prop,key) in activeNode.properties" :key="key">
          <div class="form-label">{{prop.displayName?prop.displayName:key}}</div>
          <div class="form-value">
            <!-- <div v-if="prop.valueOption">
              <select v-model="activeNode[key]">
                <option :value="opt" :key="opt" v-for="opt in prop.valueOption">{{opt}}</option>
              </select>
            </div>-->
            <input type="text" v-model="activeNode[key]" v-if="prop.type==String" />
            <input type="checkbox" v-model="activeNode[key]" v-if="prop.type==Boolean" />
            <input type="number" v-model="activeNode[key]" v-if="prop.type==Number" />
            <input type="color" v-model="activeNode[key]" v-if="prop.type=='color'" />
            <select v-if="prop.valueOption" v-model="activeNode[key]">
              <option :value="opt" :key="opt" v-for="opt in prop.valueOption">{{opt}}</option>
            </select>
          </div>
        </div>
        <div class="text-center" style="padding:10px">
          <el-button type="danger" @click="del()">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>