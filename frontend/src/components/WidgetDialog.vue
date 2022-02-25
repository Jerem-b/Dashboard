<template>
  <v-card
    min-width="70vw"
    min-height="70vh"
    tile
    flat
    color="#323232"
    dark
    width="min-content"
  >
    <div class="d-flex flex-wrap align-start" style="height: 100%">
      <v-btn
        v-for="widget in widgets"
        :key="widget.name"
        color="#141414"
        outlined
        plain
        width="250px"
        height="200px"
        class="ma-2"
        style="flex: auto"
        @click="addNewWidget(widget.name)"
      >
        <div class="d-flex flex-column">
          <v-icon color="#E75516">{{ widget.icon }}</v-icon>
          <p>{{ widget.name }}</p>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { services } from "@/datas/services.js";
import { APIaddNewWidget } from "@/API"

export default {
  name: "WidgetsDialog",
  props: {
    service: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      widgets: [],
    };
  },
  methods: {
    addNewWidget(name) {
      const widget = {
        name: name,
        refreshRate: 0,
        size: 0,
        options: ""
      };
      APIaddNewWidget(widget, this.service._id)
      .then(user => {
        this.$store.commit("setUser", user);
      })
    },
  },
  created() {
    const cService = services.find(
      (service) => service.name === this.service.name
    );
    if (cService) {
      this.widgets = cService.widgets;
    }
  },
};
</script>

<style scoped>
p {
  color: #e75516;
  font-weight: bold;
}
</style>