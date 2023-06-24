import { useCallback, useContext, useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { LoginEmployee } from "../classes";
import {
  EnumsContext,
  LoadingContext,
  PermissionsContext,
  UserInfoContext,
} from "../context";
import { query } from "../utils/query";
import { toast } from "react-toastify";
import { NoPermission } from "../Pages";
const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const { setUserInfo } = useContext(UserInfoContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { setPermissions } = useContext(PermissionsContext);
  const { setEnums } = useContext(EnumsContext);

  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const {
        data: {
          success,
          data: {
            Employee: { id, name, email, avatar, permissions, roles },
          },
        },
      } = await query("");

      const {
        data: {
          data: { Enums },
        },
      } = await query("");

      const employeeLogin = new LoginEmployee({
        id,
        name,
        email,
        avatar,
        access_token: token,
        permissions,
        roles,
      });

      const {
        data: { data },
      } = await query("");
      if (success && data.PermissionCodeList.length) {
        setUserInfo({ ...employeeLogin });
        setPermissions(data.PermissionCodeList);
        setEnums(Enums);
        setLoading(false);
      }
    } catch ({ response: { data, status } }) {
      if (status === 401) {
        localStorage.clear();
        // navigate("/login");
        setLoading(false);
      }
    }
  }, [setLoading, setEnums, token, setUserInfo, setPermissions, navigate]);

  const effectRan = useRef(false);

  useEffect(() => {
    try {
      if (effectRan.current === false) {
        // getUserInfo();
      }
      return () => {
        effectRan.current = true;
      };
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(<span>{message.join("\r\n")}</span>);
    }
  }, [getUserInfo]);
  const { permissions } = useContext(PermissionsContext);

  const isPermitted = () => {
    const path = location.pathname.split("/").filter((item) => item);
    if (path.length >= 2) {
      return permissions.includes(path.join("."));
    }
    return permissions.includes(path[0]);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return !loading && <Outlet />;
};

export default RequireAuth;
