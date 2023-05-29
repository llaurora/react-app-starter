import { memo } from "react";
import classNames from "classnames";
import loadingSrc from "@/assets/images/loading.gif";
import styles from "./index.scss";

interface LoadingProperties {
    className?: string;
}

const Loading = ({ className }: LoadingProperties) => {
    return (
        <div className={classNames(styles.loading, className)}>
            <img src={loadingSrc} alt="loading..." />
        </div>
    );
};

export default memo(Loading);
