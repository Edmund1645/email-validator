<template>
  <div id="app">
    <h1 class="heading">Email validation component for vue2</h1>
    <form @submit.prevent class="form">
      <EmailValidator v-model="email" placeholder="enter your email" @valid="handleValid" :clearable="true" :apiKey="apiKey" />
      <button :disabled="!emailValid" type="submit" class="button">Does nothing</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EmailValidator from "@/plugin/email-validator/Component.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      email: "",
      emailValid: false,
    };
  },
  components: {
    EmailValidator,
  },
  methods: {
    handleValid(valid: boolean) {
      this.emailValid = valid;
    },
  },
  computed: {
    apiKey() {
      return process.env.VUE_APP_ABSTRACT_API_KEY;
    },
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.heading {
  text-align: center;
}
.form {
  max-width: 500px;
  margin: auto;
}

.button {
  width: 100%;
  padding: 15px 0px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: #186ce9;
  cursor: pointer;
  margin-top: 30px;
}
.button:disabled {
  cursor: not-allowed;
  background: rgb(145, 145, 145);
}
</style>
