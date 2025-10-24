import React from 'react'
import styles from '../styles/FeedbackResult.module.css'

const PARAMS = [
{ key: "greeting", name: "Greeting", weight: 5, desc: "Call opening within 5 seconds", inputType: "PASS_FAIL" },
{ key: "collectionUrgency", name: "Collection Urgency", weight: 15, desc: "Create urgency, cross-questioning", inputType: "SCORE" },
{ key: "rebuttalCustomerHandling", name: "Rebuttal Handling", weight: 15, desc: "Address penalties, objections", inputType: "SCORE" },
{ key: "callEtiquette", name: "Call Etiquette", weight: 15, desc: "Tone, empathy, clear speech", inputType: "SCORE" },
{ key: "callDisclaimer", name: "Call Disclaimer", weight: 5, desc: "Take permission before ending", inputType: "PASS_FAIL" },
{ key: "correctDisposition", name: "Correct Disposition", weight: 10, desc: "Use correct category with remark", inputType: "PASS_FAIL" },
{ key: "callClosing", name: "Call Closing", weight: 5, desc: "Thank the customer properly", inputType: "PASS_FAIL" },
{ key: "fatalIdentification", name: "Identification", weight: 5, desc: "Missing agent/customer info", inputType: "PASS_FAIL" },
{ key: "fatalTapeDiscloser", name: "Tape Disclosure", weight: 10, desc: "Inform customer about recording", inputType: "PASS_FAIL" },
{ key: "fatalToneLanguage", name: "Tone & Language", weight: 15, desc: "No abusive or threatening speech", inputType: "PASS_FAIL" }
]

export default function FeedbackResult({ feedback }) {
  const { scores, overallFeedback, observation } = feedback

  const totalScore = Object.values(scores || {}).reduce((s, v) => s + (v || 0), 0)
  const maxScore = PARAMS.reduce((s, p) => s + p.weight, 0)

  return (
    <div className={styles.resultCard}>
      <h3>Results</h3>
      <div className={styles.scoreBar}>
        <div className={styles.progress} style={{ width: `${(totalScore / maxScore) * 100}%` }} />
      </div>
      <div className={styles.totals}>Score: {totalScore} / {maxScore}</div>

      <div className={styles.paramGrid}>
        {PARAMS.map((p) => (
          <div className={styles.param} key={p.key}>
            <div className={styles.paramName}>{p.name}</div>
            <div className={styles.paramScore}>{scores?.[p.key] ?? 0} / {p.weight}</div>
          </div>
        ))}
      </div>

      <div className={styles.textFields}>
        <div>
          <strong>Overall Feedback</strong>
          <p>{overallFeedback}</p>
        </div>
        <div>
          <strong>Observation</strong>
          <p>{observation}</p>
        </div>
      </div>
    </div>
  )
}
