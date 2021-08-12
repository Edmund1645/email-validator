import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import ValidatorComponent from "@/plugin/email-validator/Component.vue";

describe("ValidatorComponent", () => {
  let wrapper: Wrapper<Vue, Element>;

  beforeEach(() => {
    wrapper = shallowMount(ValidatorComponent, {
      propsData: {
        email: "",
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should render an input of type email", () => {
    const input = wrapper.find('input[type="email"]');
    expect(input.exists()).toBe(true);
  });

  it("should have the same value as the prop passed from parent", async () => {
    const email = "hey@example.com";
    await wrapper.setProps({ email });
    const input = wrapper.find('input[type="email"]').element as HTMLInputElement;
    expect(input.value).toEqual(email);
  });

  it("should emit an input event with new value", async () => {
    const newEmail = "new@example.com";
    const input = wrapper.find('input[type="email"]');
    await input.setValue(newEmail);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input?.[0]).toEqual([newEmail]); // assert event payload
  });

  it("should validate the syntax correctly first on the browser", async () => {
    const validEmail = "hello@example.com";
    const invalidEmail = "hello@c.c";

    await wrapper.setProps({ email: validEmail });
    expect(wrapper.vm.isValidPattern).toBe(true);

    await wrapper.setProps({ email: invalidEmail });
    expect(wrapper.vm.isValidPattern).toBe(false);
  });

  // it("should validate with Abstract API if local validation was successful", () => {
  //   const mockMethod = jest.spyOn(ValidatorComponent.$options.methods, "validateWithAbstract");
  //   expect(mockMethod).toHaveBeenCalled();
  //   mockMethod.mockRestore();
  // });

  // user can clear input field
});
