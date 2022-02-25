<template>
  <v-container>
    <v-row>
      <v-col v-if="isSignIn" cols="12">
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
            @click="login"
            >Login</v-btn
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
        <v-btn tile outlined color="#323232" large @click="$emit('sign-in')"
          >Sign In</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { APIlogin } from "@/API";

export default {
  name: "SignInPannel",
  props: {
    isSignIn: {
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
    login() {
      APIlogin(this.username, this.password)
        .then((res) => {
          console.log(res.message);
          this.$store.commit("setUser", res.data);
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