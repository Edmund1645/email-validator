<template>
  <div class="ev-container">
    <label for="email" class="ev-label">{{ label }}</label>
    <div class="ev-field-container">
      <input
        id="email"
        class="ev-field"
        :class="{ 'ev-field-error': focused && isValidPattern === false }"
        :value="email"
        @focus.once="focused = true"
        @input="handleInput"
        type="email"
        v-bind="$attrs"
        :valid="isValidPattern"
      />
      <button v-if="clearable" class="ev-clear-button" @click="$emit('input', '')" :disabled="validatingWithAbstract">
        {{ validatingWithAbstract ? "..." : "Clear" }}
      </button>
    </div>

    <div v-if="autocorrect" class="ev-autocorrect">
      <span class="ev-autocorrect-text">Did you mean</span>
      <button @click="useAutocorrect" class="ev-autocorrect-button">{{ autocorrect }}?</button>
    </div>

    <p class="ev-error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AbstractResponse } from "./types";

export default Vue.extend({
  name: "EmailValidator",
  inheritAttrs: false,
  data() {
    return {
      focused: false,
      timerId: NaN,
      validatingWithAbstract: false,
      cannotReceiveMails: false,
      autocorrect: "",
    };
  },
  model: {
    prop: "email",
    event: "input",
  },
  props: {
    email: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Email",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    apiValidationDelay: {
      type: Number,
      default: 2000,
    },
    apiKey: {
      type: String,
      default: "",
    },
  },
  computed: {
    isValidPattern() {
      // eslint-disable-next-line no-useless-escape
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm.test(
        this.email
      );
    },
    errorMessage() {
      if (this.focused && !this.email) {
        return "Email is required.";
      } else if (this.focused && !this.isValidPattern) {
        return "Email is not valid.";
      }

      if (this.cannotReceiveMails) {
        return "Email cannot receive mails";
      }

      return "";
    },
  },
  watch: {
    email() {
      if (this.isValidPattern === true && this.apiKey) {
        this.debounce(this.validateWithAbstract, this.apiValidationDelay)(); // wait after user is done typing
      } else if (this.isValidPattern === true) {
        this.$emit("valid", true);
      } else {
        this.$emit("valid", false);
      }
    },
  },
  methods: {
    handleInput($event: InputEvent) {
      this.$emit("input", ($event.target as HTMLInputElement).value);
    },
    async validateWithAbstract(): Promise<void> {
      const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${this.apiKey}&email=${this.email}&auto_correct=true`;
      this.validatingWithAbstract = true;
      this.cannotReceiveMails = false;

      try {
        const response = await fetch(url);
        const data: AbstractResponse = await response.json();

        if (data.is_valid_format.value && data.deliverability !== "UNDELIVERABLE") this.$emit("valid", true);

        if (data.deliverability === "UNDELIVERABLE") {
          this.cannotReceiveMails = true;
          this.$emit("valid", false);
        }

        this.autocorrect = data.autocorrect;
        this.validatingWithAbstract = false;
      } catch (err) {
        this.validatingWithAbstract = false;
        console.log(err);
      }
    },
    useAutocorrect() {
      this.$emit("input", this.autocorrect);
      this.autocorrect = "";
    },
    debounce(callback: () => void, wait: number) {
      return () => {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(function (this) {
          callback.apply(this);
        }, wait);
      };
    },
  },
});
</script>

<style scoped>
.ev-container {
  --ev-success: #33c062;
  --ev-error: #e03333;
  --ev-grey: rgb(126, 126, 126);
}

.ev-label {
  display: inline-block;
  margin-bottom: 0.4rem;
}

.ev-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
}

.ev-field {
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  padding: 1rem;
  flex: 1;
  font-size: 1rem;
  width: 100%;
}
.ev-clear-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--ev-grey);
  margin-left: 20px;
}

input.ev-field.ev-field-error {
  border-color: var(--ev-error);
}

.ev-field:focus {
  outline: none;
  border-color: var(--ev-success);
}

.ev-autocorrect-button {
  border: none;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
}

.ev-error-message {
  color: var(--ev-error);
  margin: 0;
  margin-bottom: 0.3rem;
}
</style>
