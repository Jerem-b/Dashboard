<template>
  <v-card color="#323232" tile min-width="350px" min-height="250px">
    <v-card-title>
      <p class="ma-0">{{ service.name }}</p>
      <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          fab
          outlined
          small
          plain
          color="#E75516"
          @click="displayWidgets = true"
        >
          <v-icon color="#E75516">mdi-plus</v-icon>
        </v-btn>
        <v-btn class="mr-2" fab outlined small plain color="#E75516">
          <v-icon color="#E75516" @click="deleteService(service._id)"
            >mdi-delete</v-icon
          >
        </v-btn>
    </v-card-title>
    <v-divider color="white"></v-divider>
    <v-card-text class="d-flex flex-wrap">
      <WidgetCard
        class="ma-1"
        v-for="widget in service.widgets"
        :key="widget._id"
        :widget="widget"
        :service="service"
      />
    </v-card-text>
    <v-dialog v-model="displayWidgets">
      <WidgetDialog :service="service" />
    </v-dialog>
  </v-card>
</template>

<script>
import WidgetDialog from "@/components/WidgetDialog.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import { APIdeleteService } from "@/API";

export default {
  name: "ServiceCard",
  components: {
    WidgetDialog,
    WidgetCard,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      displayWidgets: false,
    };
  },
  methods: {
    deleteService(id) {
      APIdeleteService(id).then((user) => {
        this.$store.commit("setUser", user);
      });
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