import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthorizedLogin } from "@/components/Authorized";
import "@/assets/styles/reset.scss";
import "@/assets/styles/global.scss";

const supportsHistory = "pushState" in window.history;
const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));

function App() {
    return (
        <Suspense fallback={<Loading scope="global" />}>
            <ErrorBoundary>
                <BrowserRouter forceRefresh={!supportsHistory}>
                    <Switch>
                        <Route path="/login" component={UserLayout} />
                        <AuthorizedLogin path="/" component={BasicLayout} />
                    </Switch>
                </BrowserRouter>
            </ErrorBoundary>
        </Suspense>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
