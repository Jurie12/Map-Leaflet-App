<template>
  <div class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card elevation="10" class="pa-6 rounded-xl" max-width="420">
      <h2 class="text-h5 text-center mb-6 font-weight-medium">Sign In</h2>

      <v-text-field
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        outlined
        rounded
        dense
        class="mb-4"
      />

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Password"
        prepend-inner-icon="mdi-lock-outline"
        outlined
        rounded
        dense
        @click:append-inner="visible = !visible"
        class="mb-6"
      />

      <v-btn color="primary" rounded block large class="mb-4">
        Log In
      </v-btn>

      <div class="text-center text-subtitle-2 mb-4">OR</div>

      <v-btn
        color="red darken-1"
        dark
        rounded
        block
        large
        @click="signinWithGoogle"
        class="mb-3"
      >
        <v-icon left>mdi-google</v-icon>
        Continue with Google
      </v-btn>

      <v-btn
        color="#5865F2"
        dark
        rounded
        block
        large
        @click="signinWithDiscord"
      >
        <v-icon left>mdi-discord</v-icon>
        Continue with Discord
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<script>
export default {
  layout: "auth",
  middleware: "guest",
  methods: {
    signinWithGoogle() {
      this.$auth.loginWith('google')
    },
    signinWithDiscord() {
      this.$auth.loginWith('discord')
    }
  }
}
</script>
