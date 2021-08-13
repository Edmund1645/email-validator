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

  it("should emit a valid event to know when email is correct or not", async () => {
    await wrapper.setProps({ email: "hello@example.com" });
    expect(wrapper.emitted().valid).toBeTruthy();
  });

  it("should be able to clear the input field", async () => {
    await wrapper.setProps({
      clearable: true,
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    await button.trigger("click");
    expect(wrapper.emitted().input?.[0]).toEqual([""]); // emits an empty string to clear field
  });

  it("should validate with Abstract API if local validation was successful", async () => {
    jest.spyOn(wrapper.vm, "validateWithAbstract");
    const mockDebounceMethod = jest.spyOn(wrapper.vm, "debounce");

    await wrapper.setProps({ email: "hell@example.com", apiKey: "test_api_key" });

    expect(mockDebounceMethod).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
  it("should autocorrect the email with the suggestion", async () => {
    const autocorrect = "autocorrect@example.com";
    await wrapper.setData({ autocorrect });

    const autocorrectButton = wrapper.find("button.ev-autocorrect-button");

    expect(autocorrectButton.exists()).toBe(true);
    await autocorrectButton.trigger("click");
    expect(wrapper.emitted().input?.[0]).toEqual([autocorrect]);
  });
});
