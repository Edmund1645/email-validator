import Vue from "vue";
import ValidatorComponent from "./Component.vue";

export function install(_Vue: typeof Vue): void {
  _Vue.component("EmailValidator", ValidatorComponent);
}

export default ValidatorComponent; // for use in sfcs
