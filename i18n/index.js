import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    ukr: {
        translation: {
            "user.first_name": "Ім'я",
            "user.last_name": "Прізвище",
            "Sign Out": "Вийти",
            Title: "Загаловок",
            Body: "Поле",
            Save: "Зберегти",
            Comments: "Коментарі",
            Reply: "Відповісти",
            Delete: "Видалити",
            "Please enter a valid title.":
                "Будь ласка введіть коректний заговолок",
            "Please enter a valid body.": "Будь ласка введіть коректне поле",
            "Blog successfully deleted!!!": "Блог успішно видалено!!!",
            "Blog successfully changed!!!": "Блог успішно змінено!!!",
            "Please enter a valid password.":
                "Будь ласка введіть коректний пароль",
            "Please enter a valid username.":
                "Будь ласка введіть коректний нікнейм",
            Username: "Нікнейм",
            Email: "Адреса",
            Password: "Пароль",
            Login: "Вхід",
            Register: "Реєстрація",
            Registration: "Реєстрація",
            Error: "Помилка",
            "An Error Occured": "Виникла помилка",
            "passwords don't match.": "Паролі не збігаються",
            "Confirm password": "Підтверджений пароль",
            Okay: "Добре",
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: I18nManager.isRTL ? "ukr" : "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
