import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Accessibility() {
  return (
    <LegalLayout title="Accessibility Statement" updated="June 2026">
      <h2>Our commitment</h2>
      <p>
        This site is built to WCAG 2.1 Level AA, the standard referenced by the ADA for web
        accessibility. We review and update our accessibility practices on an ongoing basis.
      </p>

      <h2>What we have done</h2>
      <p>We have taken the following steps to make this site more accessible:</p>
      <ul>
        <li>
          Skip links are provided so keyboard and screen reader users can bypass navigation and get
          straight to the main content.
        </li>
        <li>
          A visible outline appears on every interactive element when navigated by keyboard, so focus
          is always clear.
        </li>
        <li>
          Text colors meet the 4.5:1 minimum contrast ratio for readability by people with low
          vision.
        </li>
        <li>
          All form fields, buttons, and interactive elements have descriptive labels for screen
          reader users.
        </li>
        <li>
          Animations automatically reduce for users who have the Reduce Motion preference enabled on
          their device.
        </li>
      </ul>

      <h2>Report an issue</h2>
      <p>
        If you encounter any accessibility barrier on this site, please contact us and we will
        address it promptly. You can reach us by phone at{' '}
        <a href={company.phoneHref}>{company.phone}</a>.
      </p>
    </LegalLayout>
  )
}
