<template>
  <div id="workspace">
    <div class="vs-studio-panel" style="flex:1">
      <div class="scene-studio" @click.self.stop="activeNode=null">
        <vdr
          :enable-native-drag="false"
          @resizing="(x, y, w, h)=>node.resizing(x, y, w, h)"
          @dragging="(x,y)=>node.dragging(x,y)"
          class-name-active="drag-active-class"
          class-name="drag-class"
          :snap="true"
          :x="node.position.x"
          :y="node.position.y"
          :w="node.size.w"
          :h="node.size.h"
          v-for="node in nodes"
          :key="node.id"
          :onDragStart="()=>activeNode=node"
        >
          <vs-node :node="node"></vs-node>
        </vdr>
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