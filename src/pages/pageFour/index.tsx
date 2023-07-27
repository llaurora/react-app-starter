import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const PageFour = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>PageFour</h1>
            <hr />
            <Button
                onClick={() => {
                    navigate("/pagefour/detail");
                }}
            >
                navigate to detail
            </Button>
        </>
    );
};

export default PageFour;
