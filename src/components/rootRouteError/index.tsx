import { useRouteError } from "react-router-dom";
import styles from "./index.scss";

const RootRouteError = () => {
    const error: any = useRouteError();
    return (
        <ul className={styles.rootRouteError}>
            <li className={styles.title}>Oops!</li>
            <li className={styles.tips}>Sorry, an unexpected error has occurred.</li>
            <li className="light-color">
                <i>{error.statusText || error.message}</i>
            </li>
        </ul>
    );
};

export default RootRouteError;
