<template>
  <v-app-bar app color="#25282C" style="overflow: hidden">
    <router-link to="/">
      <v-img src="@/assets/ashboard_logo.png" alt="Ashboard" width="110px" />
    </router-link>
    <v-spacer></v-spacer>
    <div v-if="$store.state.user">
      <v-btn
        class="mr-3"
        fab
        color="#E75516"
        outlined
        plain
        @click.stop="displayServices = true"
      >
        <v-icon color="#E75516">mdi-plus</v-icon>
      </v-btn>
      <v-btn fab color="#E75516" outlined plain>
        <v-icon color="#E75516">mdi-account</v-icon>
      </v-btn>
    </div>
    <v-btn v-else color="#E75516" to="/sign"> Login </v-btn>
    <v-dialog v-model="displayServices">
      <ServicesDialog />
    </v-dialog>
  </v-app-bar>
</template>

<script>
import ServicesDialog from "@/components/ServicesDialog.vue";

export default {
  name: "NavBar",
  components: {
    ServicesDialog
  },
  data() {
    return {
      displayServices: false,
    };
  },
};
</script>