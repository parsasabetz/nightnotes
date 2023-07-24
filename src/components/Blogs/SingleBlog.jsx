import styles from "./blog.module.scss";
import { Link } from "react-router-dom";

import formatDate from "../../services/formatDate";



function BlogPost({ image, title, author, date, postSlug }) {
    return (
        <Link className={styles.blog_post} to={`blogs/${postSlug}`} >

            <div className={styles.blog_container}>

                <img src={image} alt="Blog Post" className={styles.blog_img} />

                <h2 className={styles.blog_title}>
                    <span id={styles.blog_title_span_title}>
                        {title}
                    </span>
                    <span id={styles.blog_title_span_author}>
                        {author}
                    </span>
                    <span id={styles.blog_title_span_date}>
                        {formatDate(date)}
                    </span> 
                </h2>

            </div>

        </Link>
    );
}

export default BlogPost;