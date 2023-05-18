import { useCallback, useContext, useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { LoginEmployee } from "../classes";
import {
  LoadingContext,
  PermissionsContext,
  UserInfoContext,
} from "../context";
import { query } from "../utils/query";
const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const { setUserInfo } = useContext(UserInfoContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { setPermissions } = useContext(PermissionsContext);
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: {
          success,
          data: {
            Employee: { id, name, email, avatar },
          },
        },
      } = await query("/api/dashboard/auth/info");

      const employeeLogin = new LoginEmployee({
        id,
        name,
        email,
        avatar,
        access_token: token,
      });

      const {
        data: { data },
      } = await query("/api/dashboard/auth/permissions");
      if (success && data.PermissionCodeList.length) {
        setUserInfo({ ...employeeLogin });
        setPermissions(data.PermissionCodeList);
        setLoading(false);
      }
    } catch ({ response: { data, status } }) {
      if (status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [setLoading, token, setUserInfo, setPermissions, navigate]);

  const effectRan = useRef(false);

  useEffect(() => {
    try {
      if (effectRan.current === false) {
        getUserInfo();
      }
      return () => {
        effectRan.current = true;
      };
    } catch (error) {
      console.log(error);
    }
  }, [getUserInfo]);

  return token ? (
    !loading && <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
