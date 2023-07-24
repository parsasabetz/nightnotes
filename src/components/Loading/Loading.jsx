import styles from "./loading.module.scss";


const Loading = () => {
    return (
        <div className={styles.loading_container}>
            <h3 className={styles.loading}>
                <span>Loading</span><span className={styles.dots}>...</span>{" "}
            </h3>
        </div>
    );
};

export default Loading;