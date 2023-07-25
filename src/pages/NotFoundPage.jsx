import { Link } from "react-router-dom";
import { useSetTitle } from "../hooks/useRefreshTitle";


function NotFoundPage() {
    useSetTitle("Not found");

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "90svh"
        }}>
            <h1>404</h1>
                <br />
            <h3 style={{
                    fontWeight: "400"
                }}
            >Couldn't find the page you're looking for, sorry!</h3>
                <br />
            <Link style={{
                    fontWeight: "300",
                    color: "inherit",
                    fontSize: "1rem"
                }}
                to="/"
            >go back to home</Link>
        </div>
    )
}

export default NotFoundPage