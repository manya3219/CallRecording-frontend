import React from 'react'
import styles from '../styles/AudioUploader.module.css'

export default function AudioPlayer({ src }) {
  return (
    <div className={styles.player}>
      <audio controls src={src} />
    </div>
  )
}
