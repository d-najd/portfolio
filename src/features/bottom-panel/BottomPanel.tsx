import styles from "./BottomPanel.module.scss"
import commonStyles from "../../components/common/commonStyles.module.scss"

export const BottomPanel = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.bottomBar}>
					<div className={commonStyles.verticalCenter}>
						<button className={commonStyles.button}>
							<img className={styles.widowsImage} src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Logo_%281992-2001%29.svg" alt={"Windows 95 logo"}/>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
