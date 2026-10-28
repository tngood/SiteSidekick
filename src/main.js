
import './style.css'
import { knowledgeBase } from './knowledge-base.js'

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="#" id="home-link">
        <span class="brand-mark">S</span>
        <span>SiteSidekick</span>
      </a>

      <button class="new-issue" id="new-issue">+ New troubleshooting session</button>
      <p class="nav-label">WORKSPACE</p>
      <a class="nav-link active" href="#home" id="overview-link">Overview</a>
      <a class="nav-link" href="#history" id="history-link">Issue history</a>

      <div class="sidebar-bottom">
        <div class="help-card">
          <strong>Website help, without the guesswork.</strong>
          <p>Understand the issue, explore likely causes, and know what to do next.</p>
        </div>
        <div class="profile">
          <div class="avatar">TB</div>
          <div>
            <strong>Your workspace</strong>
            <small>Starter preview</small>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <span class="breadcrumb">Workspace / <strong id="breadcrumb-page">Overview</strong></span>
        <span class="status"><span></span> Preview mode</span>
      </header>

      <section class="welcome" id="welcome-section">
        <p class="eyebrow">YOUR WEBSITE SUPPORT COMPANION</p>
        <h1>Let's get your website<br class="desktop-break"> working better.</h1>
        <p class="intro">Describe what's going wrong. We'll help you narrow down the possible causes and build a clear plan to address it.</p>
      </section>

      <section class="issue-panel" id="issue-panel">
        <label for="issue-input">What would you like help with?</label>
        <textarea id="issue-input" rows="4" placeholder="For example: My WordPress website looks broken on mobile, but looks fine on desktop..."></textarea>
        <div class="input-footer">
          <span>Share what you see and when it started.</span>
          <button id="start-button">Start troubleshooting →</button>
        </div>
        <p class="form-error" id="form-error" role="alert"></p>
      </section>

      <section class="suggestions" id="suggestions-section">
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
      <section class="troubleshoot-result" id="history-panel" hidden aria-live="polite"></section>

      <footer class="page-footer">
        SiteSidekick <span>Practical guidance for your website.</span>
      </footer>
    </main>
  </div>
