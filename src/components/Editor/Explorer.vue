<script>
import { fetch } from '@/request';

export default {
  name: 'ieie-explorer',
  mounted () {
    this.downloadFiles();
  },
  methods: {
    downloadFiles () {
      fetch('chitin/full').then((data) => {
        this.$store.commit('chitin/files', data.full);
      });
    }
  }
};
</script>
