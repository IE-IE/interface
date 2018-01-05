<script>
export default {
  name: 'ieie-editor-item',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    dataSolved () {
      const copy = JSON.parse(JSON.stringify(this.data));

      const relations = [
        'icon_description',
        'icon_ground',
        'icon_inventory',
        'name_identified',
        'name_unidentified',
        'description_identified',
        'description_unidentified'
      ];

      relations.forEach((relation) => {
        const id = copy.data.header[relation];
        const relationObject = this.findRelationObject(copy.relationships, id);

        // This may eventually be null!
        copy.data.header[relation] = relationObject;
      });

      return copy;
    }
  },
  methods: {
    findRelationObject (relationships, id) {
      for (let i = 0; i < relationships.length; i += 1) {
        if (relationships[i].id === id) {
          return relationships[i];
        }
      }

      return null;
    }
  }
};
</script>
<template>
  <bg-panel outset class="editor">
    <bg-header :level="2">Item editor</bg-header>
    <bg-textfield
      label="Item name"
      :value="dataSolved.data.header.name_unidentified.string"
      />
    <bg-textfield
      label="Identified name"
      :value="dataSolved.data.header.name_identified.string"
      />
  </bg-panel>
</template>
<style scoped>
.editor {
  padding: 1em 2em;
  width: 100%;
  height: 100%;
}
</style>

