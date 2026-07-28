'use client'

import { Calculator, Check, RotateCcw, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'

type CareerOption = { name: string; slug: string; summary: string }
type StateOption = { jurisdiction: string; path: string; title: string }

function MoneyInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="tool-field"><span>{label}</span><div><b>$</b><input type="number" min="0" step="50" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value)))} /></div></label>
}

function CostPlanner() {
  const [tuition, setTuition] = useState(6500)
  const [fees, setFees] = useState(850)
  const [tools, setTools] = useState(600)
  const [travel, setTravel] = useState(900)
  const [lostIncome, setLostIncome] = useState(2400)
  const total = tuition + fees + tools + travel + lostIncome
  return <div className="workbench-grid"><div className="tool-controls"><MoneyInput label="Tuition" value={tuition} onChange={setTuition}/><MoneyInput label="Fees and exams" value={fees} onChange={setFees}/><MoneyInput label="Tools and supplies" value={tools} onChange={setTools}/><MoneyInput label="Travel and care" value={travel} onChange={setTravel}/><MoneyInput label="Reduced work income" value={lostIncome} onChange={setLostIncome}/></div><div className="tool-results" aria-live="polite"><p className="eyebrow">Estimated route cost</p><strong className="result-number">${total.toLocaleString()}</strong><div className="cost-bars">{[['Tuition',tuition],['Fees',fees],['Tools',tools],['Travel',travel],['Income',lostIncome]].map(([label,value]) => <div key={label}><span>{label}</span><i style={{width:`${Math.max(3,(Number(value)/total)*100)}%`}}/></div>)}</div><p>This is a planning estimate, not a return-on-investment promise. Verify every charge with the provider.</p></div></div>
}

function CareerCompare({ careers }: { careers: CareerOption[] }) {
  const [left, setLeft] = useState(careers[0]?.slug || '')
  const [right, setRight] = useState(careers[12]?.slug || careers[1]?.slug || '')
  const leftItem = careers.find((item) => item.slug === left)
  const rightItem = careers.find((item) => item.slug === right)
  return <div className="compare-workbench"><div className="compare-selects"><label>First career<select value={left} onChange={(event) => setLeft(event.target.value)}>{careers.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label><span>versus</span><label>Second career<select value={right} onChange={(event) => setRight(event.target.value)}>{careers.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label></div><div className="compare-output"><article><p className="eyebrow">Path A</p><h3>{leftItem?.name}</h3><p>{leftItem?.summary}</p></article><article><p className="eyebrow">Path B</p><h3>{rightItem?.name}</h3><p>{rightItem?.summary}</p></article></div><p className="tool-caveat">Compare work setting, legal entry requirements, schedule, physical demands, and total cost before comparing salary.</p></div>
}

const checks = [
  ['Regulator or accreditor verified on its own site', 18], ['Total cost supplied in writing', 16],
  ['Credential exam eligibility confirmed', 16], ['Refund terms supplied before payment', 14],
  ['Clinical, lab, or apprenticeship placement explained', 14], ['Outcome denominator and timeframe disclosed', 12],
  ['No guaranteed job or salary language', 10],
] as const

function ProgramChecklist() {
  const [selected, setSelected] = useState<string[]>([])
  const score = checks.reduce((sum, [label, points]) => sum + (selected.includes(label) ? points : 0), 0)
  function toggle(label: string) { setSelected((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]) }
  return <div className="checklist-layout"><div>{checks.map(([label, points]) => <label className="check-row" key={label}><input type="checkbox" checked={selected.includes(label)} onChange={() => toggle(label)}/><span><strong>{label}</strong><small>{points} evidence points</small></span></label>)}</div><div className="score-panel"><ShieldCheck/><p className="eyebrow">Evidence score</p><strong className="result-number">{score}/100</strong><p>{score >= 80 ? 'The written evidence is reasonably complete. Recheck any legal requirement directly.' : score >= 50 ? 'Important evidence is still missing. Do not rely on verbal assurances.' : 'Pause before paying. Ask for the missing evidence in writing.'}</p><button type="button" onClick={() => setSelected([])}><RotateCcw size={16}/> Reset</button></div></div>
}

function StateNavigator({ states }: { states: StateOption[] }) {
  const [selected, setSelected] = useState(states[0]?.path || '')
  const item = useMemo(() => states.find((state) => state.path === selected), [selected, states])
  return <div className="navigator-layout"><label className="tool-field">Verified state-career pair<select value={selected} onChange={(event) => setSelected(event.target.value)}>{states.map((state) => <option value={state.path} key={state.path}>{state.title}</option>)}</select></label><div className="navigator-result"><Check/><span><small>Coverage</small><strong>{item?.jurisdiction}</strong><p>This navigator links only to manually scoped pages. Absence from the list does not mean a state has no requirements.</p><a href={item?.path}>Open the verified requirement page</a></span></div></div>
}

export function ToolWorkbench({ slug, careers, states }: { slug: string; careers: CareerOption[]; states: StateOption[] }) {
  return <section className="tool-workbench"><div className="tool-workbench-title"><Calculator/><span><p className="eyebrow">Interactive worksheet</p><h2>Use your numbers. Keep the assumptions visible.</h2></span></div>{slug === 'training-cost-planner' && <CostPlanner/>}{slug === 'career-comparison-worksheet' && <CareerCompare careers={careers}/>} {slug === 'program-evaluation-checklist' && <ProgramChecklist/>}{slug === 'state-requirement-navigator' && <StateNavigator states={states}/>}</section>
}
