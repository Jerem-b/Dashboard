<template>
  <v-card color="#323232" dark elevation="24">
    <v-card-title>
      <p>{{ widget.name }}</p>
      <v-spacer></v-spacer>
      <div v-if="!isEditing">
        <v-btn
          small
          icon
          fab
          outlined
          plain
          color="#E75516"
          @click="deleteWidget"
          class="mr-2"
        >
          <v-icon color="#E75516">mdi-delete</v-icon>
        </v-btn>
        <v-btn
          small
          icon
          fab
          outlined
          plain
          color="#E75516"
          @click="isEditing = true"
        >
          <v-icon color="#E75516">mdi-cog</v-icon>
        </v-btn>
      </div>
      <v-btn
        v-else
        small
        icon
        fab
        outlined
        plain
        color="#E75516"
        @click="saveWidget"
      >
        <v-icon color="#E75516">mdi-check</v-icon>
      </v-btn>
    </v-card-title>
    <PictureOfTheDay
      v-if="widget.name === 'Picture of the day'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
    <PictureRover
      v-if="widget.name === 'Picture of rover'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
    <CloseAsteroidData
      v-if="widget.name === 'Close asteroid data'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
    <RSS
      v-if="widget.name === 'Rss feed'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
    <Pollution
      v-if="widget.name === 'Pollution'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
    <Weather
      v-if="widget.name === 'Weather'"
      :isEditing="isEditing"
      :personnalWidgetInfo="personnalWidgetInfo"
      ref="child"
    />
  </v-card>
</template>

<script>
import PictureOfTheDay from "@/components/PictureOfDay.vue";
import PictureRover from "@/components/PictureRover.vue";
import CloseAsteroidData from "@/components/CloseAsteroidData.vue";
import RSS from "@/components/RSS.vue";
import Pollution from "@/components/Pollution.vue";
import Weather from "@/components/Weather.vue";

import { APIdeleteWidget, APIgetWidget, APIupdateWidget } from "@/API";

export default {
  name: "WidgetCard",
  components: {
    PictureOfTheDay,
    PictureRover,
    CloseAsteroidData,
    RSS,
    Pollution,
    Weather,
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      personnalWidgetInfo: null,
    };
  },
  methods: {
    deleteWidget() {
      APIdeleteWidget(this.widget._id, this.service._id).then((user) => {
        this.$store.commit("setUser", user);
      });
    },
    saveWidget() {
        this.isEditing = false;
        const widget = this.$refs.child.updateWidget();

        APIupdateWidget(this.widget._id, this.service._id, widget)
        .then(user => {
            this.$store.commit("setUser", user);
        });
    },
  },
  created() {
    APIgetWidget(this.widget._id, this.service._id).then((widget) => {
        this.personnalWidgetInfo = widget;
    });
  }
};
</script>

<style scoped>
p {
  color: #e75516;
  font-weight: bold;
}
</style>