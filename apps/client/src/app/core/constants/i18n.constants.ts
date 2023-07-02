export type I18nConstants = {
  [key: string]: {
    [key: string]: string;
  };
};

export type I18nKey = keyof (typeof I18N_CONSTANTS)["en-US"];

export const I18N_CONSTANTS = {
  "en-US": {
    USERNAME: "Username",
    EMAIL: "Email",
    NEW_PASSWORD: "New password",
    CONFIRM_PASSWORD: "Confirm password",
    UPDATE_ACCOUNT: "Update account",
    PASSWORD: "Password",
    UPDATE_PASSWORD: "Update password",
    APP_NAME: "Harmony",
    HOME_ABOUT: "About",
    HOME_CONTACT: "Contact",
    HOME_HERO_SUBTITLE:
      "Harmony is the easiest way to communicate over voice, video, and text, whether you’re part of a school club, a nightly gaming group, a worldwide art community, or just a handful of friends that want to hang out.",
    HOME_HERO_TITLE: "A new way to chat with your communities and friends.",
    HOME_LOGIN: "Login",
    HOME_LOGOUT: "Logout",
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
    SETTINGS_PROFILE: "Profile",
    SETTINGS_UPDATE_AVATAR: "Update avatar",
    SETTINGS_APPEARENCE: "Appearance",
    SETTINGS_THEME_PICK: "Pick a theme for the application.",
    SETTINGS_SYSTEM_PREFRENCE: "System preference",
    SETTINGS_THEME_LIGHT: "Light",
    SETTINGS_THEME_DARK: "Dark",
    SETTINGS_LANGUAGE: "Language",
    SETTINGS_LANGUAGE_PICK: "Select the interface language.",
    SETTINGS_ENGLISH: "English",
    SETTINGS_FRENCH: "French",
    SETTINGS_SPANISH: "Spanish",
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
    CAMERA_PERMISSION_DENIED: "Camera permission denied",
    ERROR_REGISTERING: "Error registering",
    ERROR_USERNAME_ALREADY_EXISTS: "Username already exists",
    PROFILE_UPDATE_SUCCESS: "Profile updated successfully",
    PASSWORD_UPDATE_SUCCESS: "Password updated successfully",
    SERVER_CREATE_SUCCESS: "Server created successfully",
    SERVER_JOIN_SUCCESS: "Server joined successfully",
    IS_PRIVATE_SERVER: "This is a private server",
  },
  "fr-FR": {
    USERNAME: "Nom d'utilisateur",
    EMAIL: "Email",
    NEW_PASSWORD: "Nouveau mot de passe",
    CONFIRM_PASSWORD: "Confirmer le mot de passe",
    UPDATE_ACCOUNT: "Mettre à jour le compte",
    PASSWORD: "Mot de passe",
    UPDATE_PASSWORD: "Mettre à jour le mot de passe",
    APP_NAME: "Harmony",
    HOME_ABOUT: "À propos",
    HOME_CONTACT: "Contact",
    HOME_HERO_SUBTITLE:
      "Harmony est le moyen le plus facile de communiquer par la voix, la vidéo et le texte, que vous fassiez partie d'un club scolaire, d'un groupe de jeu nocturne, d'une communauté artistique mondiale ou simplement d'un groupe d'amis qui veulent passer du temps ensemble.",
    HOME_HERO_TITLE: "Une nouvelle façon de discuter avec vos communautés et amis.",
    HOME_LOGIN: "Connexion",
    HOME_LOGOUT: "Déconnexion",
    HOME_PRIVACY_POLICY: "Politique de confidentialité",
    HOME_SIGNUP: "S'inscrire",
    LOGIN_CREATE_ACCOUNT: "S'inscrire",
    LOGIN_EMAIL_LABEL: "Votre email",
    LOGIN_EMAIL_PLACEHOLDER: "nom@entreprise.com",
    LOGIN_FORGOT_PASSWORD: "Mot de passe oublié ?",
    LOGIN_NO_ACCOUNT: "Vous n'avez pas encore de compte ?",
    LOGIN_PASSWORD_LABEL: "Mot de passe",
    LOGIN_PASSWORD_PLACEHOLDER: "••••••••",
    LOGIN_REMEMBER_ME: "Se souvenir de moi",
    LOGIN_SUBMIT: "Se connecter",
    LOGIN_TITLE: "Connectez-vous à votre compte",
    SIGNUP_TITLE: "Créer un compte",
    SIGNUP_EMAIL_LABEL: "Votre email",
    SIGNUP_EMAIL_PLACEHOLDER: "nom@entreprise.com",
    SIGNUP_USERNAME_LABEL: "Votre nom d'utilisateur",
    SIGNUP_USERNAME_PLACEHOLDER: "John_Doe",
    SIGNUP_PASSWORD_LABEL: "Mot de passe",
    SIGNUP_PASSWORD_PLACEHOLDER: "••••••••",
    SIGNUP_CONFIRM_PASSWORD_LABEL: "Confirmer le mot de passe",
    SIGNUP_TOS: "J'accepte les ",
    SIGNUP_TOS_LINK: "Termes et conditions",
    SIGNUP_SUBMIT: "Créer un compte",
    SIGNUP_ALREADY_HAVE_ACCOUNT: "Vous avez déjà un compte ?",
    SIGNUP_LOGIN: "Connectez-vous ici",
    SETTINGS_PROFILE: "Profil",
    SETTINGS_UPDATE_AVATAR: "Mettre à jour l'avatar",
    SETTINGS_APPEARENCE: "Apparence",
    SETTINGS_THEME_PICK: "Choisissez un thème pour l'application.",
    SETTINGS_SYSTEM_PREFRENCE: "Préférence du système",
    SETTINGS_THEME_LIGHT: "Clair",
    SETTINGS_THEME_DARK: "Sombre",
    SETTINGS_LANGUAGE: "Langue",
    SETTINGS_LANGUAGE_PICK: "Sélectionnez la langue de l'interface.",
    SETTINGS_ENGLISH: "Anglais",
    SETTINGS_FRENCH: "Français",
    SETTINGS_SPANISH: "Espagnol",
    EMPTY: "",
    SMILEYS_AND_EMOTION: "Émoticônes et émotions",
    PEOPLE_AND_BODY: "Personnes et corps",
    ANIMALS_AND_NATURE: "Animaux et nature",
    FOOD_AND_DRINK: "Nourriture et boisson",
    TRAVEL_AND_PLACES: "Voyages et lieux",
    ACTIVITIES: "Activités",
    OBJECTS: "Objets",
    SYMBOLS: "Symboles",
    FLAGS: "Drapeaux",
    EMOJI_ALL: "Tous",
    CAMERA_PERMISSION_DENIED: "Autorisation de la caméra refusée",
    ERROR_REGISTERING: "Erreur lors de l'inscription",
    ERROR_USERNAME_ALREADY_EXISTS: "Le nom d'utilisateur existe déjà",
    PROFILE_UPDATE_SUCCESS: "Profil mis à jour avec succès",
    PASSWORD_UPDATE_SUCCESS: "Mot de passe mis à jour avec succès",
    SERVER_CREATE_SUCCESS: "Serveur créé avec succès",
    SERVER_JOIN_SUCCESS: "Rejoindre le serveur avec succès",
    IS_PRIVATE_SERVER: "Ceci est un serveur privé",
  },
  "es-ES": {
    USERNAME: "Nombre de usuario",
    EMAIL: "Email",
    NEW_PASSWORD: "Nueva contraseña",
    CONFIRM_PASSWORD: "Confirmar contraseña",
    UPDATE_ACCOUNT: "Actualizar cuenta",
    PASSWORD: "Contraseña",
    UPDATE_PASSWORD: "Actualizar contraseña",
    APP_NAME: "Harmony",
    HOME_ABOUT: "Acerca de",
    HOME_CONTACT: "Contacto",
    HOME_HERO_SUBTITLE:
      "Harmony es la forma más fácil de comunicarse mediante voz, video y texto, ya sea que formes parte de un club escolar, un grupo de juegos nocturno, una comunidad de arte mundial o simplemente un grupo de amigos que quiere pasar tiempo juntos.",
    HOME_HERO_TITLE: "Una nueva forma de chatear con tus comunidades y amigos.",
    HOME_LOGIN: "Iniciar sesión",
    HOME_LOGOUT: "Cerrar sesión",
    HOME_PRIVACY_POLICY: "Política de privacidad",
    HOME_SIGNUP: "Registrarse",
    LOGIN_CREATE_ACCOUNT: "Registrarse",
    LOGIN_EMAIL_LABEL: "Tu email",
    LOGIN_EMAIL_PLACEHOLDER: "nombre@empresa.com",
    LOGIN_FORGOT_PASSWORD: "¿Olvidaste tu contraseña?",
    LOGIN_NO_ACCOUNT: "¿Todavía no tienes una cuenta?",
    LOGIN_PASSWORD_LABEL: "Contraseña",
    LOGIN_PASSWORD_PLACEHOLDER: "••••••••",
    LOGIN_REMEMBER_ME: "Recordarme",
    LOGIN_SUBMIT: "Iniciar sesión",
    LOGIN_TITLE: "Inicia sesión en tu cuenta",
    SIGNUP_TITLE: "Crear una cuenta",
    SIGNUP_EMAIL_LABEL: "Tu email",
    SIGNUP_EMAIL_PLACEHOLDER: "nombre@empresa.com",
    SIGNUP_USERNAME_LABEL: "Tu nombre de usuario",
    SIGNUP_USERNAME_PLACEHOLDER: "John_Doe",
    SIGNUP_PASSWORD_LABEL: "Contraseña",
    SIGNUP_PASSWORD_PLACEHOLDER: "••••••••",
    SIGNUP_CONFIRM_PASSWORD_LABEL: "Confirmar contraseña",
    SIGNUP_TOS: "Acepto los ",
    SIGNUP_TOS_LINK: "Términos y Condiciones",
    SIGNUP_SUBMIT: "Crear una cuenta",
    SIGNUP_ALREADY_HAVE_ACCOUNT: "¿Ya tienes una cuenta?",
    SIGNUP_LOGIN: "Inicia sesión aquí",
    SETTINGS_PROFILE: "Perfil",
    SETTINGS_UPDATE_AVATAR: "Actualizar avatar",
    SETTINGS_APPEARENCE: "Apariencia",
    SETTINGS_THEME_PICK: "Elige un tema para la aplicación.",
    SETTINGS_SYSTEM_PREFRENCE: "Preferencia del sistema",
    SETTINGS_THEME_LIGHT: "Claro",
    SETTINGS_THEME_DARK: "Oscuro",
    SETTINGS_LANGUAGE: "Idioma",
    SETTINGS_LANGUAGE_PICK: "Selecciona el idioma de la interfaz.",
    SETTINGS_ENGLISH: "Inglés",
    SETTINGS_FRENCH: "Francés",
    SETTINGS_SPANISH: "Español",
    EMPTY: "",
    SMILEYS_AND_EMOTION: "Emoticonos y Emoción",
    PEOPLE_AND_BODY: "Personas y Cuerpo",
    ANIMALS_AND_NATURE: "Animales y Naturaleza",
    FOOD_AND_DRINK: "Comida y Bebida",
    TRAVEL_AND_PLACES: "Viajes y Lugares",
    ACTIVITIES: "Actividades",
    OBJECTS: "Objetos",
    SYMBOLS: "Símbolos",
    FLAGS: "Banderas",
    EMOJI_ALL: "Todos",
    CAMERA_PERMISSION_DENIED: "Permiso de cámara denegado",
    ERROR_REGISTERING: "Error al registrar",
    ERROR_USERNAME_ALREADY_EXISTS: "El nombre de usuario ya existe",
    PROFILE_UPDATE_SUCCESS: "Perfil actualizado correctamente",
    PASSWORD_UPDATE_SUCCESS: "Contraseña actualizada correctamente",
    SERVER_CREATE_SUCCESS: "Servidor creado correctamente",
    SERVER_JOIN_SUCCESS: "Unido al servidor correctamente",
    IS_PRIVATE_SERVER: "Este es un servidor privado",
  },
};
