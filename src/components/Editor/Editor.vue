<script>
import { fetch } from '@/request';
import IeieExplorer from './Explorer';
import IeieEditorItem from './EditorItem';

export default {
  name: 'ieie-editor',
  components: {
    IeieExplorer,
    IeieEditorItem
  },
  data () {
    return {
      activeEditor: null,
      file: null,
      fileData: null
    };
  },
  methods: {
    fileChosen (file) {
      this.file = file;
      this.loadFileData(file);
    },
    loadFileData (file) {
      fetch(`resources/get/${file}`, {
        full: true
      }).then((data) => {
        this.fileData = data;
        this.loadEditor(data.type);
      });
    },
    loadEditor (type) {
      const editors = {
        ITM: 'IeieEditorItem'
      };

      if (editors[type]) {
        this.activeEditor = editors[type];
      }
    }
  }
};
</script>
<template>
  <div>
    <ieie-explorer @fileChoose="fileChosen" />
    <component
      v-if="activeEditor"
      :is="activeEditor" />
  </div>
</template>