import { Outlet } from "react-router-dom";

const Example = () => {
    return (
        <div>
            <h1>Example</h1>
            <hr />
            <Outlet />
        </div>
    );
};

export default Example;