`

const issueInput = document.querySelector('#issue-input')
const errorMessage = document.querySelector('#form-error')
const resultPanel = document.querySelector('#result-panel')
const historyPanel = document.querySelector('#history-panel')
const issuePanel = document.querySelector('#issue-panel')
const suggestionsSection = document.querySelector('#suggestions-section')
const welcomeSection = document.querySelector('#welcome-section')
const breadcrumbPage = document.querySelector('#breadcrumb-page')
const overviewLink = document.querySelector('#overview-link')
const historyLink = document.querySelector('#history-link')

const STORAGE_KEY = 'sitesidekick-sessions-v1'
const SUPPORT_EMAIL = 'tabathabierie@gmail.com'
let activeConversation = null

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character])
}

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

function loadSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function saveSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    return true
  } catch {
    alert('Your browser could not save this session.')
    return false
  }
}

function setView(view) {
  const showingHistory = view === 'history'

  historyPanel.hidden = !showingHistory
  resultPanel.hidden = true
  issuePanel.hidden = showingHistory
  suggestionsSection.hidden = showingHistory
  welcomeSection.hidden = showingHistory

  breadcrumbPage.textContent = showingHistory ? 'Issue history' : 'Overview'
  overviewLink.classList.toggle('active', !showingHistory)
  historyLink.classList.toggle('active', showingHistory)

  if (!showingHistory) historyPanel.innerHTML = ''
}

function resetSession() {
  activeConversation = null
  setView('overview')
  issueInput.value = ''
  resultPanel.hidden = true
  resultPanel.innerHTML = ''
  errorMessage.textContent = ''
  issueInput.focus()
  issuePanel.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function findKnowledgeRecord(description) {
  const issue = description.toLowerCase()

  const matches = knowledgeBase
    .map(record => ({
      record,
      score: record.keywords.filter(keyword =>
        issue.includes(keyword.toLowerCase())
      ).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return matches.length ? matches[0].record : null
}

/* Guided questions */

const questionSets = {
  error: [
    {
      prompt: 'What happens when you visit your website?',
      choices: [
        ['offline', 'My website will not load at all'],
        ['message', 'I see an error message'],
        ['design', 'The site loads, but something looks wrong'],
        ['admin', 'My website works, but I cannot log in']
      ]
    },
    {
      prompt: 'Which message do you see?',
      when: a => a[0] === 'message',
      choices: [
        ['404', '404 - Page Not Found'],
        ['critical', 'A critical error'],
        ['500', '500 - Internal Server Error'],
        ['other', 'Something else or I am not sure']
      ]
    },
    {
      prompt: 'How many pages are affected?',
      when: a => a[1] === '404',
      choices: [
        ['one', 'Just one page'],
        ['several', 'Several pages'],
        ['home', 'My homepage too'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Does your homepage load normally?',
      when: a => a[2] === 'several',
      choices: [
        ['yes', 'Yes, the homepage works'],
        ['no', 'No, it also shows an error'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Do the affected pages work in a private or incognito browser window?',
      when: a => a[3] === 'yes',
      choices: [
        ['yes', 'Yes, they work in a private window'],
        ['no', 'No, I still see errors'],
        ['help', 'I would rather have someone check']
      ]
    },
    {
      prompt: 'Try refreshing an affected page in your regular browser. Does it work now?',
      when: a => a[4] === 'yes',
      choices: [
        ['fixed', 'Yes, the pages are working again'],
        ['notfixed', 'No, the errors remain'],
        ['help', 'I would rather have someone check']
      ]
    }
  ],

  seo: [
    {
      prompt: 'What did you search for on Google?',
      choices: [
        ['name', 'My business name'],
        ['service', 'A service or product'],
        ['local', 'A service plus my city'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Do you know whether SEO work has been done on your website?',
      choices: [
        ['yes', 'Yes'],
        ['no', 'No'],
        ['unsure', 'I am not sure what SEO is']
      ]
    },
    {
      prompt: 'Do you have access to log in and make website changes?',
      choices: [
        ['yes', 'Yes'],
        ['no', 'No'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Where are your services described?',
      choices: [
        ['home', 'On my homepage'],
        ['pages', 'On separate service pages'],
        ['unclear', 'They are not clearly described']
      ]
    },
    {
      prompt: 'Can visitors easily find your service pages from the main menu?',
      when: a => a[3] === 'pages',
      choices: [
        ['yes', 'Yes'],
        ['no', 'No'],
        ['unsure', 'I am not sure']
      ]
    }
  ],

  review: [
    {
      prompt: 'What is bothering you most about your website?',
      choices: [
        ['design', 'Modern appearance'],
        ['speed', 'Faster loading'],
        ['seo', 'Better Google visibility'],
        ['all', 'The whole website needs attention']
      ]
    },
    {
      prompt: 'About how long have you had your website?',
      choices: [
        ['new', 'Less than 2 years'],
        ['middle', '2 to 5 years'],
        ['old', 'More than 5 years'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Do you remember when someone last made major changes to your website?',
      choices: [
        ['recent', 'Within the past year'],
        ['older', '2 or more years ago'],
        ['never', 'Not since it was built'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Do you currently have a website developer?',
      choices: [
        ['yes', 'Yes'],
        ['no', 'No'],
        ['change', 'I am considering someone new'],
        ['unsure', 'I am not sure']
      ]
    }
  ],

  general: [
    {
      prompt: 'Which part of the website is affected?',
      choices: [
        ['whole', 'The entire website'],
        ['some', 'One or more pages'],
        ['mobile', 'Only on mobile'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'When did you first notice the problem?',
      choices: [
        ['recent', 'After a recent change'],
        ['sudden', 'It started suddenly'],
        ['ongoing', 'It has been happening for a while'],
        ['unsure', 'I am not sure']
      ]
    },
    {
      prompt: 'Does the problem happen in a private or incognito browser window too?',
      choices: [
        ['yes', 'Yes'],
        ['no', 'No'],
        ['unsure', 'I have not checked']
      ]
    }
  ]
}

function getConversationType(description) {
  const text = description.toLowerCase()

  if (/404|not found|crash|broken|error|can't log|cannot log/.test(text)) {
    return 'error'
  }

  if (
    /old|outdated|redesign|rebuild|refresh/.test(text) ||
    (/slow|speed/.test(text) && /rank|google|seo/.test(text))
  ) {
    return 'review'
  }

  if (/rank|google|seo|search result|visibility/.test(text)) {
    return 'seo'
  }

  return 'general'
}

function nextQuestion(conversation) {
  const questions = questionSets[conversation.type]

  for (let i = conversation.step; i < questions.length; i++) {
    if (!questions[i].when || questions[i].when(conversation.answers)) {
      return { index: i, question: questions[i] }
    }
  }

  return null
}

/*
 * Serious issues are sent to a developer or hosting provider.
 * These rules use customer descriptions, not website inspection.
 */
function isHighRisk(conversation) {
  const text = conversation.description.toLowerCase()

  const securityOrServer =
    /\b(hacked|hacking|malware|ransomware|security breach|compromised|critical error|fatal error|database error|data loss|data breach|500 error|502 error|503 error|http 500|http 502|http 503)\b/.test(text)

  const checkoutOrPayment =
    /\b(checkout|check out|shopping cart|payment|payments|credit card|card processing|place an order|complete (an? |their |my )?order|purchase|purchases|transactions?)\b/.test(text)

  const failure =
    /\b(can't|cannot|couldn't|unable|won't|will not|not working|doesn't work|don't work|does not work|failed|fails|failing|failure|broken|stopped|down|error|declined|declining|not processing|not going through|won't go through|cannot complete|can't complete)\b/.test(text)

  if (securityOrServer || (checkoutOrPayment && failure)) {
    return true
  }

  if (conversation.type === 'error') {
    if (conversation.answers.includes('critical')) return true
    if (conversation.answers.includes('500')) return true
    if (conversation.answers[0] === 'offline') return true
  }

  return false
}

function wantsProfessionalHelp(conversation) {
  return conversation.answers.includes('help')
}

function conversationSummary(conversation) {
  const lines = [`Original concern: ${conversation.description}`]

  for (const entry of conversation.transcript) {
    lines.push(`${entry.question} ${entry.answer}`)
  }

  if (conversation.checkResults?.length) {
    lines.push('', 'Initial website checks:')

    for (const result of conversation.checkResults) {
      const status =
        result.answer === 'yes' ? 'Completed' :
        result.answer === 'no' ? 'Not completed' :
        'Requested professional help'

      lines.push(`${result.topic}: ${status}`)
    }
  }

  if (conversation.finalStatus) {
    lines.push('', `Customer's current status: ${conversation.finalStatus}`)
  }

  lines.push('', 'The underlying cause has not been confirmed.')

  return lines.join('\n')
}

