<script>
import { fetch } from '@/request';
import debounce from 'debounce';

export default {
  name: 'ieie-explorer',
  data () {
    return {
      filter: '',
      chosenFile: ''
    };
  },
  computed: {
    filteredFiles () {
      const filetypes = this.$store.state.chitin.files;

      if (this.filter) {
        const result = [];

        for (let i = 0; i < filetypes.length; i += 1) {
          const filetype = {
            name: filetypes[i].name
          };

          filetype.files = filetypes[i].files.filter((file) => {
            return file.toLowerCase().indexOf(this.filter.toLowerCase()) === 0;
          });

          result.push(filetype);
        }

        return result;
      }

      return filetypes;
    }
  },
  mounted () {
    this.downloadFiles();
  },
  methods: {
    downloadFiles () {
      fetch('chitin/full').then((data) => {
        this.$store.commit('chitin/files', data.full);
      });
    },
    filterUpdate: debounce(function (value) {
      // eslint-disable-next-line no-invalid-this
      this.filter = value;
    }, 200),
    someFileClicked (event) {
      const file = event.target.dataset.file;
      if (file) {
        this.chosenFile = file;
        this.$emit('fileChoose', file);
      }
    },
    toggleFiletype (event) {
      const fileList = event.target.closest('.explorer_filetype').getElementsByClassName('explorer_filetype_files')[0];
      if (parseInt(fileList.dataset.count) > 0) {
        fileList.classList.toggle('explorer_filetype_files--collapsed');
      }
    }
  }
};
</script>
<template>
  <bg-panel outset class="explorer">
    <bg-scroll height="100%" class="explorer_scroll">
      <ul class="explorer_list">
        <li
          v-for="filetype in filteredFiles"
          :key="`filetype-${filetype.name}`"
          class="explorer_filetype"
          :class="{ 'explorer_filetype--fade': filetype.files.length === 0 }">
          <div
            @click="toggleFiletype"
            class="explorer_filetype_name">
            {{ filetype.name }}
            <span class="explorer_filetype_count">
              ({{ filetype.files.length }})
            </span>
          </div>
          <ul
            class="explorer_list explorer_filetype_files"
            :class="{ 'explorer_filetype_files--collapsed': !(filter && filetype.files.length < 10) }"
            :data-count="filetype.files.length"
            @click="someFileClicked">
            <li
              v-for="file in filetype.files"
              :key="`filetype-${filetype.name}-${file}`"
              :data-file="file"
              :class="{ 'explorer_filetype_file--mark': file === chosenFile }"
              class="explorer_filetype_file">
              {{ file }}<span class="explorer_filetype_file_ext">.{{ filetype.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </bg-scroll>
    <bg-textfield
      @input="filterUpdate"
      vertical
      label="Wyszukaj"
      id="filter"
      class="explorer_filter" />
  </bg-panel>
</template>
<style scoped>
.explorer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  padding: 1em;
}

.explorer_scroll {
  height: calc(100% - 100px);
  color: #fafafa;
  font-family: 'Postanti';
  user-select: none;
}

.explorer_list {
  margin-top: 0;
  padding-left: 1em;
  list-style: circle;
}

.explorer_filetype--fade {
  opacity: 0.5;
}

.explorer_filetype_files--collapsed {
  display: none;
}

.explorer_filetype_name {
  display: block;
}

.explorer_filetype_count {
  font-size: 0.8em;
}

.explorer_filetype_file {
  line-height: 1.2;
  font-size: 0.9em;
}

.explorer_filetype_file_ext {
  font-size: 0.6em;
}

.explorer_filetype_file--mark {
  color: rgb(224, 199, 55);
  text-decoration: underline;
}

.explorer_filter {
  margin-top: 1em;
}
</style>
