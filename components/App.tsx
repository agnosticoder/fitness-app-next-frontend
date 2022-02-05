import styles from '../styles/modules/Hello.module.scss';

const App = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.test}>Content color has bee applied using css modules but using scss</h2>
        </div>
    );
};

export default App;
