<template>
  <div id="workspace">
    <div class="vs-studio-panel-group">
      <div class="tool-bar">
        <div class="tool-item" @click="save()">保存</div>
      </div>
      <div class="vs-studio-panel-group v">
        <div class="vs-studio-panel-group" style="width:250px">
          <div class="vs-studio-panel" style="flex:1">
            <div class="node-list">
              <div
                :class="['node-item']"
                v-for="node in nodes"
                @click="selectNode(node)"
                @mouseover="mouseover(node)"
                @mouseleave="mouseleave(node)"
                :key="node.id"
              >{{node.name}}</div>
            </div>
          </div>
          <div class="vs-studio-panel" style="flex:1">
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
        <div class="vs-studio-panel" style="flex:1">
          <div class="scene-studio-view" id="sceneView" ref="sceneView">
            <div class="bg" id="sceneViewBg"></div>
            <div class="scene-studio-box" id="sceneStudioBox" ref="sceneStudioBox">
              <div class="scene-studio" ref="scene" :style="sceneStyle" id="scene">
                <div class="vdr-box" ref="vdrbox">
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
                    @activated="()=>selectNode(node)"
                  >
                    <vs-node :pre-node="preNode" :node="node"></vs-node>
                  </vdr>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vs-studio-panel" style="width:300px">
          <vs-prop-studio :app="app" :node="activeNode"></vs-prop-studio>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>