import React from 'react'
import styles from '../loading.module.css'

const LoadingBar = () => {
  return (
    <div className={styles.loaderContainer}>
        <div  className={styles.loader}></div>
    </div>
  )
}

export default LoadingBar