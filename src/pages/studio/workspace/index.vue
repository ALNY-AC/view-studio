<template>
  <div id="workspace">
    <div class="left">
      <div class="view">
        <vdr
          :enable-native-drag="false"
          @resizing="resizing"
          @dragging="onDrag"
          class-name-active="drag-active-class"
          class-name="drag-class"
          :snap="true"
          :x="config.x"
          :y="config.y"
          :w="config.w"
          :h="config.h"
        >
          <div class="block"></div>
        </vdr>
      </div>
      <pre id="pre" v-html="console"></pre>
    </div>
    <div class="right">
      <div class="form-item">
        <label for>x:</label>
        <input type="text" v-model.number="config.x" />
      </div>
      <div class="form-item">
        <label for>y:</label>
        <input type="text" v-model.number="config.y" />
      </div>
      <div class="form-item">
        <label for>w:</label>
        <input type="text" v-model.number="config.w" />
      </div>
      <div class="form-item">
        <label for>h:</label>
        <input type="text" v-model.number="config.h" />
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>