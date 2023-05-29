import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "@/assets/styles/reset.scss";
import "@/assets/styles/global.scss";
import App from "./app";

dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
