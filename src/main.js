
import './style.css'
import { knowledgeBase } from './knowledge-base.js'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
     

<a class="brand" href="#" id="home-link" aria-label="SiteSidekick home">
  <span class="ssk-logo" aria-hidden="true">
    <svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 62 C-3 91 79 98 114 57"
            fill="none" stroke="#BD2F37"
            stroke-width="9" stroke-linecap="round"/>
      <rect x="17" y="12" width="97" height="72" rx="12"
            fill="#182438" stroke="#FFFFFF" stroke-width="5"/>
      <path d="M18 33 H113" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="30" cy="23" r="3.5" fill="#FFFFFF"/>
      <circle cx="42" cy="23" r="3.5" fill="#FFFFFF"/>
      <circle cx="54" cy="23" r="3.5" fill="#FFFFFF"/>
      <text x="65" y="67" text-anchor="middle"
            fill="#FFFFFF" font-size="35"
            font-weight="900"
            font-family="Arial, sans-serif"
            letter-spacing="-3">SSK</text>
      <circle cx="108" cy="16" r="16" fill="#BD2F37"/>
      <text x="108" y="24" text-anchor="middle"
            fill="#FFFFFF" font-size="25"
            font-weight="800"
            font-family="Arial, sans-serif">$</text>
    </svg>
  </span>
  <span class="ssk-brand-text">
    <strong>SiteSidekick</strong>
    <small>A product of TB Designs</small>
  </span>
</a>



      <button class="new-issue" id="new-issue">+ New troubleshooting session</button>
     <p class="nav-label">WORKSPACE</p>
<a class="nav-link active" href="#home" id="overview-link">Overview</a>
<a class="nav-link" href="#history" id="history-link">Issue history</a>

<p class="nav-label">INFORMATION</p>
<a class="nav-link" href="#legal" id="legal-link">Legal &amp; Privacy</a>

      <div class="sidebar-bottom">
        <div class="help-card">
          <strong>Website help, without the guesswork.</strong>
          <p>Understand the issue, explore likely causes, and know what to do next.</p>
        </div>
        
<div class="profile">
  <div class="avatar">TB</div>
  <div>
    <strong>Your workspace</strong>
    <small>A product of TB Designs</small>
  </div>
</div>

      </div>
    </aside>

    <main class="main-content">
      


<header class="topbar" hidden>
  <span class="breadcrumb">
    Workspace / <strong id="breadcrumb-page">Overview</strong>
  </span>
</header>




      <section class="welcome" id="welcome-section">
        <p class="eyebrow">YOUR WEBSITE SUPPORT COMPANION</p>
        <h1>Let's get your website<br class="desktop-break"> working better.</h1>
        <p class="intro">Describe what's going wrong. We'll help you narrow down the possible causes and build a clear plan to address it.</p>
      </section>

     
<section class="issue-panel" id="issue-panel">
  <label for="issue-input">What would you like help with?</label>

  <div class="ssk-business-option">
    <button
      type="button"
      id="ssk-business-guide-button"
      aria-expanded="false"
      aria-controls="ssk-business-guide"
    >
      <strong>I'm Not Sure What My Business Needs</strong>
      <span>
        Not sure whether to start with a website, social media,
        online booking, or selling online? Explore your options.
      </span>
    </button>

    <div id="ssk-business-guide" hidden>
      <h3>Let's Find Your Starting Point</h3>

      <p>
        You don't need every digital tool on day one.
        Start with what helps customers find, trust, and
        contact your business.
      </p>

      <div class="ssk-business-guide-content">
        <h4>Start with the essentials</h4>
        <p>
          Make sure your business has accurate contact information,
          a clear description of what you offer, and a reliable
          way for customers to reach you.
        </p>

        <h4>Do I need a website?</h4>
        <p>
          A website gives your business a central place to explain
          services, answer common questions, and build credibility.
          A simple website or landing page may be enough to start.
        </p>

        <h4>What about social media?</h4>
        <p>
          Social media can help customers discover your business
          and see recent updates. Choose platforms where your
          customers are active rather than trying to manage them all.
        </p>

        <h4>Do I need online booking or selling?</h4>
        <p>
          If customers need to schedule appointments or purchase
          products, consider adding those features when they
          support how your business operates.
        </p>
      </div>

      <p>
        <strong>SiteSidekick tip:</strong>
        Start with your customers' most important needs.
        You can expand your digital presence as your business grows.
      </p>
    </div>
  </div>

  <textarea
    id="issue-input"
    rows="4"
    placeholder="For example: My WordPress website looks broken on mobile, but looks fine on desktop..."
  ></textarea>

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
      <section
  class="troubleshoot-result ssk-legal-panel"
  id="legal-panel"
  aria-labelledby="ssk-legal-title"
  hidden
></section>

     <footer class="page-footer" aria-label="SiteSidekick information and legal notices">
  <div class="ssk-footer-brand">
    <strong>SiteSidekick</strong>
    <p>Website troubleshooting made simple.</p>
    <p class="ssk-footer-credit">
      Developed by TB Designs · AI assistance powered by Meta Muse Wonder
    </p>
  </div>

  <div class="ssk-footer-legal">
    <h2>Legal &amp; Privacy</h2>

    <nav aria-label="Legal information">
      <a href="#ssk-privacy">Privacy Policy</a>
      <a href="#ssk-terms">Terms of Use</a>
      <a href="#ssk-ai-disclosure">AI Disclosure</a>
      <a href="#ssk-disclaimer">Website Troubleshooting Disclaimer</a>
      <a href="#ssk-cookies">Cookies &amp; Analytics</a>
     <a
  href="https://dev.meta.ai/legal"
  target="_blank"
  rel="noopener noreferrer"
>
  Meta AI Legal Documents ↗
