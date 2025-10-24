import React from 'react'
import styles from '../styles/FeedbackResult.module.css'

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <div>Analyzing — this may take a few seconds...</div>
    </div>
  )
}
