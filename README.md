# Email validation component for Vue2

## Installation
With NPM
```
npm install https://github.com/Edmund1645/email-validator
```

With Yarn
```
yarn add https://github.com/Edmund1645/email-validator
```

## Quick Example
```vue
<template>
  <form @submit.prevent class="form">
    <EmailValidator v-model="email" placeholder="enter your email" @valid="handleValid" :clearable="true" :apiKey="apiKey" />
    <button :disabled="!emailValid" type="submit" class="button">Does nothing</button>
  </form>
</template>


<script>
import EmailValidator from "@/plugin/email-validator/Component.vue";

export default {
  name: "Form",
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
    handleValid(valid) {
      this.emailValid = valid;
    },
  },
  computed: {
    apiKey() {
      return process.env.VUE_APP_ABSTRACT_API_KEY;
    },
  },
};
</script>
```

## Documentation

### Props
| prop                         | required | default   | description                                                                                                                                                  |
|------------------------------|----------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `email: string`              | yes      | `''`      | Sync the email property from the parent component using `v-model`. ex. `v-model="email"`                                                                     |
| `clearable: boolean`         | no       | `false`   | Reset the email field with the click of a button.                                                                                                            |
| `label: string`              | no       | `'email'` | The text content for the `<label>` tag.                                                                                                                      |
| `apiKey: string`             | no       | `''`      | API key from [abstract api](https://www.abstractapi.com/email-verification-validation-api), if supplied, the email will also be validated with abstract api. |
| `apiValidationDelay: number` | no       | `2000`    | The period to wait for user to finish typing before validating with Abstract API.                                                                            |

You can also pass HTML attributes as props, they will be added to the `<input/>` field.
Example:

```vue
<EmailValidator v-model="email" placeholder="enter your email" disabled />
```

### Events
Events can be listened to using `v-on:` or `@`.
| event    | required                                     | argument         | description                                                                                                                         |
|----------|----------------------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `@input` | yes, unless you model `email` with `v-model` | `email: string`  | Fired every time a user types, the emitted value is the email string.                                                               |
| `@valid` | yes                                          | `valid: boolean` | Fired every time a validation is run, use this to know if the email passes all checks, just in case you want to prevent submission. |
## Contribution
To contribute to this project.

- Fork the repository
- Install dependencies
- Create your own branch, an ideal branch would be: `feature-your_github_username`
- Write tests for your feature in `/tests` (TDD approach)
- Build out your feature
- Create a pull request 🎉