</a>
    </nav>
  </div>

  <div class="ssk-footer-notice">
    <p>
      <strong>Important:</strong>
      SiteSidekick provides general website troubleshooting guidance.
      AI-generated information may be inaccurate and does not constitute
      a confirmed technical diagnosis.
    </p>

    <p>
      Do not submit passwords, API keys, financial information,
      or other sensitive personal information.
    </p>
  </div>

  <p class="ssk-footer-copyright">
    &copy; 2026 TB Designs. SiteSidekick is an independently developed
    application using Meta AI technology. It is not affiliated with
    or endorsed by Meta.
  </p>
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
const legalLink = document.querySelector('#legal-link')
const legalPanel = document.querySelector('#legal-panel')
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
  const showingLegal = view === 'legal'
  const showingOverview = !showingHistory && !showingLegal

  historyPanel.hidden = !showingHistory
  legalPanel.hidden = !showingLegal
  resultPanel.hidden = true

  issuePanel.hidden = !showingOverview
  suggestionsSection.hidden = !showingOverview
  welcomeSection.hidden = !showingOverview

  breadcrumbPage.textContent =
    showingHistory ? 'Issue history' :
    showingLegal ? 'Legal & Privacy' :
    'Overview'

  overviewLink.classList.toggle('active', showingOverview)
  historyLink.classList.toggle('active', showingHistory)
  legalLink.classList.toggle('active', showingLegal)

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

const browserQuestions = [
  {
    prompt: 'What happens when you try to use your web browser?',
    choices: [
      ['wontopen', 'The browser will not open at all'],
      ['websites', 'The browser opens, but websites will not load'],
      ['onewebsite', 'Only one website has a problem'],
      ['unsure', 'I am not sure what is happening']
    ]
  },
  {
    prompt: 'Does the same problem happen in another browser?',
    choices: [
      ['yes', 'Yes, the problem happens in another browser'],
      ['no', 'No, another browser works normally'],
      ['unchecked', 'I have not tried another browser']
    ]
  }
]

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

questionSets.browser = browserQuestions

