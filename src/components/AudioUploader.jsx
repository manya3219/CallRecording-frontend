import React, { useState, useRef } from 'react'
import styles from '../styles/AudioUploader.module.css'
import AudioPlayer from './AudioPlayer'
import FeedbackResult from './FeedbackResult'
import Loader from './Loader'

export default function AudioUploader() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const inputRef = useRef(null)

  const onFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (!['audio/mp3', 'audio/wav', 'audio/mpeg'].includes(f.type) && !f.name.endsWith('.wav') && !f.name.endsWith('.mp3')) {
      alert('Please upload an MP3 or WAV file')
      return
    }
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
    setFeedback(null)
  }

  const onDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) onFileChange({ target: { files: [f] } })
  }

  const handleProcess = async () => {
    if (!file) return alert('Please upload an audio file first')
    setLoading(true)
    const form = new FormData()
    form.append('audio', file)

    try {
      const res = await fetch('http://localhost:3000/api/analyze-call', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setFeedback(data)
    } catch (err) {
      console.error(err)
      alert('Failed to process audio. Check server logs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        className={styles.dropzone}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current.click()}
      >
        {previewUrl ? (
          <div className={styles.fileInfo}>
            <strong>{file.name}</strong>
         <button><small>Click to change</small></button>   
          </div>
        ) : (
          <div>
            <button>Drag & drop an audio file here, or click to browse</button>
            <small>(.mp3 or .wav, max ~20MB)</small>
          </div>
        )}
        <input ref={inputRef} type="file" accept="audio/*" onChange={onFileChange} style={{ display: 'none' }} />
      </div>

      {previewUrl && <AudioPlayer src={previewUrl} />}

      <div className={styles.actions}>
        <button className={styles.processBtn} onClick={handleProcess} disabled={loading}>
          {loading ? 'Processing...' : 'Process'}
        </button>
      </div>

      {loading && <Loader />}
      {feedback && <FeedbackResult feedback={feedback} />}
    </div>
  )
}
