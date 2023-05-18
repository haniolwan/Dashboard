import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: "en",
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          avatar: {
            name: "Khalil Darwish",
            tab1: "My Profile",
            tab2: "Settings",
            tab3: "Logout",
          },
          sidebar: {
            tab1: 'Dashboard',
            tab2: 'Layouts',
            tab3: 'Tables',
            tab4: 'Employees',
            tab5: 'Countries',
            tab6: 'Cities',
            tab7: 'Settings',
            tab8: "Notifications",
            tab9: "Plans"
          },
          table: {
            title: "Users",
            cols: {
              'username': "Username",
              'email': "Username",
              'reg_date': "Register Date",
              'status': "Status",
              'actions': "Actions",
            }
          }
        }
      },
      ar: {
        translation: {
          sidebar: {
            tab1: 'داشبورد',
            tab2: 'لايوات',
            tab3: 'تيبليز',
            tab4: 'ايمبليوييز',
            tab5: 'كانتريز',
            tab6: 'سيتيز',
            tab7: 'سيتينجزز',
            tab8: 'نيتيفيكيشنز',
            tab9: 'بلانز',
          }
        }
      }
    }
  });
