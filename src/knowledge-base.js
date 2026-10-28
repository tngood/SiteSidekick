/* SiteSidekick knowledge base. Guidance is not a confirmed diagnosis. */
export const knowledgeBase = [
  {
    id: 'SS-001', category: 'Mobile layout', question: 'My website looks wrong on mobile but fine on desktop.',
    keywords: ['mobile', 'phone', 'responsive', 'layout', 'spacing'],
    followUp: 'Does the problem affect the whole page or only one section?',
    possibleCauses: ['Responsive layout settings', 'Fixed element widths', 'Oversized images', 'Mobile spacing or custom CSS'],
    safeSteps: ['Identify the exact section that looks wrong.', 'Check the page in a private browser window on your phone.', 'Note which devices and pages are affected.'],
    avoid: 'Do not remove CSS or disable plugins without identifying the problem.',
    verify: 'Check the affected page at several screen widths.',
    escalate: 'Request developer assistance if custom code or theme files need modification.', risk: 'Low'
  },
  {
    id: 'SS-002', category: 'Website performance', question: 'My website is loading slowly.',
    keywords: ['slow', 'loading', 'speed', 'performance', 'pagespeed'],
    followUp: 'Is the entire website slow, or just one or two pages?',
    possibleCauses: ['Large images', 'Caching problems', 'Plugins or third-party scripts', 'Hosting limitations', 'A recent update or configuration change'],
    safeSteps: ['Identify which pages are slow.', 'Try another device or connection.', 'Run Google PageSpeed Insights to establish a baseline.'],
    avoid: 'Do not disable multiple plugins or change caching settings all at once.',
    verify: 'Compare page performance before and after each test.',
    escalate: 'Contact hosting support or a developer if server errors or resource limits are suspected.', risk: 'Medium'
  },
  {
    id: 'SS-006', category: 'Page not found', question: 'My website shows a 404 Page Not Found error.',
    keywords: ['404', 'not found', 'missing page', 'broken link'],
    followUp: 'Does the error affect one page, several pages, or your homepage?',
    possibleCauses: ['Old or changed page addresses', 'Broken links', 'Browser cache', 'Website routing configuration'],
    safeSteps: ['Check whether the homepage loads.', 'Try an affected page in a private browser window.', 'If it works there, refresh the page in your regular browser.'],
    avoid: 'Do not change website routing or permalink settings without a backup and a recovery plan.',
    verify: 'Check each affected page in a regular and private browser window.',
    escalate: 'If multiple pages still show errors, ask a developer to investigate.', risk: 'Medium'
  },
  {
    id: 'SS-016', category: 'Search visibility', question: 'My business does not rank well in Google search results.',
    keywords: ['rank', 'ranking', 'google', 'search results', 'seo', 'page 15', 'visibility'],
    followUp: 'Were you searching for your business name, a service, or a service plus your location?',
    possibleCauses: ['Competition for the search term', 'Page content not matching search intent', 'Indexing or technical SEO issues', 'Limited visibility for the target search'],
    safeSteps: ['Record the exact search phrase you used.', 'Check whether your service pages clearly explain what you offer.', 'Check whether visitors can find those pages from your navigation.'],
    avoid: 'Do not assume Google Business Profile is required for organic indexing or that rankings can be guaranteed.',
    verify: 'Review relevant queries and pages in Google Search Console if you have access.',
    escalate: 'Request an SEO review if visibility remains poor for important service searches.', risk: 'Low'
  },
  {
    id: 'SS-026', category: 'Website review', question: 'My website feels outdated and may need a redesign.',
    keywords: ['old', 'outdated', 'redesign', 'modern', 'refresh', 'rebuild'],
    followUp: 'Which concerns you most: the appearance, the speed, or getting found by customers?',
    possibleCauses: ['Older design or content', 'Performance issues', 'Search visibility problems', 'Unclear customer journeys'],
    safeSteps: ['List the pages and features that need attention.', 'Check whether the current website still supports your business goals.', 'Request an assessment before committing to a rebuild.'],
    avoid: 'Do not assume an older website automatically needs to be replaced.',
    verify: 'Compare the assessment findings with your business priorities and budget.',
    escalate: 'Consider a professional website assessment for multiple ongoing issues.', risk: 'Low'
  }
]
