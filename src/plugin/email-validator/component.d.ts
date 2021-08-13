import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    isValidPattern: boolean;
    validateWithAbstract: () => Promise<void>;
    debounce: () => Promise<void>;
  }
}