function conversationOutcome(conversation) {
  if (isHighRisk(conversation)) {
    return {
      title: 'This issue needs professional attention',
      message: 'Your answers suggest a potentially serious website problem. Contact your website developer or hosting provider. Avoid changing live website files, plugins, or settings without a recovery plan.',
      resolved: false
    }
  }

  if (wantsProfessionalHelp(conversation)) {
    return {
      title: 'A website professional can take it from here',
      message: 'You have requested professional assistance. There is no need to continue troubleshooting. Share your summary with your developer or request help from TB Designs.',
      resolved: false
    }
  }

  if (
    conversation.type === 'error' &&
    conversation.answers.includes('fixed')
  ) {
    return {
      title: 'Your pages appear to be working again',
      message: 'Stored browser information may have contributed to the issue. If the problem returns or customers still experience it, contact your developer.',
      resolved: true
    }
  }

  if (conversation.type === 'review') {
    return {
      title: 'A website assessment is a good next step',
      message: 'A professional review can help determine whether targeted improvements or a redesign make sense. An older website does not automatically need replacing.',
      resolved: false
    }
  }

  if (conversation.type === 'seo') {
    return {
      title: 'Start with a search visibility review',
      message: 'Search rankings depend on the search phrase, competition, content, and technical factors. A specialist can review these areas without guaranteeing rankings.',
      resolved: false
    }
  }

  return {
    title: 'Here is your next step',
    message: 'We have narrowed down the symptoms, but have not verified the cause. You can gather a little more information or share your summary with a developer.',
    resolved: false
  }
}

