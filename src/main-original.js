
import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="#" aria-label="SiteSidekick home">
        <span class="brand-mark">S</span>
        <span>SiteSidekick</span>
      </a>

      <button class="new-issue" id="new-issue">+ New troubleshooting session</button>

      <p class="nav-label">WORKSPACE</p>
      <a class="nav-link active" href="#home">Overview</a>
      <a class="nav-link" href="#history" id="history-link">Issue history</a>

      <div class="sidebar-bottom">
        <div class="help-card">
          <strong>Website help, without the guesswork.</strong>
          <p>Understand the issue, explore likely causes, and know what to do next.</p>
        </div>
        <div class="profile">
          <div class="avatar">TB</div>
          <div><strong>Your workspace</strong><small>Starter preview</small></div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <span class="breadcrumb">Workspace / <strong>Overview</strong></span>
        <span class="status"><span></span> Preview mode</span>
      </header>

      <section class="welcome">
        <p class="eyebrow">YOUR WEBSITE SUPPORT COMPANION</p>
        <h1>Let's get your website<br class="desktop-break"> working better.</h1>
        <p class="intro">Describe what's going wrong. We'll help you narrow down the possible causes and build a clear plan to address it.</p>
      </section>

      <section class="issue-panel" id="issue-panel">
        <label for="issue-input">What would you like help with?</label>
        <textarea id="issue-input" rows="4" placeholder="For example: My WordPress website looks broken on mobile, but looks fine on desktop..."></textarea>
        <div class="input-footer">
          <span>Share what you see and when it started.</span>
          <button id="start-button">Start troubleshooting <span aria-hidden="true">→</span></button>
        </div>
        <p class="form-error" id="form-error" role="alert"></p>
      </section>

      <section class="suggestions">
        <h2>Common starting points</h2>
        <div class="suggestion-grid">
          <button class="suggestion" data-issue="My WordPress website looks wrong on mobile, but looks fine on desktop.">
            <span class="suggestion-icon">↔</span>
            <span><strong>Mobile layout problems</strong><small>Spacing, text, images or sections</small></span>
            <span class="suggestion-arrow">→</span>
          </button>
          <button class="suggestion" data-issue="My website is loading slowly and I'm not sure what's causing it.">
            <span class="suggestion-icon">◷</span>
            <span><strong>Slow website</strong><small>Explore possible performance issues</small></span>
            <span class="suggestion-arrow">→</span>
          </button>
          <button class="suggestion" data-issue="Something on my website stopped working after a recent change.">
            <span class="suggestion-icon">⌘</span>
            <span><strong>Something stopped working</strong><small>Trace the problem step by step</small></span>
            <span class="suggestion-arrow">→</span>
          </button>
          <button class="suggestion" data-issue="I need help understanding a WordPress error message.">
            <span class="suggestion-icon">?</span>
            <span><strong>WordPress error</strong><small>Understand the message and next steps</small></span>
            <span class="suggestion-arrow">→</span>
          </button>
        </div>
      </section>

      <section class="troubleshoot-result" id="result-panel" hidden aria-live="polite"></section>

      <footer class="page-footer">SiteSidekick <span>Practical guidance for your website.</span></footer>
    </main>
  </div>
`

const issueInput = document.querySelector('#issue-input')
const errorMessage = document.querySelector('#form-error')
const resultPanel = document.querySelector('#result-panel')
const issuePanel = document.querySelector('#issue-panel')

function beginTroubleshooting(issue) {
  const description = issue.trim()

  if (!description) {
    errorMessage.textContent = 'Describe the issue or choose one of the common starting points.'
    issueInput.focus()
    return
  }

  errorMessage.textContent = ''
  resultPanel.hidden = false
  resultPanel.innerHTML = `
    <div class="result-heading">
      <p class="eyebrow">TROUBLESHOOTING SESSION</p>
      <h2>Let's narrow it down.</h2>
      <p>Here is the issue you described:</p>
      <blockquote></blockquote>
    </div>
    <div class="notice">
      <strong>Before we choose a fix</strong>
      <p>We haven't inspected your website. The cause isn't confirmed yet, so we'll start by gathering a little more information.</p>
    </div>
    <label for="detail-select">Which best describes your situation?</label>
    <select id="detail-select">
      <option value="">Choose the closest match</option>
      <option>I noticed this after changing the design or content.</option>
      <option>It started after a plugin, theme or software update.</option>
      <option>It happens only on mobile or a particular browser.</option>
      <option>I'm not sure when it started.</option>
    </select>
    <label for="extra-details">Anything else you've noticed? (optional)</label>
    <textarea id="extra-details" rows="3" placeholder="What have you tried? What looks different?"></textarea>
    <button id="build-plan">Build my starter action plan →</button>
    <div id="plan-output"></div>
  `
  resultPanel.querySelector('blockquote').textContent = description
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' })

  document.querySelector('#build-plan').addEventListener('click', () => {
    const detail = document.querySelector('#detail-select').value
    const extra = document.querySelector('#extra-details').value.trim()
    const plan = document.querySelector('#plan-output')

    plan.innerHTML = `
      <h3>Your initial action plan</h3>
      <p class="plan-intro">These are safe starting checks, not a confirmed diagnosis.</p>
      <ol class="action-list">
        <li><strong>Reproduce the issue.</strong><p>Open the affected page and note the device, browser and exact location where the problem appears.</p></li>
        <li><strong>Check what changed.</strong><p>Review recent design edits, plugin or theme updates, and other changes around the time the issue began.</p></li>
        <li><strong>Test one thing at a time.</strong><p>If this is a live business website, make a backup before changing settings or code. Avoid disabling plugins on a live site without a safe testing plan.</p></li>
      </ol>
      <div class="notice"><strong>What we know so far</strong><p>Your reported issue is recorded in this session. The root cause remains unconfirmed.</p></div>
      <button class="secondary-button" id="new-session">Start another issue</button>
    `

    const summary = document.createElement('p')
    summary.className = 'session-details'
    summary.textContent = [
      detail ? 'Context: ' + detail : '',
      extra ? 'Additional notes: ' + extra : ''
    ].filter(Boolean).join(' ')
    if (summary.textContent) plan.insertBefore(summary, plan.firstChild)

    document.querySelector('#new-session').addEventListener('click', resetSession)
  })
}

function resetSession() {
  issueInput.value = ''
  resultPanel.hidden = true
  resultPanel.innerHTML = ''
  errorMessage.textContent = ''
  issueInput.focus()
  issuePanel.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

document.querySelector('#start-button').addEventListener('click', () => {
  beginTroubleshooting(issueInput.value)
})

document.querySelector('#new-issue').addEventListener('click', resetSession)

document.querySelectorAll('.suggestion').forEach((button) => {
  button.addEventListener('click', () => {
    issueInput.value = button.dataset.issue
    beginTroubleshooting(issueInput.value)
  })
})

document.querySelector('#history-link').addEventListener('click', (event) => {
  event.preventDefault()
  alert('Saved issue history is planned for a later step. This preview does not yet save sessions between visits.')
})
