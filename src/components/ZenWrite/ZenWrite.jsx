// mui
import { Button, Container, Grid, Typography } from "@mui/material";

// components
import PostInfo from "./PostInfo";


// hooks and functions
import ReactQuill from 'react-quill';
import { useEffect, useState, useRef } from "react";

import { deserializeHtml } from "../../services/convert";


// styles
import 'react-quill/dist/quill.snow.css';
import "./zenwrite.scss";


const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        ["link"],
        [
            {list: "ordered"},
            {list: "bullet"},
            {indent: "-1"},
            {indent: "+1"},
        ],
    ],
};


function ZenWrite() {
    const [value, setValue] = useState('');
    const [posted, setPosted] = useState(false);
    const editorRef = useRef(null);
    const [leftOver, setLeftOver] = useState(false);


    const handleEditorChange = (content, delta, source, editor) => {
        setValue(content);
        if (!posted) {
            const editorText = editorRef.current.getEditor().getText();
            if (editorText.trim() !== "") {
                localStorage.setItem("zen-write", editorText);
            } else {
                localStorage.removeItem("zen-write");
            }
        }
    }

    const convertToAST = async (htmlString) => {
        const ast = deserializeHtml(htmlString);
        const raw = {
            "children": [
                ...ast
            ]
        }
        // console.log(JSON.stringify(raw))
        return JSON.stringify(raw);
    }


    const readLeftOver = () => {
        const leftOver = localStorage.getItem("zen-write");
        if (leftOver) {
            setValue(leftOver);
            setLeftOver(true);
        }
    }


    useEffect(() => {
        readLeftOver();

        function handleBeforeUnload() {
            const editorText = editorRef.current.getEditor().getText();
            if (!posted) {
                if (editorText.trim() !== "") {
                    localStorage.setItem("zen-write", editorText);
                } else {
                    localStorage.removeItem("zen-write");
                }
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    const handleSubmitPost = () => {
        setPosted(true);
        localStorage.removeItem("zen-write");
        setLeftOver(false);
    }




    return (
        <Container maxWidth="lg">
            <Grid container mt={20} direction="row" spacing={15}>


                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={handleEditorChange}
                        placeholder="write..."
                        modules={modules}
                        ref={editorRef}
                        style={{
                            width: "100%",
                            marginBottom: "15%",
                            color: "gray",
                            stroke: "gray",
                            borderColor: "gray",
                        }}
                    />
                        {
                            leftOver && (
                                <Typography
                                    component="p"
                                    variant="h6"
                                    fontWeight={200}
                                    fontSize="small"
                                    mt={2}
                                >
                                    There has been leftovers since the last time you wrote.
                                </Typography>
                            )
                        }

                </Grid>


                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{
                        height: "100%",
                        color: "#747C95",
                    }}
                >
                    <Typography
                        component="p"
                        variant="h7"
                        fontWeight={500}
                        paddingY={3}
                    >
                        preview:
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: value,
                        }}
                        style={{
                            padding: "10% 5%",
                            border: "1px rgb(60, 60, 60) solid",
                            borderRadius: "4px",
                        }}
                    ></div>
                </Grid>


                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                >
                    <PostInfo content={convertToAST(value)} />
                </Grid>


            </Grid>
        </Container>
    );
}

export default ZenWrite