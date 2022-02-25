<template>
  <v-container>
    <v-row>
      <v-col v-if="isSignUp" cols="12">
        <v-form class="d-flex flex-column align-center">
          <v-container class="d-flex flex-column align-center">
            <v-text-field
              label="Username"
              required
              outlined
              solo
              color="#AC901E"
              class="text-field"
              v-model="username"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              required
              outlined
              solo
              color="#AC901E"
              class="text-field"
              v-model="password"
            ></v-text-field>
          </v-container>
          <v-btn
            color="#AC901E"
            tile
            width="60%"
            height="50px"
            outlined
            @click="register"
            >Register</v-btn
          >
          <v-btn
            class="mt-6"
            tile
            width="60%"
            height="50px"
            outlined
            color="#AC901E"
            @click="loginWithGitHub"
            >Login with GitHub</v-btn
          >
        </v-form>
      </v-col>
      <v-col v-else class="d-flex flex-column align-center">
        <v-btn tile outlined color="#323232" large @click="$emit('sign-up')"
          >Sign Up</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { APIregister } from "@/API";

export default {
  name: "SignUpPannel",
  props: {
    isSignUp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      APIregister(this.username, this.password)
        .then(user => {
          this.$store.commit("setUser", user);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
        });   
    },
    loginWithGitHub() {
      window.location.replace(
        `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_GITHUB_APP_ID}`
      );
    },
  },
};
</script>

<style scoped>
.text-field {
  width: 60%;
}
</style>
