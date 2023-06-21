export type I18nConstants = {
  [key: string]: {
    [key: string]: string;
  };
};

export type I18nKey = keyof (typeof I18N_CONSTANTS)["en-US"];

export const I18N_CONSTANTS = {
  "en-US": {
    APP_NAME: "Harmony",
    HOME_ABOUT: "About",
    HOME_CONTACT: "Contact",
    HOME_HERO_SUBTITLE:
      "Harmony is the easiest way to communicate over voice, video, and text, whether you’re part of a school club, a nightly gaming group, a worldwide art community, or just a handful of friends that want to hang out.",
    HOME_HERO_TITLE: "A new way to chat with your communities and friends.",
    HOME_LOGIN: "Login",
    HOME_PRIVACY_POLICY: "Privacy Policy",
    HOME_SIGNUP: "Sign up",
    LOGIN_CREATE_ACCOUNT: "Sign up",
    LOGIN_EMAIL_LABEL: "Your email",
    LOGIN_EMAIL_PLACEHOLDER: "name@company.com",
    LOGIN_FORGOT_PASSWORD: "Forgot password?",
    LOGIN_NO_ACCOUNT: "Don't have an account yet?",
    LOGIN_PASSWORD_LABEL: "Password",
    LOGIN_PASSWORD_PLACEHOLDER: "••••••••",
    LOGIN_REMEMBER_ME: "Remember me",
    LOGIN_SUBMIT: "Sign in",
    LOGIN_TITLE: "Sign in to your account",
    SIGNUP_TITLE: "Create an account",
    SIGNUP_EMAIL_LABEL: "Your email",
    SIGNUP_EMAIL_PLACEHOLDER: "name@company.com",
    SIGNUP_USERNAME_LABEL: "Your username",
    SIGNUP_USERNAME_PLACEHOLDER: "John_Doe",
    SIGNUP_PASSWORD_LABEL: "Password",
    SIGNUP_PASSWORD_PLACEHOLDER: "••••••••",
    SIGNUP_CONFIRM_PASSWORD_LABEL: "Confirm password",
    SIGNUP_TOS: "I accept the ",
    SIGNUP_TOS_LINK: "Terms and Conditions",
    SIGNUP_SUBMIT: "Create an account",
    SIGNUP_ALREADY_HAVE_ACCOUNT: "Already have an account?",
    SIGNUP_LOGIN: "Login here",
    EMPTY: "",
    SMILEYS_AND_EMOTION: "Smileys & Emotion",
    PEOPLE_AND_BODY: "People & Body",
    ANIMALS_AND_NATURE: "Animals & Nature",
    FOOD_AND_DRINK: "Food & Drink",
    TRAVEL_AND_PLACES: "Travel & Places",
    ACTIVITIES: "Activities",
    OBJECTS: "Objects",
    SYMBOLS: "Symbols",
    FLAGS: "Flags",
    EMOJI_ALL: "All",
  },
};
