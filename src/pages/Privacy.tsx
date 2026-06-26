import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="May 2026">
      <p>
        This Privacy Policy explains how {company.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) handles information collected through this website,{' '}
        {company.addressOneLine}. By using this site, you agree to the practices described below.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We only collect the information you choose to give us. When you submit our contact or
        employment form, we collect the details you enter — such as your name, email address, phone
        number, the subject of your inquiry, and your message. We do not require you to create an
        account or provide payment information on this website.
      </p>
      <p>
        Like most websites, our hosting provider may automatically log basic technical information
        (such as IP address, browser type, and pages visited) to keep the site secure and running
        well. This information is not used to personally identify you.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your questions, reservations, catering requests, and messages.</li>
        <li>To review and follow up on employment applications.</li>
        <li>To improve our website and the service we provide.</li>
      </ul>
      <p>
        We do not sell or rent your personal information. We will never share it except as needed to
        operate this website (for example, our form and hosting providers) or as required by law.
      </p>

      <h2>Cookies &amp; Analytics</h2>
      <p>
        This site may use essential cookies and basic, privacy-respecting analytics to understand how
        visitors use the site. You can control or disable cookies through your browser settings; the
        site will still work without them.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our website links to outside services such as Facebook, Yelp, and Google Maps. We are not
        responsible for the privacy practices of those sites — please review their policies
        separately.
      </p>

      <h2>Children&rsquo;s Privacy</h2>
      <p>
        This website is intended for a general audience and is not directed at children under 13. We
        do not knowingly collect personal information from children.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request that we update or delete the information you&rsquo;ve submitted through this
        site at any time by calling us at {company.phone} or emailing {company.email}.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this Privacy Policy? Reach {company.name} at {company.phone},{' '}
        {company.email}, or {company.addressOneLine}.
      </p>
    </LegalLayout>
  )
}
