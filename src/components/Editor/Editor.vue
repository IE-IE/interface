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
      fileData: null,
      unsupported: false
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
        this.unsupported = false;
        this.activeEditor = editors[type];
      } else {
        this.unsupported = true;
        this.activeEditor = null;
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
      :is="activeEditor"
      :data="fileData" />
    <div v-if="unsupported">Niewspierany format pliku</div>
  </div>
</template>