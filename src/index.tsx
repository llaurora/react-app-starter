import type { FC } from "react";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthorizedLogin } from "@/components/Authorized";
import "@/assets/styles/reset.scss";
import "@/assets/styles/global.scss";

const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));

const App: FC = () => {
    return (
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
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
