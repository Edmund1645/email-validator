import Vue from "vue";
import ValidatorComponent from "./Component.vue";

export default function (_Vue: typeof Vue): void {
  _Vue.component("email-validator", ValidatorComponent);
}

export const EmailValidator = ValidatorComponent;
