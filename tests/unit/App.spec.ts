import { shallowMount, Wrapper } from "@vue/test-utils";
import App from "@/App.vue";
import Vue from "*.vue";

describe("App.vue", () => {
  let wrapper: Wrapper<Vue, Element>;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Should render correctly", () => {
    const heading = wrapper.find("h1");
    expect(heading.text()).toBe("Email validation component for vue2");
  });
});
