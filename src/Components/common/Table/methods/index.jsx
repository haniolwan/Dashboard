import Swal from "sweetalert2";
import { query } from "../../../../utils";
import { User } from "../../../../classes/User";
import {
  City,
  CityTranslation,
  Country,
  CountryTranslation,
  Currency,
  Employee,
  Locale,
  NotificationTemplate,
  NotificationTemplateTranslation,
  NotificationsHistory,
  Order,
  Page,
  Plan,
  PlanTranslation,
  Provider,
  Role,
  Service,
  Slider,
  SliderTranslation,
  Subscription,
} from "../../../../classes";
import { PageTranslation } from "../../../../classes/Page";
import { CurrencyTranslation } from "../../../../classes/Currency";
import { ServiceTranslation } from "../../../../classes/Service";
import { toast } from "react-toastify";

const insertNewRow = async (data, path) => {
  try {
    const form = new FormData();
    form.append("_method", "post");
    for (const name in data) {
      form.append(name, data[name]);
    }
    await query(`/api/dashboard/${path}`, "post", form, "multipart/form-data");
    Swal.fire("Row Added successfully!", "", "success");
  } catch ({
    response: {
      data: { message },
    },
  }) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Something went wrong! ${message.join("\r\n")}`,
    });
  }
};

const updateNewRow = async (updatedData, path, rowId) => {
  try {
    const form = new FormData();
    form.append("_method", "put");
    for (const name in updatedData) {
      form.append(name, updatedData[name]);
    }
    await query(
      `/api/dashboard/${path}/${rowId}`,
      "post",
      form,
      "multipart/form-data"
    );
    Swal.fire("Row updated successfully!", "", "success");
  } catch ({
    response: {
      data: { message },
    },
  }) {
    toast.error(<span>{message.join("\r\n")}</span>);
  }
};

const updateTranslation = async (path, rowId, locale_id, updatedData) => {
  try {
    const form = new FormData();
    form.append("_method", "put");
    form.append("locale_id", locale_id);
    for (const name in updatedData) {
      form.append(name, updatedData[name]);
    }
    await query(
      `/api/dashboard/${path}/${rowId}/translate?locale_id=${locale_id}`,
      "post",
      form,
      "multipart/form-data"
    );
    Swal.fire("Row updated successfully!", "", "success");
  } catch ({
    response: {
      data: { message },
    },
  }) {
    toast.error(<span>{message.join("\r\n")}</span>);
  }
};

const getDataCollection = (data, path) => {
  let collection = [];
  let pagination = [];
  switch (path) {
    case "employees":
      collection = data.EmployeesCollection.Employees.map((ele) => {
        return new Employee(ele);
      });
      pagination = data.EmployeesCollection.pagination;
      break;
    case "countries":
      collection = data.CountryCollection.Countries.map((ele) => {
        return new Country(ele);
      });
      pagination = data.CountryCollection.pagination;
      break;
    case "cities":
      collection = data.CityCollection.Cities.map((ele) => {
        return new City(ele);
      });
      pagination = data.CityCollection.pagination;
      break;
    case "sliders":
      collection = data.SliderCollection.Sliders.map((ele) => {
        return new Slider(ele);
      });
      pagination = data.SliderCollection.pagination;
      break;
    case "pages":
      collection = data.PageCollection.Pages.map((ele) => {
        return new Page(ele);
      });
      pagination = data.PageCollection.pagination;
      break;
    case "locales":
      collection = data.LocaleCollection.Locales.map((ele) => {
        return new Locale(ele);
      });
      pagination = data.LocaleCollection.pagination;
      break;
    case "currencies":
      collection = data.CurrencyCollection.Currencies.map((ele) => {
        return new Currency(ele);
      });
      pagination = data.CurrencyCollection.pagination;
      break;
    case "services":
      collection = data.ServiceCollection.Services.map((ele) => {
        return new Service(ele);
      });
      pagination = data.ServiceCollection.pagination;
      break;
    case "plans":
      collection = data.PlanCollection.Plans.map((ele) => {
        return new Plan(ele);
      });
      pagination = data.PlanCollection.pagination;
      break;
    case "subscriptions":
      collection = data.SubscriptionCollection.Subscriptions.map((ele) => {
        return new Subscription(ele);
      });
      pagination = data.SubscriptionCollection.pagination;
      break;
    case "users":
      collection = data.UserFullCollection.Users.map((ele) => {
        return new User(ele);
      });
      pagination = data.UserFullCollection.pagination;
      break;
    case "orders":
      collection = data.OrderCollection.Orders.map((ele) => {
        return new Order(ele);
      });
      pagination = data.OrderCollection.pagination;
      break;
    case "providers":
      collection = data.ProviderFullCollection.Providers.map((ele) => {
        return new Provider(ele);
      });
      pagination = data.ProviderFullCollection.pagination;
      break;
    case "notifications/templates":
      collection =
        data.NotificationTemplateCollection.NotificationsTemplates.map(
          (ele) => {
            return new NotificationTemplate(ele);
          }
        );
      pagination = data.NotificationTemplateCollection.pagination;
      break;
    case "notifications/history":
      collection = data.NotificationHistoryCollection.NotificationsHistory.map(
        (ele) => {
          return new NotificationsHistory(ele);
        }
      );
      pagination = data.NotificationHistoryCollection.pagination;
      break;
    case "roles":
      collection = data.RoleCollection.Roles.map((ele) => {
        return new Role(ele);
      });
      pagination = data.RoleCollection.pagination;
      break;
    default:
      <></>;
  }
  return { collection, pagination };
};

const getDataClass = (data, path) => {
  switch (path) {
    case "employees":
      return new Employee(data.Employee);
    case "countries":
      return new Country(data.Country);
    case "cities":
      return new City(data.City);
    case "sliders":
      return new Slider(data.Slider);
    case "pages":
      return new Page(data.Page);
    case "services":
      return new Service(data.Service);
    case "currencies":
      return new Currency(data.Currency);
    case "users":
      return {
        user: new User(data?.User),
        orders: data.Orders && data.Orders.map((order) => new Order(order)),
        subscriptions:
          data.Subscriptions &&
          data.Subscriptions.map(
            (subscription) => new Subscription(subscription)
          ),
        current: data.Current,
        cancel: data.Cancel,
        complete: data.Complete,
      };
    case "plans":
      return new Plan(data.Plan);
    case "orders":
      return {
        order: new Order(data.Order),
        orderStatus: data.OrderStatus,
      };
    case "subscriptions":
      return new Subscription(data.Subscription);
    case "providers":
      return {
        provider: new Provider(data.Provider),
        services:
          data.Services && data.Services.map((service) => new Service(service)),
        subscriptions: data.Subscription,
        current: data.Current,
        failed: data.Failed,
        complete: data.Complete,
      };
    case "locales":
      return new Locale(data.Locale);
    case "notifications/templates":
      return new NotificationTemplate(data.NotificationTemplate);
    case "notifications/history":
      return new NotificationsHistory(data.NotificationHistory);
    case "roles":
      return new Role(data.Role);
    default:
      <></>;
  }
};

const getTranslationClass = (data, path) => {
  switch (path) {
    case "countries":
      return new CountryTranslation(data.CountryTranslation);
    case "sliders":
      return new SliderTranslation(data.SliderTranslation);
    case "pages":
      return new PageTranslation(data.PageTranslation);
    case "currencies":
      return new CurrencyTranslation(data.CurrencyTranslation);
    case "plans":
      return new PlanTranslation(data.PlanTranslation);
    case "cities":
      return new CityTranslation(data.CityTranslation);
    case "services":
      return new ServiceTranslation(data.ServiceTranslation);
    case "notifications/templates":
      return new NotificationTemplateTranslation(data.NotificationTemplate);
    default:
      <></>;
  }
};

export {
  insertNewRow,
  updateTranslation,
  updateNewRow,
  getDataClass,
  getDataCollection,
  getTranslationClass,
};
