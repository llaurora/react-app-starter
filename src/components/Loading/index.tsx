import React, { memo } from "react";
import classnames from "classnames";
import loadingSrc from "@/assets/images/loading.gif";
import styles from "./index.scss";

interface LoadingProps {
    scope?: string;
}

function Loading({ scope = "local" }: LoadingProps) {
    return (
        <div
            className={classnames(styles.loadingWrap, {
                [styles.globalLoading]: scope === "global",
                [styles.localLoading]: scope === "local",
            })}
        >
            <img src={loadingSrc} alt="加载中..." />
        </div>
    );
}

export default memo(Loading);
