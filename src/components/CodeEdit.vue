<template>
  <div :id="id" class="code-edit"></div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export default {
  name: "CodeEdit",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      id: this.$getRandom(10),
      model: '',
      monacoInstance: null,
    }
  },
  watch: {
    value() {
      if (this.model != this.value) {
        this.model = this.value;
        this.monacoInstance.setValue(this.model);
      }
    }
  },
  mounted() {
    this.monacoInstance = monaco.editor.create(document.getElementById(this.id), {
      value: this.value,
      language: "javascript",
      theme: 'vs-dark'
    });

    this.monacoInstance.onDidChangeModelContent((event) => {
      let newValue = this.monacoInstance.getValue();
      this.model = newValue;
      this.$emit('input', this.model);
    });

  }
}
</script>
<style lang="scss" scoped>
.code-edit {
  display: inline-block;
  width: 100%;
  min-height: 300px;
}
</style>