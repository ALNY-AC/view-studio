<template>
  <div id="workspace">
    <div class="vs-studio-panel-group" style="width:220px">
      <div class="vs-studio-panel">
        <el-tree default-expand-all :data="tree" @node-drag-end="handleDragEnd" draggable>
          <div
            class="tree-node"
            slot-scope="{ node, data }"
            @mouseover="mouseover(node,data)"
            @mouseleave="mouseleave(node,data)"
          >
            <span>{{ data.name }}</span>
          </div>
        </el-tree>
      </div>
      <div class="vs-studio-panel">
        <div class="comp-list">
          <el-row :gutter="5">
            <el-col :span="12" v-for="item in comps" :key="item.id">
              <div class="comp-item" @click="addNode(item)">
                <i v-if="item.icon" :class="['comp-icon',item.icon]"></i>
                <span class="comp-name">{{item.name}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="vs-studio-panel" style="flex:1" @click.self.stop="activeNode=null">
      <div class="scene-studio-view" id="sceneView">
        <div class="bg" id="sceneViewBg"></div>
        <div class="scene-studio-box">
          <div class="scene-studio" ref="scene" id="scene" :style="sceneStyle">
            <vdr
              :scale="scale"
              :enable-native-drag="false"
              @resizing="(x, y, w, h)=>node.resizing(x, y, w, h)"
              @dragging="(x,y)=>node.dragging(x,y)"
              class-name-active="drag-active-class"
              class-name="drag-class"
              :scale-ratio="scale"
              parent
              :snap="true"
              :x="node.position.x"
              :y="node.position.y"
              :w="node.size.w"
              :h="node.size.h"
              :z="node.zIndex"
              v-for="node in nodes"
              :key="node.id"
              :onDragStart="()=>selectNode(node)"
            >
              <vs-node :pre-node="preNode" :node="node"></vs-node>
            </vdr>
          </div>
        </div>
      </div>
    </div>
    <div class="vs-studio-panel" style="width:300px">
      <vs-prop-studio :node="activeNode"></vs-prop-studio>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>