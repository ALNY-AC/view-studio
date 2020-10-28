<template>
  <div id="workspace">
    <div class="left">
      <div class="view" @click.self.stop="activeNode=null">
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
          <component v-if="node.componentName" :is="node.componentName" :node="node"></component>
        </vdr>
      </div>
    </div>
    <div class="right">
      <div v-if="activeNode">
        <div class="form-item">
          <label for>x:</label>
          <input type="text" v-model.number="activeNode.position.x" />
        </div>
        <div class="form-item">
          <label for>y:</label>
          <input type="text" v-model.number="activeNode.position.y" />
        </div>
        <div class="form-item">
          <label for>w:</label>
          <input type="text" v-model.number="activeNode.size.w" />
        </div>
        <div class="form-item">
          <label for>h:</label>
          <input type="text" v-model.number="activeNode.size.h" />
        </div>

        <div class="form-group" v-for="(comp,key) in activeNode.components" :key="key">
          <div class="group-name">{{comp.name}}</div>
          <div class="form-item" v-for="(prop,j) in comp.properties" :key="j">
            <div class="form-label">{{prop.displayName?prop.displayName:j}}</div>
            <div class="form-value">
              <input type="text" v-model="comp[j]" v-if="prop.type==String" />
              {{comp[j]}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>