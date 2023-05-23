import type { FC } from "react";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import zhCN from "antd/locale/zh_CN";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthorizedLogin } from "@/components/Authorized";
import "@/assets/styles/reset.scss";
import "@/assets/styles/global.scss";

dayjs.locale("zh-cn");

const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));

const App: FC = () => {
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: "#f73352",
                    borderRadius: 4,
                },
            }}
        >
            <Suspense fallback={<Loading scope="global" />}>
                <ErrorBoundary>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<UserLayout />} />
                            <Route
                                path="/*"
                                element={
                                    <AuthorizedLogin>
                                        <BasicLayout />
                                    </AuthorizedLogin>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </ErrorBoundary>
            </Suspense>
        </ConfigProvider>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
