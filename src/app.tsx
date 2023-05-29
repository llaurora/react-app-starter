import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { ROOT_URL, LOGIN_URL } from "@/constants";
import RootRouteError from "@/components/rootRouteError";
import Loading from "@/components/loading";
import AuthorizedLogin from "@/components/authorizedLogin";

const Layout = lazy(() => import("@/layout"));
const Login = lazy(() => import("@/modules/login"));

const App = () => {
    return (
        <BrowserRouter>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    token: {
                        colorPrimary: "#f73352",
                        borderRadius: 4,
                    },
                }}
            >
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route
                            path={`${ROOT_URL}*`}
                            errorElement={<RootRouteError />}
                            element={
                                <AuthorizedLogin>
                                    {(userInfo: API.UserInfo) => <Layout userInfo={userInfo} />}
                                </AuthorizedLogin>
                            }
                        />
                        <Route path={LOGIN_URL} element={<Login />} />
                    </Routes>
                </Suspense>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
