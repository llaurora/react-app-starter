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
                    navigate("/example/pagetwo/child");
                }}
            >
                navigate to subpage
            </Button>
        </>
    );
};

export default PageTwo;