function getConversationType(description) {
  const text = description.toLowerCase()

  if (
    /\b(browser|chrome|firefox|safari|edge|incognito)\b/.test(text)
  ) {
    return 'browser'
  }

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
  const description = conversation.description.toLowerCase()

  // Recognize details the customer already shared.
  const mobileMentioned =
    /\b(mobile|phone|phones|iphone|android|smartphone|cellphone)\b/i.test(description)

  const desktopMentioned =
    /\b(desktop|laptop|computer|pc)\b/i.test(description)

  const mobileProblem =
    mobileMentioned &&
    (
      /\b(only|just|fine on|works on|looks fine|looks okay|looks ok)\b/i.test(description) ||
      desktopMentioned
    )

  const recentChange =
    /\b(after|since|following|when i|yesterday|today|last night|recently)\b/i.test(description) &&
    /\b(updated?|changed?|added?|uploaded?|replaced?|installed?|edited?|removed?|pictures?|photos?|images?|plugins?|themes?|content|menu)\b/i.test(description)

  const ongoingProblem =
    /\b(for weeks|for months|for years|always been|long time)\b/i.test(description)

  const suddenProblem =
    /\b(suddenly|out of nowhere|all of a sudden)\b/i.test(description)

  for (let i = conversation.step; i < questions.length; i++) {
    const question = questions[i]

    if (conversation.type === 'general') {
      if (i === 0 && mobileProblem) {
        conversation.answers[0] = 'mobile'
        continue
      }

      if (i === 1) {
        if (recentChange) {
          conversation.answers[1] = 'recent'
          continue
        }

        if (ongoingProblem) {
          conversation.answers[1] = 'ongoing'
          continue
        }

        if (suddenProblem) {
          conversation.answers[1] = 'sudden'
          continue
        }
      }
    }

    if (!question.when || question.when(conversation.answers)) {
      return { index: i, question }
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

/*
 * Developer summary.
 * Preserve the customer's actual findings.
 */
/*
 * Developer summary.
 * Preserve the customer's actual findings.
 * Format the information for a professional support handoff.
 */
function conversationSummary(conversation) {
  const lines = [
    'SITESIDEKICK | WEBSITE SUPPORT REQUEST',
    '===================================',
    '',
    '1. WEBSITE ISSUE',
    conversation.description || 'No description provided.',
    '',
    '2. TROUBLESHOOTING QUESTIONS & ANSWERS'
  ]

  const transcript = conversation.transcript || []

  if (transcript.length) {
    for (const entry of transcript) {
      lines.push(`Question: ${entry.question}`)
      lines.push(`Answer: ${entry.answer}`)
      lines.push('')
    }
  } else {
    lines.push('No troubleshooting questions recorded.', '')
  }

  lines.push('3. INITIAL WEBSITE CHECKS')

  const checks = conversation.checkResults || []

  if (checks.length) {
    for (const result of checks) {
      const status =
        result.answer === 'yes' ? 'Completed' :
        result.answer === 'no' ? 'Not completed' :
        result.answer === 'help' ? 'Requested professional help' :
        result.answer === 'skip' ? 'Not checked' :
        'Finding recorded'

      lines.push(`${result.topic}: ${result.finding || status}`)
    }
  } else {
    lines.push('No initial checks recorded.')
  }

  // Check for conflicting customer answers.
  // Do not change the customer's original responses.
  const clarificationNotes = []

  const initialAnswers = conversation.answers || []
  const findings = conversation.checkResults || []

  const getFinding = topic =>
    findings.find(item => item.topic === topic)?.answer

  const privateFinding =
    getFinding('Compare a private browser window') ||
    getFinding('Check a private browser window')

  // General questionnaire: question 3 asks whether
  // the problem also happens in a private window.
  if (conversation.type === 'general') {
    const initialPrivateAnswer = initialAnswers[2]

    if (
      (initialPrivateAnswer === 'yes' && privateFinding === 'normal') ||
      (initialPrivateAnswer === 'no' && privateFinding === 'still')
    ) {
      clarificationNotes.push(
        'Private browser results differ between the initial questionnaire and the guided checks. Please confirm which result is accurate.'
      )
    }

    const initialTiming = initialAnswers[1]
    const checkedTiming = getFinding('Review when the problem started')

    if (
      (initialTiming === 'sudden' && checkedTiming === 'ongoing') ||
      (initialTiming === 'ongoing' && checkedTiming === 'sudden') ||
      (initialTiming === 'recent' &&
        ['sudden', 'ongoing'].includes(checkedTiming))
    ) {
      clarificationNotes.push(
        'The reported start time differs between the questionnaire and the guided checks. Please clarify when the problem began.'
      )
    }
  }

  if (clarificationNotes.length) {
    lines.push(
      '',
      'FINDINGS THAT NEED CLARIFICATION',
      ...clarificationNotes.map(note => `- ${note}`)
    )
  }

  // Tailor recommendations to the customer's actual findings.
  const getCheckAnswer = topic =>
    (conversation.checkResults || []).find(item => item.topic === topic)?.answer

  const recommendations = []

  if (conversation.type === 'browser') {
    const otherSites = getCheckAnswer('Compare another website')
    const otherBrowser = getCheckAnswer('Compare another browser')
    const browserAnswer = conversation.answers?.[1]
   const browserConflict =
  (browserAnswer === 'no' && otherBrowser === 'fails') ||
  (browserAnswer === 'yes' && otherBrowser === 'works')

const worksElsewhere =
  otherBrowser === 'works' ||
  (otherBrowser == null && browserAnswer === 'no')

   if (browserConflict) {
  recommendations.push(
    'What we found: The initial questionnaire and guided checks gave different results when comparing another browser.',
    'Possible explanation: The available answers do not establish whether the problem is specific to one browser.',
    'Recommended next step: Confirm whether the affected websites work in another browser before making changes. Share the confirmed results with IT support or a website professional.'
  )
} else if (otherSites === 'fails' && worksElsewhere) {
      recommendations.push(
        'What we found: Multiple websites have problems in the original browser, but another browser works normally.',
        'Possible explanation: The issue may be specific to the original browser, such as an extension, setting, or stored browsing data. This is not a confirmed diagnosis.',
        'Recommended next step: Use the working browser temporarily. Ask an IT support person or website professional to review the original browser before changing website settings.'
      )
    } else if (otherSites === 'works') {
      recommendations.push(
        'What we found: Other websites work in the original browser, so the problem may be limited to a particular website.',
        'Recommended next step: Record the affected website address and any error message, then share those details with the website owner or developer.'
      )
    } else if (otherSites === 'fails') {
      recommendations.push(
        'What we found: More than one website has problems in the original browser.',
        'Recommended next step: Compare another browser or device if available, then share the results with IT support or a website professional.'
      )
    } else {
      recommendations.push(
        'Recommended next step: Identify whether the browser itself fails, multiple websites fail, or only one website is affected. Share the findings with IT support or a website professional.'
      )
    }
  } else if (getCheckAnswer('Compare another phone') === 'both') {
    recommendations.push(
      'What we found: The reported mobile layout problem appears on more than one phone.',
      'Recommended next step: Have the website developer review the affected page on mobile devices. Avoid making untested changes to the live site.'
    )
  } else if (getCheckAnswer('Compare another phone') === 'one') {
    recommendations.push(
      'What we found: The mobile layout problem was reported on only one phone.',
      'Recommended next step: Record that phone and browser model and compare the affected page with another device before changing the website.'
    )
  } else if (getCheckAnswer('Compare a private browser window') === 'normal') {
    recommendations.push(
      'What we found: The problem disappears in a private browser window.',
      'Possible explanation: Browser-specific stored information or extensions may be involved, but the cause is unverified.',
      'Recommended next step: Share the browser details with a developer or IT support person before changing website settings.'
    )
  } else if (getCheckAnswer('Compare a private browser window') === 'still') {
    recommendations.push(
      'What we found: The problem also occurs in a private browser window.',
      'Recommended next step: Record the affected page addresses and browser details for a website developer to investigate.'
    )
  }

  if (clarificationNotes.length) {
    recommendations.push(
      'Please clarify the conflicting answers noted above before deciding on changes.'
    )
  }

  if (!recommendations.length) {
    recommendations.push(
      'The underlying cause has not been confirmed.',
      'Please review the reported issue and troubleshooting findings before recommending changes.'
    )
  }

  lines.push(
    '',
    '4. CURRENT STATUS',
    conversation.finalStatus || 'Not specified.',
    '',
    '5. RECOMMENDED NEXT STEPS',
    ...recommendations,
    '',
    '6. ADDITIONAL INFORMATION',
    'Website URL: [To be provided]',
    'Affected page(s): [To be provided]',
    'Screenshots: [Attach if available]',
    'Device/browser details: [To be provided]',
    '',
   'REPORT INFORMATION',
'Prepared by SiteSidekick',
'A website troubleshooting assistant developed by TB Designs.',
'',
'This report documents customer-provided information and troubleshooting findings.',
'The underlying technical cause has not been independently verified.'
  )

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

  const checks = conversation.checkResults || []
  const finalStatus = conversation.finalStatus || ''

  const findCheck = topic =>
    checks.find(check => check.topic === topic)

  const phoneCheck = findCheck('Compare another phone')
  const privateCheck = findCheck('Check a private browser window')
  const refreshCheck = findCheck('Refresh the affected page')

  const customerResolved =
    finalStatus === 'Customer reports that the problem is no longer occurring'

  const customerStillNeedsHelp =
    finalStatus === 'Customer still needs help after completing initial checks'

  const customerPartiallyResolved =
    finalStatus === 'Some improvement, but the customer still has concerns'

  if (customerResolved) {
    return {
      title: 'Your website appears to be working again',
      message: 'You reported that the problem is no longer occurring. Your troubleshooting findings have been saved. The underlying cause has not been confirmed, so keep an eye on the affected pages and contact your developer if the issue returns.',
      resolved: true
    }
  }

  if (customerStillNeedsHelp || customerPartiallyResolved) {
    const findings = []

    if (phoneCheck?.answer === 'both') {
      findings.push('The problem appears on more than one phone.')
    } else if (phoneCheck?.answer === 'one') {
      findings.push('The problem was reported on only one of the phones tested.')
    }

    if (privateCheck?.answer === 'still') {
      findings.push('The problem also occurs in a private browser window.')
    } else if (privateCheck?.answer === 'normal') {
      findings.push('The page appears normal in a private browser window.')
    }

    if (refreshCheck?.answer === 'still') {
      findings.push('Refreshing did not resolve the problem.')
    } else if (refreshCheck?.answer === 'fixed') {
      findings.push('Refreshing improved or resolved the problem during that check.')
    }

    const introduction = customerPartiallyResolved
      ? 'You reported some improvement, but concerns remain.'
      : 'You reported that the website problem is still occurring.'

    const findingsText = findings.length
      ? ` ${findings.join(' ')}`
      : ''

    return {
      title: customerPartiallyResolved
        ? 'Some website concerns still need attention'
        : 'Your website issue still needs attention',
      message: `${introduction}${findingsText} The underlying cause has not been confirmed. Share these findings and your troubleshooting summary with your website developer for further investigation.`,
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

  // Mobile layout problems
  const mobileIssue =
    /\b(mobile|phone|phones|iphone|android|smartphone)\b/i.test(issue) &&
    /\b(layout|menu|image|images|picture|pictures|photo|photos|spacing|design|looks|display|broken|messed up|wrong)\b/i.test(issue)

  if (mobileIssue) {
    add(
      'Compare another phone',
      'If another phone is available, open the affected page on it. Does the layout look wrong there too? If you do not have another phone, you can skip this check.',
      'You have compared how the page appears on another device.'
    )

    add(
      'Check a private browser window',
      'Open the same page in a private or incognito browser window on your phone. Does the layout still look wrong? You do not need to change any website settings.',
      'You have checked whether the problem also appears in a private browser window.'
    )

    add(
      'Refresh the affected page',
      'Refresh the affected page on your phone and compare the layout again. Do not edit or remove any pictures, plugins, or website settings.',
      'You have checked whether refreshing changes what appears on the page.'
    )

    return checks
  }

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
    const browserIssue =
      /\b(browser|chrome|firefox|safari|edge|incognito)\b/i.test(issue)

    if (browserIssue) {
      add(
        'Identify what is not working',
        'Check whether the browser opens normally and whether you can visit another familiar website. Do not change browser settings.',
        'Record whether the browser itself or a particular website appears affected.'
      )

      add(
        'Compare another website',
        'Try visiting a different familiar website in the same browser. Does that website work normally?',
        'Record whether the problem affects one website or multiple websites.'
      )

      add(
        'Compare another browser',
        'If another browser is available, open the affected website there. Do not install anything just for this check.',
        'Record whether the same problem occurs in another browser.'
      )
    } else {
      add(
        'Identify the affected pages',
        'Check whether the problem affects just one page or multiple pages. You do not need to make any changes.',
        'Record which pages are affected.'
      )

      add(
        'Compare a private browser window',
        'Open the affected page in a private or incognito window. Check whether the same problem appears.',
        'Record whether the problem also occurs in a private window.'
      )

      add(
        'Review when the problem started',
        'Think about when you first noticed the issue and whether anything changed around that time. Do not change any settings.',
        'Record whether the issue followed a recent change.'
      )
    }
  }

  return checks.slice(0, 3)
}

/* Developer handoff */

async function copySummary(textarea) {
  const text = textarea.value

  try {
    await navigator.clipboard.writeText(text)
    alert('Your developer summary has been copied.')
  } catch {
    textarea.focus()
    textarea.select()
    alert('Select and copy the highlighted summary.')
  }
}

function openEmailDraft(summary, container) {
  const subject = 'Website support request - SiteSidekick'
  const body = encodeURIComponent(summary)

  container.innerHTML = `
    <div class="notice">
      <strong>Get professional website help</strong>
      <p>You can open an email draft containing your troubleshooting summary. No message is sent automatically.</p>
      <a
        class="secondary-button"
        href="mailto:${escapeHTML(SUPPORT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${body}"
      >
        Open email draft
      </a>
    </div>
  `
}

/*
 * Guided self-help.
 * Collects actual findings from mobile troubleshooting checks.
 */
function showSelfHelp(conversation, container) {
  const checks = isHighRisk(conversation) ? [] : buildSelfHelpChecks(conversation)
  const results = [...(conversation.checkResults || [])]
  let index = results.length

  function updateResults() {
    conversation.checkResults = results
    saveConversation(conversation)
  }

  function showDeveloperHandoff(title, message) {
    conversation.finalStatus =
      conversation.finalStatus || 'Professional assistance recommended'

    updateResults()

    container.innerHTML = `
      <div class="notice">
        <strong>${escapeHTML(title)}</strong>
        <p>${escapeHTML(message)}</p>
      </div>

      <label for="self-help-summary">Your developer summary</label>
      <textarea id="self-help-summary" rows="10">${escapeHTML(conversationSummary(conversation))}</textarea>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
        <button type="button" class="secondary-button" id="self-help-copy">
          Share This With My Developer
        </button>

        <button type="button" class="secondary-button" id="self-help-contact">
          Get Professional Help
        </button>
      </div>

      <div id="self-help-email-options"></div>
    `

    container.querySelector('#self-help-copy').addEventListener('click', () => {
      copySummary(container.querySelector('#self-help-summary'))
    })

    container.querySelector('#self-help-contact').addEventListener('click', () => {
      openEmailDraft(
        container.querySelector('#self-help-summary').value,
        container.querySelector('#self-help-email-options')
      )
    })
  }

  function finishChecks() {
    const refreshFixed = results.some(
      result =>
        result.topic === 'Refresh the affected page' &&
        result.answer === 'fixed'
    )

    container.innerHTML = `
      <div class="notice">
        <strong>${refreshFixed
          ? 'Refreshing appears to have fixed the problem.'
          : 'You have completed the initial website checks.'}</strong>
        <p>${refreshFixed
          ? 'The layout now appears normal after refreshing. We will record that result, but the underlying cause has not been confirmed.'
          : 'We have recorded what you found. Are you still experiencing these problems?'}</p>
      </div>

      <div style="display:grid;gap:10px;margin:12px 0;">
        <button type="button" class="secondary-button" data-final="resolved">
          No, everything is working now
        </button>

        <button type="button" class="secondary-button" data-final="some">
          Some things improved, but I still have problems
        </button>

        <button type="button" class="secondary-button" data-final="unresolved">
          Yes, I still need help
        </button>
      </div>
    `

    container.querySelectorAll('[data-final]').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.dataset.final

        if (answer === 'resolved') {
          conversation.finalStatus =
            'Customer reports that the problem is no longer occurring'

          showDeveloperHandoff(
            'Your website appears to be working again',
            'You reported that the problem is no longer occurring. Your findings have been saved in Issue History. If it returns, share the summary with your developer.'
          )
          return
        }

        if (answer === 'some') {
          conversation.finalStatus =
            'Some improvement, but the customer still has concerns'

          showDeveloperHandoff(
            'Some concerns still need attention',
            'Even if something has improved, the remaining concerns deserve a closer look. Share your findings with a developer so they can investigate safely.'
          )
          return
        }

        conversation.finalStatus =
          'Customer still needs help after completing initial checks'

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
    const isPhoneComparison = check.topic === 'Compare another phone'
    const isPrivateWindow = check.topic === 'Check a private browser window'
    const isRefresh = check.topic === 'Refresh the affected page'


    const choices = isPhoneComparison
      ? [
          ['both', 'The layout looks wrong on both phones'],
          ['one', 'The layout only looks wrong on my phone'],
          ['skip', "I don't have another phone to check"],
          ['help', "I'd rather get professional help"]
        ]
      : isPrivateWindow
        ? [
            ['still', 'The layout still looks wrong in the private window'],
            ['normal', 'The layout looks normal in the private window'],
            ['skip', "I haven't checked"],
            ['help', "I'd rather get professional help"]
          ]
        : isRefresh
          ? [
              ['fixed', 'Refreshing fixed the problem'],
              ['still', 'The problem is still there'],
              ['skip', "I haven't tried refreshing"],
              ['help', "I'd rather get professional help"]
            ]
          : ({
              'Identify what is not working': [
                ['browser', 'The browser itself will not open or work'],
                ['website', 'The browser works, but a website has problems'],
                ['unsure', "I'm not sure"],
                ['help', "I'd rather get professional help"]
              ],
              'Compare another website': [
                ['works', 'Other websites work normally'],
                ['fails', 'Other websites have problems too'],
                ['skip', "I haven't checked"],
                ['help', "I'd rather get professional help"]
              ],
              'Compare another browser': [
                ['works', 'The website works in another browser'],
                ['fails', 'The problem happens in another browser too'],
                ['skip', "I don't have another browser to check"],
                ['help', "I'd rather get professional help"]
              ],
              'Identify the affected pages': [
                ['one', 'Only one page is affected'],
                ['multiple', 'Multiple pages are affected'],
                ['unsure', "I'm not sure"],
                ['help', "I'd rather get professional help"]
              ],
              'Compare a private browser window': [
                ['still', 'The problem also happens in a private window'],
                ['normal', 'The problem disappears in a private window'],
                ['skip', "I haven't checked"],
                ['help', "I'd rather get professional help"]
              ],
              'Review when the problem started': [
                ['recent', 'It started after a recent website change'],
                ['sudden', 'It started suddenly without a known change'],
                ['ongoing', 'It has been happening for a while'],
                ['unsure', "I'm not sure"],
                ['help', "I'd rather get professional help"]
              ]
            }[check.topic] || [
              ['yes', 'Yes, I completed this check'],
              ['no', 'Not yet'],
              ['help', "I'd rather get professional help"]
            ])

    container.innerHTML = `
      <div class="notice">
        <strong>Step ${index + 1} of ${checks.length}: ${escapeHTML(check.topic)}</strong>
        <p>${escapeHTML(check.instructions)}</p>
        <p><strong>${isPhoneComparison || isPrivateWindow || isRefresh
          ? 'What did you find?'
          : ' What did you find?'}</strong></p>
      </div>

      <div style="display:grid;gap:10px;margin:12px 0;">
        ${choices.map(([value, label]) => `
          <button
            type="button"
            class="secondary-button"
            data-check="${escapeHTML(value)}"
            style="text-align:left;"
          >
            ${escapeHTML(label)}
          </button>
        `).join('')}
      </div>
    `

    
    container.querySelectorAll('[data-check]').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.dataset.check
        const choice = choices.find(item => item[0] === answer)

        if (!choice) return

        // Confirm the answer before saving or advancing.
        const confirmation = document.createElement('div')
        confirmation.className = 'ssk-answer-confirmation'
        confirmation.innerHTML = `
          <p class="ssk-confirm-label">YOUR SELECTED ANSWER</p>
          <p class="ssk-confirm-answer">${escapeHTML(choice[1])}</p>
          <p>Is this what you meant to select?</p>
          <div class="ssk-confirm-actions">
            <button type="button" class="secondary-button" data-change-answer>
              Change Answer
            </button>
            <button type="button" class="secondary-button ssk-confirm-continue" data-confirm-answer>
              Yes, Continue
            </button>
          </div>
        `

        // Hide the choices temporarily, without deleting them.
        const choiceButtons = [
          ...container.querySelectorAll('[data-check]')
        ]

        choiceButtons.forEach(item => {
          item.disabled = true
        })

        container.appendChild(confirmation)

        confirmation.querySelector('[data-change-answer]')
          .addEventListener('click', () => {
            confirmation.remove()
            choiceButtons.forEach(item => {
              item.disabled = false
            })
          })

        confirmation.querySelector('[data-confirm-answer]')
          .addEventListener('click', () => {
            // Prevent duplicate submissions.
            confirmation.querySelectorAll('button')
              .forEach(item => {
                item.disabled = true
              })

            results.push({
              topic: check.topic,
              answer,
              finding: choice[1]
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
              feedback.className = 'ssk-check-feedback'

              if (isPhoneComparison) {
                feedback.textContent =
                  answer === 'both'
                    ? 'The issue appears on more than one phone. Next, we will check whether the browser makes a difference.'
                    : answer === 'one'
                      ? 'The issue may be specific to one phone or browser. Let us compare a private window next.'
                      : 'We can continue without another phone.'

              } else if (isPrivateWindow) {
                feedback.textContent =
                  answer === 'still'
                    ? 'The layout also looks wrong in a private window. Next, we will check whether refreshing changes it.'
                    : answer === 'normal'
                      ? 'The layout looks normal in a private window. Browser-specific stored information may be involved, but the cause is not confirmed.'
                      : 'We can continue without checking a private window.'

              } else if (isRefresh) {
                feedback.textContent =
                  answer === 'fixed'
                    ? 'Refreshing appears to have fixed the problem.'
                    : answer === 'still'
                      ? 'Refreshing did not fix the problem.'
                      : 'The refresh check was not completed.'

              } else {
                feedback.textContent =
                  answer === 'yes'
                    ? check.success
                    : 'We can continue without completing that check.'
              }

              container.prepend(feedback)
            }
          })
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
  This guidance is based on the information you provide.
  SiteSidekick does not independently inspect your website,
  book services, or send messages on your behalf.
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
/*
 * SiteSidekick Legal & Privacy information.
 * Prototype disclosures — review before public launch.
 */
function showLegal(section = '') {
  setView('legal')

  legalPanel.innerHTML = `
    <p class="eyebrow">INFORMATION & TRANSPARENCY</p>
    <h1 id="ssk-legal-title">Legal &amp; Privacy</h1>

    <p>
      SiteSidekick is an independently developed website troubleshooting
      assistant created by TB Designs. It provides guided troubleshooting,
      optional AI assistance, and developer handoff reports.
    </p>

    <p>
      <strong>Prototype notice:</strong>
      SiteSidekick is currently a demonstration application.
      The following information describes its intended operation and
      limitations. These disclosures must be reviewed against the
      deployed application's actual behavior before public launch.
    </p>

    <nav class="ssk-legal-toc" aria-label="Legal page sections">
      <a href="#ssk-privacy">Privacy Policy</a>
      <a href="#ssk-terms">Terms of Use</a>
      <a href="#ssk-ai-disclosure">AI Disclosure</a>
      <a href="#ssk-disclaimer">Troubleshooting Disclaimer</a>
      <a href="#ssk-cookies">Cookies &amp; Analytics</a>
      <a href="#ssk-meta-legal">Meta AI Legal Documents</a>
    </nav>

    <section id="ssk-privacy" class="ssk-policy-section">
      <h2>Privacy Policy</h2>
      <p><strong>Last updated:</strong> October 31, 2026</p>

      <h3>Information you provide</h3>
      <p>
        SiteSidekick processes website issue descriptions, answers to
        troubleshooting questions, recorded checks, and other information
        you voluntarily enter.
      </p>

      <h3>Saved troubleshooting history</h3>
      <p>
        The current prototype uses browser local storage to save
        troubleshooting sessions. Information stored in your browser
        may remain available until it is deleted or the browser's
        stored data is cleared.
      </p>

      <h3>AI processing</h3>
      <p>
        When optional AI assistance is requested, troubleshooting
        information is transmitted to SiteSidekick's backend and
        submitted to Meta's Model API for processing.
        Do not enter passwords, API keys, payment information,
        or sensitive personal information.
      </p>

      <h3>Data retention and third parties</h3>
      <p>
        The prototype's browser history and backend AI requests have
        different data-handling processes. Third-party processing,
        hosting logs, and retention practices require additional
        verification before a public release.
      </p>

      <h3>Privacy questions</h3>
      <p>
        Contact TB Designs using the support contact provided
        within SiteSidekick.
      </p>
    </section>

    <section id="ssk-terms" class="ssk-policy-section">
      <h2>Terms of Use</h2>
      <p><strong>Last updated:</strong> October 31, 2026</p>
      <p>
        SiteSidekick is provided as a demonstration of website
        troubleshooting assistance. Its guidance is informational
        and should not be treated as a guarantee that any website
        issue will be diagnosed or resolved.
      </p>
      <p>
        Users are responsible for reviewing suggestions before taking
        action. Do not use SiteSidekick to access systems without
        authorization, expose confidential information, or perform
        unlawful activities.
      </p>
      <p>
        Features, availability, and functionality may change during
        development. The prototype does not represent an active
        paid subscription agreement.
      </p>
    </section>

    <section id="ssk-ai-disclosure" class="ssk-policy-section">
      <h2>AI Disclosure</h2>
      <p>
        SiteSidekick offers optional AI-generated troubleshooting
        assistance powered by Meta Muse Wonder through Meta's Model API.
      </p>
      <p>
        When you request AI assistance, your issue description,
        troubleshooting answers, and relevant findings may be
        transmitted for AI processing.
      </p>
      <p>
        AI responses can contain mistakes, omissions, or incorrect
        assumptions. SiteSidekick does not independently inspect
        your website or verify every recommendation.
      </p>
      <p>
        Avoid submitting confidential information. Review all
        recommendations and consult a qualified professional
        when necessary.
      </p>
    </section>

    <section id="ssk-disclaimer" class="ssk-policy-section">
      <h2>Website Troubleshooting Disclaimer</h2>
      <p>
        SiteSidekick provides general educational and troubleshooting
        information. It does not guarantee website availability,
        security, accessibility, performance, or successful repairs.
      </p>
      <p>
        Possible causes are not confirmed diagnoses. Changes involving
        hosting, payments, security, databases, backups, or production
        systems should be evaluated by an appropriate professional.
      </p>
      <p>
        SiteSidekick does not automatically make changes to your website
        through its guided troubleshooting feature.
      </p>
    </section>

    <section id="ssk-cookies" class="ssk-policy-section">
      <h2>Cookies &amp; Analytics</h2>
      <p>
        The current prototype uses browser storage to maintain saved
        troubleshooting sessions. Browser local storage is different
        from an HTTP cookie.
      </p>
      <p>
        Google Analytics has not yet been added as part of the
        development steps in this project. If analytics or other
        tracking technologies are introduced, this section must be
        updated to accurately disclose their operation and any
        applicable consent choices.
      </p>
      <p>
        Hosting providers and other infrastructure may have separate
        logging or storage practices that must be verified before
        public launch.
      </p>
    </section>

    <section id="ssk-meta-legal" class="ssk-policy-section">
      <h2>Meta AI Legal Documents</h2>
      <p>
        SiteSidekick uses Meta AI technology but is independently
        developed by TB Designs. It is not affiliated with or
        endorsed by Meta.
      </p>
      <p>
        The following links lead to official Meta documentation.
        Meta controls and may update these documents.
      </p>

      <ul>
        <li>
          <a href="https://dev.meta.ai/legal"
             target="_blank" rel="noopener noreferrer">
            Meta AI Developer Legal Center ↗
          </a>
        </li>
        <li>
          <a href="https://dev.meta.ai/legal/terms-of-service"
             target="_blank" rel="noopener noreferrer">
            Meta Model API Terms of Service ↗
          </a>
        </li>
        <li>
          <a href="https://dev.meta.ai/legal/acceptable-use-policy"
             target="_blank" rel="noopener noreferrer">
            Meta Acceptable Use Policy ↗
          </a>
        </li>
        <li>
          <a href="https://dev.meta.ai/legal/geographic-use-policy"
             target="_blank" rel="noopener noreferrer">
            Meta Geographic Use Policy ↗
          </a>
        </li>
      </ul>

      <p>
        These third-party documents supplement, but do not replace,
        SiteSidekick's own privacy disclosures and terms.
      </p>
    </section>
  `

  if (section) {
    const target = document.getElementById(section)

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      return
    }
  }

  legalPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
/*
 * Saved session display.
 * Updated to show the customer's recorded findings.
 */

/*
 * Saved session display.
 * Shows the customer's recorded findings and updated recommendation.
 */
function showSavedSession(session) {
  setView('overview')
  resultPanel.hidden = false

  const transcript = session.transcript || []
  const checks = session.checkResults || []

  const updatedOutcome = conversationOutcome({
    description: session.description || '',
    type: session.type === 'conversation'
      ? getConversationType(session.description || '')
      : session.type || 'general',
    answers: [],
    transcript,
    checkResults: checks,
    finalStatus: session.finalStatus || ''
  })

  resultPanel.innerHTML = `
    <p class="eyebrow">SAVED CONVERSATION</p>
    <h2>${escapeHTML(updatedOutcome.title || 'Website troubleshooting')}</h2>
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
            check.finding || (
              check.answer === 'yes' ? 'Completed' :
              check.answer === 'no' ? 'Not completed' :
              check.answer === 'skip' ? 'Not checked' :
              'Requested professional help'
            )
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
      <p>${escapeHTML(updatedOutcome.message || '')}</p>
    </div>

    <label for="saved-summary">Developer summary</label>
    <textarea id="saved-summary" rows="16">${escapeHTML(conversationSummary({
  description: session.description || '',
  transcript: session.transcript || [],
  checkResults: session.checkResults || [],
  finalStatus: session.finalStatus || ''
}))}</textarea>

<div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
      <button type="button" class="secondary-button" id="saved-copy">
        Share With My Developer
      </button>

      <button type="button" class="secondary-button" id="back-to-history">
        Back to issue history
      </button>

      <button type="button" class="secondary-button" id="new-session">
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

 

  const savedConversationForAI = {
    description: session.description || '',
    type: getConversationType(session.description || ''),
    answers: [],
    transcript: session.transcript || [],
    checkResults: session.checkResults || [],
    finalStatus: session.finalStatus || ''
  }

  checkSiteSidekickAI(savedConversationForAI)


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

const businessGuideButton = document.querySelector('#ssk-business-guide-button')
const businessGuide = document.querySelector('#ssk-business-guide')

businessGuideButton.addEventListener('click', () => {
  const isOpening = businessGuide.hidden

  businessGuide.hidden = !isOpening
  businessGuideButton.setAttribute('aria-expanded', String(isOpening))
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
// Open the Legal & Privacy page
legalLink.addEventListener('click', event => {
  event.preventDefault()
  window.location.hash = 'legal'
  showLegal()
})
// Open the correct policy when a footer legal link is clicked
document.querySelectorAll('.ssk-footer-legal a[href^="#ssk-"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()

    const sectionId = link.getAttribute('href').substring(1)

    showLegal(sectionId)

    window.history.replaceState(null, '', '#' + sectionId)
  })
})

overviewLink.addEventListener('click', event => {
  event.preventDefault()
  resetSession()
})

document.querySelector('#home-link').addEventListener('click', event => {
  event.preventDefault()
  resetSession()
})

/* =========================================================
   SiteSidekick: Optional Meta AI Companion
   Preserves existing troubleshooting, history, and handoff.
   Live AI remains controlled by the backend's AI_ENABLED flag.
   ========================================================= */

let siteSidekickAIAvailable = false
let siteSidekickAIRequestPending = false


async function checkSiteSidekickAI(conversation = null) {
  try {
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/health`)

    if (!response.ok) {
      throw new Error('Backend unavailable')
    }

    const health = await response.json()

    siteSidekickAIAvailable =
      health.configured === true &&
      health.aiEnabled === true
  } catch {
    siteSidekickAIAvailable = false
  }

  const currentConversation = conversation || activeConversation

  if (currentConversation && !resultPanel.hidden) {
    showSiteSidekickAI(currentConversation)
  }
}



function showSiteSidekickAI(conversation) {
  const existingPanel = resultPanel.querySelector('#ai-companion')

  if (existingPanel) existingPanel.remove()

  const aiUnavailable = !siteSidekickAIAvailable
  const aiRestricted =
    isHighRisk(conversation) || wantsProfessionalHelp(conversation)

  const panel = document.createElement('div')
  panel.id = 'ai-companion'
  panel.className = 'notice ssk-ai-panel'

  panel.innerHTML = `
    <div class="ssk-ai-heading">
      <div>
        <span class="ssk-ai-eyebrow">ADDITIONAL SUPPORT</span>
        <h3>Optional AI Guidance</h3>
        <p class="ssk-ai-intro">
          Get an additional explanation of your website issue,
          possible causes, and practical next steps.
        </p>
      </div>
      <span class="ssk-ai-provider">Powered by Meta AI</span>
    </div>

    <div class="ssk-ai-info">
      <p>
        SiteSidekick uses Meta Muse Wonder to provide optional
        AI-generated troubleshooting guidance. When you request
        assistance, your website issue description, troubleshooting
        answers, and relevant findings will be sent to Meta
        for processing.
      </p>

      <p>
        AI-generated recommendations may be inaccurate and are not
        confirmed technical diagnoses. Do not share passwords,
        API keys, payment information, or other sensitive
        personal information.
      </p>
    </div>

    <div class="ssk-ai-consent-section">
      <label class="ssk-ai-consent-label">
        <input
          type="checkbox"
          id="ssk-ai-consent"
        >
        <span>
          I understand that my troubleshooting information will
          be submitted to Meta AI for processing, and I agree
          to proceed.
        </span>
      </label>

      <p class="ssk-ai-consent-links">
        Review our
        <a href="#ssk-privacy">Privacy Policy</a>
        and
        <a href="#ssk-ai-disclosure">AI Disclosure</a>.
      </p>
    </div>

    <p
      id="ssk-ai-status"
      class="ssk-ai-status"
      role="status"
      aria-live="polite"
    ></p>

    <button
      type="button"
      class="secondary-button ssk-ai-button"
      id="ask-sitesidekick-ai"
    >
      Ask SiteSidekick AI
    </button>

    <div
      id="sitesidekick-ai-response"
      class="ssk-ai-response"
      aria-live="polite"
    ></div>
  `

  // Keep AI guidance directly below the troubleshooting actions.
  const actionButtons = resultPanel.querySelector('#copy-summary')

  if (actionButtons) {
    const actionsContainer = actionButtons.parentElement
    actionsContainer.insertAdjacentElement('afterend', panel)
  } else {
    resultPanel.appendChild(panel)
  }

  const button = panel.querySelector('#ask-sitesidekick-ai')
  const output = panel.querySelector('#sitesidekick-ai-response')
  const consentCheckbox = panel.querySelector('#ssk-ai-consent')
  const status = panel.querySelector('#ssk-ai-status')

  function updateAIButton() {
    button.disabled =
      aiUnavailable ||
      aiRestricted ||
      !consentCheckbox.checked ||
      siteSidekickAIRequestPending

    if (siteSidekickAIRequestPending) {
      status.textContent = 'SiteSidekick AI is preparing your guidance.'
    } else if (aiRestricted) {
      status.textContent =
        'AI guidance is unavailable for this issue. Please use the professional support options provided above.'
    } else if (aiUnavailable) {
      status.textContent =
        'AI guidance is temporarily unavailable. Guided troubleshooting is still available.'
    } else if (!consentCheckbox.checked) {
      status.textContent =
        'Check the consent box above to enable AI guidance.'
    } else {
      status.textContent =
        'AI guidance is ready. Select the button below when you want to continue.'
    }
  }

  updateAIButton()

  consentCheckbox.addEventListener('change', updateAIButton)

  button.addEventListener('click', async () => {
    if (
      siteSidekickAIRequestPending ||
      aiUnavailable ||
      aiRestricted ||
      !consentCheckbox.checked
    ) return

    siteSidekickAIRequestPending = true
    button.disabled = true
    button.textContent = 'Waiting for AI...'
    output.textContent = ''
    updateAIButton()

    const messages = [
      {
        role: 'user',
        content: `
Analyze this website troubleshooting case for a small-business owner.

CUSTOMER INFORMATION:
${conversationSummary(conversation)}

YOUR TASK:
1. Summarize what the customer is experiencing.
2. Explain what the completed troubleshooting checks tell us.
3. Identify up to three plausible causes, clearly labeling them as possibilities rather than confirmed diagnoses.
4. Recommend safe, practical next steps the customer can take.
5. Explain what information a website developer would need to investigate further.

IMPORTANT RULES:
- Do not claim to have inspected or accessed the website.
- Do not invent test results.
- Do not claim the root cause is confirmed.
- Do not recommend editing live code, disabling security, or making risky changes.
- Use clear language suitable for someone without technical experience.
- Keep the response concise and actionable.
`.trim().slice(0, 4000)
      }
    ]

try {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'AI is unavailable.')
      }

      if (typeof data.reply !== 'string') {
        throw new Error('Unexpected AI response.')
      }

      // Format and sanitize the Meta AI response.
      const formattedReply = marked.parse(data.reply, {
        gfm: true,
        breaks: true
      })

      output.innerHTML = DOMPurify.sanitize(formattedReply)
    } catch (error) {
      output.textContent =
        error.message ||
        'AI is unavailable. Guided troubleshooting still works.'
    } finally {
      siteSidekickAIRequestPending = false
      updateAIButton()
      button.textContent = 'Ask SiteSidekick AI'
    }
  })
}


// Extend the existing conversation display without replacing it.
const originalSiteSidekickRenderConversation = renderConversation

renderConversation = function (conversation) {
  originalSiteSidekickRenderConversation(conversation)
  showSiteSidekickAI(conversation)
}

// Check the local backend without contacting Meta.
checkSiteSidekickAI()




