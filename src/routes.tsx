import { lazy, ReactNode } from "react";
import { HomeOutlined, LineChartOutlined, PieChartOutlined, GlobalOutlined } from "@ant-design/icons";

export interface RouteConfigPure {
    path: string;
    name: string;
    index?: boolean;
    element?: ReactNode | null;
    caseSensitive?: boolean;
    authority?: string[];
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    icon?: ReactNode;
    target?: string;
}

export interface RouteConfig extends RouteConfigPure {
    children?: RouteConfig[];
}

const Home = lazy(() => import("@/pages/Home"));
const NoAuthorized = lazy(() => import("@/pages/NoAuthorized"));
const NoMatch = lazy(() => import("@/pages/NoMatch"));
const Example = lazy(() => import("@/pages/Example"));
const Child1 = lazy(() => import("@/pages/Example/Child1"));
const Child2 = lazy(() => import("@/pages/Example/Child2"));
const PageOne = lazy(() => import("@/pages/PageOne"));
const Welcome = lazy(() => import("@/pages/Welcome"));

export const routes: RouteConfig[] = [
    {
        path: "/",
        name: "Home",
        icon: <HomeOutlined />,
        authority: ["home"],
        element: <Home />,
    },
    {
        path: "noauthorized",
        name: "Noauth",
        hideInMenu: true,
        element: <NoAuthorized />,
    },
    {
        path: "example",
        name: "Example",
        icon: <LineChartOutlined />,
        element: <Example />,
        children: [
            {
                path: "child1",
                name: "Child 1",
                element: <Child1 />,
            },
            {
                path: "child2",
                name: "Child 2",
                element: <Child2 />,
            },
        ],
    },
    {
        path: "pageone",
        name: "Pageone",
        authority: ["pageone"],
        icon: <PieChartOutlined />,
        element: <PageOne />,
    },
    {
        path: "welcome",
        name: "Welcome",
        authority: ["welcome"], // Welcome Menu will be hidden in practical projects
        icon: <GlobalOutlined />,
        element: <Welcome />,
    },
    {
        path: "*",
        name: "NoMatch",
        hideInMenu: true,
        element: <NoMatch />,
    },
];
