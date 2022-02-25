<template>
  <v-card :min-height="size">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="size"></v-select>
      <v-text-field
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
      <v-text-field label="rss id" v-model="feedUrl"></v-text-field>
    </div>
    <div v-else>
      <iframe
        :height="size"
        :src="`https://rss.app/embed/v1/wall/${feedUrl}`"
        frameborder="0"
      ></iframe>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "RSS",
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    personnalWidgetInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      refreshRate: 0,
      feedUrl: "",
      size: 300,
      sizeItems: [
        { text: "Small", value: 300 },
        { text: "Medium", value: 400 },
        { text: "Large", value: 500 },
      ],
    };
  },
  methods: {
    fillInfos() {
      const info = this.personnalWidgetInfo;
      this.refreshRate = info.refreshRate || 0;
      this.size = info.size;
      const options = info.options.split(";");
      this.feedUrl = options[0];
    },
    updateWidget() {
      const widget = {
        refreshRate: this.refreshRate,
        size: this.size,
        options: this.feedUrl + ";",
      };
      return widget;
    },
  },
  watch: {
    personnalWidgetInfo: function () {
      this.fillInfos();
    },
  },
};
</script>