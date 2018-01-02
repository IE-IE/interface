<script>
import IeieExplorer from './Explorer';

export default {
  name: 'ieie-editor',
  components: {
    IeieExplorer
  },
  methods: {
    fileChosen (file) {
      console.log(file);
    }
  }
};
</script>
<template>
  <ieie-explorer @fileChoose="fileChosen"/>
</template>