/*
 * Update an existing session instead of creating another copy.
 * The original storage key stays unchanged to preserve history.
 */
function saveConversation(conversation) {
  const sessions = loadSessions()
  const outcome = conversationOutcome(conversation)

  const session = {
    id: conversation.id,
    description: conversation.description,
    detail: conversationSummary(conversation),
    extra: '',
    createdAt: conversation.createdAt,
    type: 'conversation',
    transcript: conversation.transcript,
    checkResults: conversation.checkResults || [],
    finalStatus: conversation.finalStatus || '',
    outcome,
    plan: {
      category:
        conversation.type === 'review' ? 'Website review' :
        conversation.type === 'seo' ? 'Search visibility' :
        conversation.type === 'error' ? 'Website error' :
        'Website troubleshooting'
    }
  }

  const existingIndex = sessions.findIndex(item =>
    String(item.id) === String(session.id)
  )

  if (existingIndex >= 0) {
    sessions.splice(existingIndex, 1)
  }

  sessions.unshift(session)
  return saveSessions(sessions)
}

/* Safe, initial website checks */

function buildSelfHelpChecks(conversation) {
  const issue = conversation.description.toLowerCase()
  const selected = conversation.answers[0]
  const checks = []

  const add = (topic, instructions, success) => {
    checks.push({ topic, instructions, success })
  }

  const isReview = conversation.type === 'review'

  if (
    /old|outdated|design|redesign|refresh|modern/.test(issue) ||
    (isReview && ['all', 'design'].includes(selected))
  ) {
    add(
      'Website appearance',
      'Open your homepage on a phone and a computer. Write down any outdated information, difficult-to-read text, or buttons that are hard to find. You do not need to edit anything yet.',
      'You now have a starting list of what needs attention.'
    )
  }

  if (
    /slow|speed|loading|performance/.test(issue) ||
    (isReview && ['all', 'speed'].includes(selected))
  ) {
    add(
      'Loading speed',
      'Open the same page on a second device or internet connection. Is it slow in both places? Make a note of which pages are affected.',
      'That comparison provides useful information for a developer.'
    )
  }

  if (
    /rank|google|seo|search result|visibility/.test(issue) ||
    (isReview && ['all', 'seo'].includes(selected))
  ) {
    add(
      'Google visibility',
      'Write down the exact words you searched for. Then check whether your website has a page that clearly describes that service. No changes are needed yet.',
      'You now have the search phrase and relevant page to review.'
    )
  }

  if (checks.length === 0) {
    const record = findKnowledgeRecord(conversation.description)

    /*
     * Use observation-only checks for general issues.
     * Knowledge base instructions may involve changes,
     * so do not automatically give those to beginners.
     */
    const steps = [
      'Write down which page is affected, what you expected to happen, and what actually happened.',
      'Open the same page in a private browser window. Note whether the problem still appears.',
      'Write down when the problem started and whether anything changed around that time.'
    ]

    if (record?.category) {
      steps[0] = `For this ${record.category.toLowerCase()} concern, write down the affected page and exactly what happens. Do not change settings yet.`
    }

    steps.forEach((step, i) => {
      add(`Check ${i + 1}`, step, 'That gives us more information about the issue.')
    })
  }

  return checks.slice(0, 3)
}

/*
 * Opens a preaddressed email draft.
 * Some browsers require a configured default email application.
 * A Gmail compose link is offered as a fallback.
 */
function buildEmailDetails(summary) {
  const subject = 'SiteSidekick Website Assistance Request'
  const body = `Hello TB Designs,

I would like professional help with my website.

${summary}

Please let me know the next steps.`

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SUPPORT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return { mailto, gmail }
}

