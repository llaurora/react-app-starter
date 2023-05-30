import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const PageTwo = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>PageTwo</h1>
            <hr />
            <Button
                onClick={() => {
                    navigate("/example/pagetwo/detail");
                }}
            >
                navigate to detail
            </Button>
        </>
    );
};

export default PageTwo;
