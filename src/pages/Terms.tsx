import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="May 2026">
      <p>
        Welcome to the {company.name} website. By accessing or using this site, you agree to these
        Terms of Service. If you do not agree, please do not use the site.
      </p>

      <h2>Use of This Website</h2>
      <p>
        This website is provided to share information about {company.name}, including our menu, hours,
        location, catering, and employment opportunities. You agree to use the site only for lawful
        purposes and not to interfere with its operation or security.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        We work to keep menu items, prices, hours, and event details accurate and current, but they
        are subject to change without notice. The printed in-house menu and a phone call to{' '}
        {company.phone} are always the most reliable source. We are not liable for any errors or
        outdated information on this website.
      </p>

      <h2>Forms &amp; Submissions</h2>
      <p>
        Submitting a contact, catering, reservation, or employment form does not create a contract or
        guarantee of service, availability, or employment. We will follow up with you directly to
        confirm any request.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The Becker&rsquo;s name, logo, photos, and the content on this site are the property of{' '}
        {company.name} or used with permission. You may not copy, reproduce, or reuse them without our
        written consent.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        This site links to third-party services such as Facebook, Yelp, and Google Maps. We are not
        responsible for the content, policies, or availability of those external sites.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        This website is provided on an &ldquo;as is&rdquo; basis. To the fullest extent permitted by
        law, {company.name} is not liable for any damages arising from your use of, or inability to
        use, this site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the website after changes are
        posted means you accept the updated Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these Terms? Reach {company.name} at {company.phone}, {company.email}, or{' '}
        {company.addressOneLine}.
      </p>
    </LegalLayout>
  )
}