function openEmailDraft(summary, container = null) {
  const details = buildEmailDetails(summary)

  /*
   * Show an alternate link before attempting the email application.
   * Browsers cannot reliably tell us whether mailto succeeded.
   */
  if (container) {
    const existing = container.querySelector('.email-fallback')
    if (existing) existing.remove()

    const fallback = document.createElement('div')
    fallback.className = 'notice email-fallback'

    fallback.innerHTML = `
      <strong>Ready to request assistance</strong>
      <p>
        The email is addressed to
        <strong>${escapeHTML(SUPPORT_EMAIL)}</strong>
        with your website summary included.
      </p>
      <p>
        If your email application does not open, use the Gmail option below.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0;">
        <a class="secondary-button" href="${escapeHTML(details.gmail)}" target="_blank" rel="noopener noreferrer">
          Open Draft in Gmail
        </a>
        <a class="secondary-button" href="${escapeHTML(details.mailto)}">
          Try Email Application Again
        </a>
      </div>
      <p>No email has been sent automatically.</p>
    `

    container.appendChild(fallback)
  }

  window.location.href = details.mailto
}

async function copySummary(textarea) {
  try {
    await navigator.clipboard.writeText(textarea.value)
    alert('Summary copied. You can paste it into an email to your developer.')
  } catch {
    textarea.select()
    alert('Copy the highlighted summary to share it with your developer.')
  }
}

function showSelfHelp(conversation, container) {
  const checks = isHighRisk(conversation)
    ? []
    : buildSelfHelpChecks(conversation)

  const results = [...(conversation.checkResults || [])]
  let index = results.length

  function updateResults() {
    conversation.checkResults = [...results]
    saveConversation(conversation)
  }

  function showDeveloperHandoff(title, message) {
    conversation.finalStatus = title
    updateResults()

    container.innerHTML = `
      <div class="notice">
        <strong>${escapeHTML(title)}</strong>
        <p>${escapeHTML(message)}</p>
        <p>
          These checks do not confirm the underlying cause.
          Avoid changing live website settings, plugins, themes,
          or code without a backup and recovery plan.
        </p>
      </div>

      <label for="self-help-summary">
        Your developer summary (you can make changes)
      </label>

      <textarea id="self-help-summary" rows="10">${escapeHTML(conversationSummary(conversation))}</textarea>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
        <button type="button" class="secondary-button" id="self-help-copy">
          Share With My Developer
        </button>

        <button type="button" class="secondary-button" id="self-help-professional">
          Get Professional Help
        </button>
      </div>

      <div id="self-help-email-options"></div>

      <p class="plan-intro">
        SiteSidekick has not inspected or modified your website.
        No assistance request has been submitted.
      </p>
    `

    container.querySelector('#self-help-copy').addEventListener('click', () => {
      copySummary(container.querySelector('#self-help-summary'))
    })

    container.querySelector('#self-help-professional').addEventListener('click', () => {
      openEmailDraft(
        container.querySelector('#self-help-summary').value,
        container.querySelector('#self-help-email-options')
      )
    })
  }

  function finishChecks() {
    container.innerHTML = `
      <div class="notice">
        <strong>You've completed your initial website checks.</strong>
        <p>
          You've gathered useful information about your website.
          These checks help identify where problems may exist,
          but they do not necessarily resolve them.
        </p>
        <p><strong>Are you still experiencing these problems?</strong></p>
      </div>

      <div style="display:grid;gap:10px;margin:14px 0;">
        <button type="button" class="secondary-button" data-status="yes">
          Yes, I still need help
        </button>

        <button type="button" class="secondary-button" data-status="some">
          Some things have improved
        </button>

        <button type="button" class="secondary-button" data-status="no">
          No, everything seems to be working
        </button>
      </div>
    `

    container.querySelectorAll('[data-status]').forEach(button => {
      button.addEventListener('click', () => {
        const status = button.dataset.status

        if (status === 'no') {
          conversation.finalStatus = 'Customer reports everything seems to be working'
          updateResults()

          container.innerHTML = `
            <div class="notice">
              <strong>Glad things appear to be working.</strong>
              <p>
                Keep your notes in case the issue returns.
                These checks do not confirm what originally caused the problem.
              </p>
              <p>
                If the problem returns, contact your website developer
                rather than repeatedly changing live website settings.
              </p>
            </div>
          `
          return
        }

        if (status === 'some') {
          showDeveloperHandoff(
            'Some concerns still need attention',
            'Even if something has improved, the remaining concerns deserve a closer look. Share your findings with a developer so they can investigate safely.'
          )
          return
        }

        showDeveloperHandoff(
          'A website professional is the next step',
          'You have completed the initial checks. Rather than continuing through more do-it-yourself changes, share your findings with a developer who can investigate the underlying causes.'
        )
      })
    })
  }

  function renderCheck() {
    if (index >= checks.length) {
      finishChecks()
      return
    }

    const check = checks[index]

    container.innerHTML = `
      <div class="notice">
        <strong>Step ${index + 1} of ${checks.length}: ${escapeHTML(check.topic)}</strong>
        <p>${escapeHTML(check.instructions)}</p>
        <p><strong>Were you able to complete this check?</strong></p>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0;">
        <button type="button" class="secondary-button" data-check="yes">
          Yes
        </button>

        <button type="button" class="secondary-button" data-check="no">
          Not yet
        </button>

        <button type="button" class="secondary-button" data-check="help">
          I'd rather get help
        </button>
      </div>
    `

    container.querySelectorAll('[data-check]').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.dataset.check

        results.push({
          topic: check.topic,
          answer
        })

        updateResults()

        if (answer === 'help') {
          showDeveloperHandoff(
            'A website professional can take it from here',
            'You do not need to continue troubleshooting. Share what you have noticed with your developer so they can investigate safely.'
          )
          return
        }

        index += 1
        renderCheck()

        if (index < checks.length) {
          const feedback = document.createElement('p')

          feedback.textContent =
            answer === 'yes'
              ? check.success
              : 'That check has been marked as not completed.'

          container.prepend(feedback)
        }
      })
    })
  }

  if (isHighRisk(conversation)) {
    showDeveloperHandoff(
      'This issue needs professional attention',
      'Your description or answers suggest a potentially serious website problem. Contact your website developer or hosting provider instead of attempting changes to your live website.'
    )
    return
  }

  renderCheck()
}

