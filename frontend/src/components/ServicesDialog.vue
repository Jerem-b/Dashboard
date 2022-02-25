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
        v-for="service in services"
        :key="service.name"
        color="#141414"
        outlined
        plain
        width="250px"
        height="200px"
        class="ma-2"
        style="flex: auto"
        @click="addNewService(service.name)"
      >
        <div class="d-flex flex-column">
          <v-icon color="#E75516">{{ service.icon }}</v-icon>
          <p>{{ service.name }}</p>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { services } from "@/datas/services.js";
import { APIaddNewService } from "@/API";

export default {
  name: "ServicesDialog",
  data() {
    return {
      services: services,
    };
  },
  methods: {
    addNewService(name) {
        APIaddNewService(name)
        .then(user => {
            this.$store.commit("setUser", user);
        })
    },
  },
};
</script>

<style scoped>
p {
  color: #e75516;
  font-weight: bold;
}
</style>