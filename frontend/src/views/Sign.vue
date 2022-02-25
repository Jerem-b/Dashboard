<template>
  <div class="sign">
    <v-card tile class="d-flex" color="red" height="70%" width="70%">
      <v-card
        flat
        tile
        :color="isSignUp ? '#ffffff' : '#AC901E'"
        height="100%"
        width="50%"
      >
        <SignUpPannel @sign-up="changeToSignUp" :isSignUp="isSignUp" />
      </v-card>
      <v-card
        flat
        tile
        :color="isSignIn ? '#ffffff' : '#AC901E'"
        height="100%"
        width="50%"
      >
        <SignInPannel @sign-in="changeToSignIn" :isSignIn="isSignIn" />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import SignUpPannel from "@/components/SignUpPannel.vue";
import SignInPannel from "@/components/SignInPannel.vue";

export default {
  name: "Sign",
  components: {
    SignUpPannel,
    SignInPannel,
  },
  data() {
    return {
      isSignUp: true,
      isSignIn: false,
    };
  },
  methods: {
    changeToSignUp() {
      this.isSignUp = true;
      this.isSignIn = false;
    },
    changeToSignIn() {
      this.isSignUp = false;
      this.isSignIn = true;
    },
  },
};
</script>

<style scoped>
.sign {
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
