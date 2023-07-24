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
            }}>Couldn't find the page you're looking for, sorry!</h3>
        </div>
    )
}

export default NotFoundPage