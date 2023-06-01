import { toast } from "react-toastify";
import {
  Button,
  SelectInput,
  TextArea,
  TextInput,
} from "../../../Components/common";
import { useContext, useEffect, useState } from "react";
import { query } from "../../../utils";
import { NotificationTemplateSelect } from "../../../classes";
import { EnumsContext } from "../../../context";
import Swal from "sweetalert2";

const Actions = () => {
  const [updated, setUpdated] = useState([]);
  const [notificationTemplateOptions, setNotificationTemplateOptions] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: {
              NotificationTemplateCollection: { NotificationsTemplates },
            },
          },
        } = await query("/api/dashboard/notifications/templates/");
        const notifications = NotificationsTemplates.map(
          (notification) => new NotificationTemplateSelect(notification)
        );
        setNotificationTemplateOptions(notifications);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    fetchData();
  }, []);

  const {
    enums: { NotificationFilter, NotificationType, NotificationTargetType },
  } = useContext(EnumsContext);

  const [filterOptions, setFilterOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [targetTypeOptions, setTargetTypeOptions] = useState([]);

  useEffect(() => {
    setFilterOptions(
      Object.keys(NotificationFilter).map((item) => {
        return { label: item, value: NotificationFilter[item] };
      })
    );
    setTypeOptions(
      Object.keys(NotificationType).map((item) => {
        return { label: item, value: NotificationType[item] };
      })
    );
    setTargetTypeOptions(
      Object.keys(NotificationTargetType).map((item) => {
        return { label: item, value: NotificationTargetType[item] };
      })
    );
  }, [NotificationFilter, NotificationTargetType, NotificationType]);

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdated({ ...updated, [name]: value });
  };

  const onClick = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData();
      form.append("_method", "post");
      for (const name in updated) {
        form.append(name, updated[name]);
      }
      await query(
        "/api/dashboard/notifications/history/send_notification",
        "post",
        form,
        "multipart/form-data"
      );
      Swal.fire("Action added successfully!", "", "success");
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(<span>{message.join("\r\n")}</span>);
    }
  };

  return (
    <form onSubmit={onClick}>
      <div className="grid grid-cols-9 gap-5">
        <h1 className="col-span-2 text-placeholder-color">Send Notification</h1>
        <div className="col-start-1 col-span-3">
          <SelectInput
            name={"notification_template_id"}
            label={"Notification template"}
            options={notificationTemplateOptions}
            onChange={(template) => {
              setUpdated({
                ...updated,
                notification_template_id: template.value,
              });
            }}
          />
        </div>
        <div className="col-span-3">
          <SelectInput
            name={"filter"}
            label={"Filter"}
            options={filterOptions}
            onChange={(filter) => {
              setUpdated({
                ...updated,
                filter: filter.value,
              });
            }}
          />
        </div>
        <div className="col-span-3">
          <SelectInput
            name={"type"}
            label={"Type"}
            options={typeOptions}
            onChange={(type) => {
              setUpdated({
                ...updated,
                type: type.value,
              });
            }}
          />
        </div>
        <div className="col-span-3">
          <SelectInput
            name={"target_type"}
            label={"Target type"}
            options={targetTypeOptions}
            onChange={(target_type) => {
              setUpdated({
                ...updated,
                target_type: target_type.value,
              });
            }}
          />
        </div>
        <div className="col-start-1 col-span-6">
          <TextInput
            name={"title"}
            label={"Title"}
            placeholder={"Enter title"}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-6">
          <TextArea
            name={"message"}
            label={"Message"}
            placeholder={"Enter message"}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-start-1">
          <Button
            type={"submit"}
            label={"Apply"}
            padding={"px-5 py-3"}
            bgColor={"bg-[#DF8D6233]"}
            textColor={"text-primary-color"}
            hoverBgColor={"hover:bg-primary-color hover:border-primary-color"}
            hoverTextColor={"hover:text-white"}
          />
        </div>
      </div>
    </form>
  );
};
export default Actions;
