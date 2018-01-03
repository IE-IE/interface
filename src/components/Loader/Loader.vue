<script>
import { eventSource, fetch } from '@/request';

export default {
  name: 'ieie-loader',

  data () {
    return {
      location: `/home/mortimer/PlayOnLinux's virtual drives/bgee/drive_c/Program Files/Baldur's Gate`,
      locationConfirmed: false,
      progress: {
        chitin: 0,
        text: 0
      }
    };
  },

  methods: {
    confirmLocation () {
      fetch('load/game/location', {
        location: this.location
      }).then(() => {
        this.locationConfirmed = true;
        this.load();
      });
    },
    load () {
      this.chitinLoad();
    },
    chitinLoad () {
      eventSource(this.chitinProgress, 'load/chitin', { progress: true });
    },
    chitinProgress (data, close) {
      this.progress.chitin = data.progress / 100;
      if (this.progress.chitin === 1) {
        close();
        this.textLoad();
      }
    },
    textLoad () {
      eventSource(this.textProgress, 'load/text', {
        progress: true,
        lazyload: true
      });
    },
    textProgress (data, close) {
      this.progress.text = data.progress / 100;
      if (this.progress.text === 1) {
        close();
        this.$router.push('/editor');
      }
    }
  }
};
</script>

<template>
  <bg-panel class="ieie-loader" outset>
    <div v-if="locationConfirmed" class="ieie-loader_progress">
      <bg-header
        :level="3"
        font="postanti"
        class="ieie-loader_header">
        Loading chitin file
      </bg-header>
      <bg-progressbar
        :progress="progress.chitin"
        class="ieie-loader_progressbar" />
      <bg-header
        :level="3"
        font="postanti"
        class="ieie-loader_header">
        Loading text file
      </bg-header>
      <bg-progressbar
        :progress="progress.text"
        class="ieie-loader_progressbar" />
    </div>
    <div v-else class="ieie-loader_location">
      <bg-textfield
        label="Chitin location"
        id="location"
        v-model="location"
        class="ieie-loader_location_field" />
      <bg-button
        @click="confirmLocation"
        inset
        class="ieie-loader_location_button">
        Confirm
      </bg-button>
    </div>
  </bg-panel>
</template>

<style scoped>
.ieie-loader {
  padding: 1em 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.ieie-loader_location {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.ieie-loader_location_button {
  margin-left: 1em;
}

.ieie-loader_location_field {
  width: 100%;
  display: flex;
  align-items: center;
}

.ieie-loader_progress {
  width: 100%;
}

.ieie-loader_progressbar {
  margin-bottom: 2em;
}

.ieie-loader_header {
  font-size: 1em;
  margin-bottom: 1em;
}
</style>

