import React from 'react'
import AudioUploader from './components/AudioUploader'
import styles from './styles/App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h1 className={styles.title}>Call Feedback </h1>
        <p>Upload a .mp3 or .wav call recording and get feedback.</p>
        <AudioUploader />
      </div>
      
    </div>
    
  )
}