/* Conversation display */

function renderConversation(conversation) {
  const needsProfessional = isHighRisk(conversation) ||
    wantsProfessionalHelp(conversation)

  const next = needsProfessional
    ? null
    : nextQuestion(conversation)

  const outcome = conversationOutcome(conversation)

  resultPanel.hidden = false

  resultPanel.innerHTML = `
    <div class="result-heading">
      <p class="eyebrow">WEBSITE SUPPORT</p>
      <h2>Let's see what's going on.</h2>
      <blockquote>${escapeHTML(conversation.description)}</blockquote>
    </div>

    ${conversation.transcript.map(entry => `
      <div class="notice">
        <strong>${escapeHTML(entry.question)}</strong>
        <p>${escapeHTML(entry.answer)}</p>
      </div>
    `).join('')}

    ${next ? `
      <div class="notice">
        <strong>${escapeHTML(next.question.prompt)}</strong>
        <p>Choose whichever answer fits best.</p>
      </div>

      <div id="conversation-options" style="display:grid;gap:10px;margin:16px 0;">
        ${next.question.choices.map(([value, label]) => `
          <button
            type="button"
            class="secondary-button"
            data-answer="${escapeHTML(value)}"
            style="text-align:left;"
          >
            ${escapeHTML(label)}
          </button>
        `).join('')}
      </div>
    ` : `
      <div class="notice">
        <strong>${escapeHTML(outcome.title)}</strong>
        <p>${escapeHTML(outcome.message)}</p>
      </div>

      <label for="handoff-summary">
        Your website summary (you can make changes)
      </label>

      <textarea id="handoff-summary" rows="8">${escapeHTML(conversationSummary(conversation))}</textarea>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
        <button type="button" class="secondary-button" id="copy-summary">
          Share This With My Developer
        </button>

        <button type="button" class="secondary-button" id="hire-tb">
          Get Professional Help
        </button>

        ${!needsProfessional ? `
          <button type="button" class="secondary-button" id="self-help">
            Walk Me Through It
          </button>
        ` : ''}
      </div>

      <div id="email-options"></div>

      <p class="plan-intro">
        This is a rules-based preview. No website inspection,
        booking, or message submission has occurred.
      </p>

      <button type="button" class="secondary-button" id="new-session">
        Start another issue
      </button>
    `}
  `

  if (next) {
    resultPanel.querySelectorAll('[data-answer]').forEach(button => {
      button.addEventListener('click', () => {
        const answer = next.question.choices.find(
          choice => choice[0] === button.dataset.answer
        )

        if (!answer) return

        conversation.answers[next.index] = answer[0]

        conversation.transcript.push({
          question: next.question.prompt,
          answer: answer[1]
        })

        conversation.step = next.index + 1

        if (
          !nextQuestion(conversation) ||
          isHighRisk(conversation) ||
          wantsProfessionalHelp(conversation)
        ) {
          if (wantsProfessionalHelp(conversation)) {
            conversation.finalStatus = 'Customer requested professional assistance'
          }

          saveConversation(conversation)
        }

        renderConversation(conversation)
      })
    })

    return
  }

  if (wantsProfessionalHelp(conversation) && !conversation.finalStatus) {
    conversation.finalStatus = 'Customer requested professional assistance'
  }

  saveConversation(conversation)

  document.querySelector('#copy-summary').addEventListener('click', () => {
    copySummary(document.querySelector('#handoff-summary'))
  })

  document.querySelector('#hire-tb').addEventListener('click', () => {
    openEmailDraft(
      document.querySelector('#handoff-summary').value,
      document.querySelector('#email-options')
    )
  })

  const selfHelpButton = document.querySelector('#self-help')

  if (selfHelpButton) {
    selfHelpButton.addEventListener('click', () => {
      const container = document.createElement('div')
      container.id = 'self-help-checks'

      selfHelpButton.after(container)
      selfHelpButton.disabled = true

      showSelfHelp(conversation, container)
    })
  }

  document.querySelector('#new-session').addEventListener('click', resetSession)

  resultPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

/* Issue history */

function showHistory() {
  setView('history')
  const sessions = loadSessions()

  if (sessions.length === 0) {
    historyPanel.innerHTML = `
      <p class="eyebrow">YOUR WORKSPACE</p>
      <h2>Issue history</h2>
      <p>You haven't saved any troubleshooting sessions yet.</p>
      <button class="secondary-button" id="history-new-session">
        Start a new issue
      </button>
    `

    document.querySelector('#history-new-session').addEventListener(
      'click',
      resetSession
    )

    return
  }

  historyPanel.innerHTML = `
    <p class="eyebrow">YOUR WORKSPACE</p>
    <h2>Issue history</h2>
    <p>Review your previous issues and action plans.</p>
    <p>${sessions.length} saved ${sessions.length === 1 ? 'session' : 'sessions'}</p>

    <div id="history-list"></div>

    <button class="secondary-button" id="history-new-session">
      Start a new issue
    </button>

    <button class="secondary-button" id="clear-history">
      Clear all history
    </button>
  `

  const list = document.querySelector('#history-list')

  sessions.forEach(session => {
    const card = document.createElement('div')
    card.className = 'suggestion'
    card.style.cssText = 'display:block;width:100%;margin:12px 0;'

    card.innerHTML = `
      <strong>${escapeHTML(session.description)}</strong>
      <small>
        ${escapeHTML(session.plan?.category || 'Troubleshooting session')}
        · ${escapeHTML(formatDate(session.createdAt))}
      </small>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
        <button class="secondary-button" data-open="${escapeHTML(session.id)}">
          View session
        </button>

        <button class="secondary-button" data-delete="${escapeHTML(session.id)}">
          Delete
        </button>
      </div>
    `

    list.appendChild(card)
  })

  list.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', () => {
      const session = loadSessions().find(
        item => String(item.id) === button.dataset.open
      )

      if (session) showSavedSession(session)
    })
  })

  list.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', () => {
      if (!confirm('Delete this saved troubleshooting session?')) return

      const updated = loadSessions().filter(
        item => String(item.id) !== button.dataset.delete
      )

      if (saveSessions(updated)) showHistory()
    })
  })

  document.querySelector('#history-new-session').addEventListener(
    'click',
    resetSession
  )

  document.querySelector('#clear-history').addEventListener('click', () => {
    if (!confirm('Delete all saved troubleshooting sessions? This cannot be undone.')) {
      return
    }

    if (saveSessions([])) showHistory()
  })

  historyPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function showSavedSession(session) {
  setView('overview')
  resultPanel.hidden = false

  const transcript = session.transcript || []
  const checks = session.checkResults || []

  resultPanel.innerHTML = `
    <p class="eyebrow">SAVED CONVERSATION</p>
    <h2>${escapeHTML(session.outcome?.title || 'Website troubleshooting')}</h2>
    <p>Saved ${escapeHTML(formatDate(session.createdAt))}</p>

    <blockquote>${escapeHTML(session.description)}</blockquote>

    ${transcript.map(entry => `
      <div class="notice">
        <strong>${escapeHTML(entry.question)}</strong>
        <p>${escapeHTML(entry.answer)}</p>
      </div>
    `).join('')}

    ${checks.length ? `
      <h3>Initial website checks</h3>
      ${checks.map(check => `
        <div class="notice">
          <strong>${escapeHTML(check.topic)}</strong>
          <p>${escapeHTML(
            check.answer === 'yes' ? 'Completed' :
            check.answer === 'no' ? 'Not completed' :
            'Requested professional help'
          )}</p>
        </div>
      `).join('')}
    ` : ''}

    ${session.finalStatus ? `
      <div class="notice">
        <strong>Customer's final status</strong>
        <p>${escapeHTML(session.finalStatus)}</p>
      </div>
    ` : ''}

    <div class="notice">
      <strong>Next steps</strong>
      <p>${escapeHTML(session.outcome?.message || '')}</p>
    </div>

    <label for="saved-summary">Developer summary</label>
    <textarea id="saved-summary" rows="10">${escapeHTML(session.detail || '')}</textarea>

    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
      <button class="secondary-button" id="saved-copy">
        Share With My Developer
      </button>

      <button class="secondary-button" id="back-to-history">
        Back to issue history
      </button>

      <button class="secondary-button" id="new-session">
        Start another issue
      </button>
    </div>
  `

  document.querySelector('#saved-copy').addEventListener('click', () => {
    copySummary(document.querySelector('#saved-summary'))
  })

  document.querySelector('#back-to-history').addEventListener(
    'click',
    showHistory
  )

  document.querySelector('#new-session').addEventListener(
    'click',
    resetSession
  )

  resultPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

/* Start a new troubleshooting session */

function beginTroubleshooting(issue) {
  const description = issue.trim()

  if (!description) {
    errorMessage.textContent =
      'Describe the issue or choose one of the common starting points.'

    issueInput.focus()
    return
  }

  setView('overview')
  errorMessage.textContent = ''

  activeConversation = {
    id: Date.now(),
    description,
    createdAt: new Date().toISOString(),
    type: getConversationType(description),
    step: 0,
    answers: [],
    transcript: [],
    checkResults: [],
    finalStatus: ''
  }

  renderConversation(activeConversation)
}

/* Navigation and buttons */

document.querySelector('#start-button').addEventListener('click', () => {
  beginTroubleshooting(issueInput.value)
})

document.querySelector('#new-issue').addEventListener('click', resetSession)

document.querySelectorAll('.suggestion[data-issue]').forEach(button => {
  button.addEventListener('click', () => {
    issueInput.value = button.dataset.issue
    beginTroubleshooting(issueInput.value)
  })
})

historyLink.addEventListener('click', event => {
  event.preventDefault()
  showHistory()
})

overviewLink.addEventListener('click', event => {
  event.preventDefault()
  resetSession()
})

document.querySelector('#home-link').addEventListener('click', event => {
  event.preventDefault()
  resetSession()
})
