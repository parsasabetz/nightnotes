import { useSetTitle } from "../hooks/useRefreshTitle";


import styles from "./styles/about.module.scss";



function AboutPage() {
    useSetTitle("about")


    return (
        <div className={styles.container}>

            <h2 className={styles.title}>about</h2>

            <p className={styles.info}>
                there isn't much to say about here. it's just a share of thoughts, that I like to do at nights. oh plus, you can comment, & i can reply when you leave your email. create!
            </p>

        </div>
    )
}

export default AboutPage;