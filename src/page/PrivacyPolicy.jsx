import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Privacy Policy | Carry Exchange</title>
        <meta name="description" content="Read Carry Exchange's Privacy Policy to understand how we collect, use, and protect your personal data." />
        <link rel="canonical" href="https://carry.exchange/privacy-policy" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: January 28, 2026</p>
          </div>

          <div className="prose prose-invert prose-purple max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Carry. We respect your privacy and are committed to
                protecting your personal data. This privacy policy will inform
                you about how we look after your personal data when you visit
                our platform and tell you about your privacy rights and how the
                law protects you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                2. Information We Collect
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may collect, use, store and transfer different kinds of
                personal data about you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>
                  <strong className="text-white">Identity Data:</strong> First
                  name, last name, username or similar identifier
                </li>
                <li>
                  <strong className="text-white">Contact Data:</strong> Email
                  address and telephone numbers
                </li>
                <li>
                  <strong className="text-white">Financial Data:</strong> Bank
                  account and payment card details
                </li>
                <li>
                  <strong className="text-white">Transaction Data:</strong>{" "}
                  Details about payments to and from you and other details of
                  products and services you have purchased from us
                </li>
                <li>
                  <strong className="text-white">Technical Data:</strong>{" "}
                  Internet protocol (IP) address, browser type and version, time
                  zone setting and location, browser plug-in types and versions,
                  operating system and platform
                </li>
                <li>
                  <strong className="text-white">Usage Data:</strong>{" "}
                  Information about how you use our platform, products and
                  services
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We will only use your personal data when the law allows us to.
                Most commonly, we will use your personal data in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>To register you as a new customer</li>
                <li>To process and deliver your trading orders</li>
                <li>To manage our relationship with you</li>
                <li>To enable you to participate in surveys or competitions</li>
                <li>To administer and protect our business and platform</li>
                <li>
                  To deliver relevant platform content and advertisements to you
                </li>
                <li>
                  To use data analytics to improve our platform,
                  products/services, marketing, customer relationships and
                  experiences
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                4. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We have put in place appropriate security measures to prevent
                your personal data from being accidentally lost, used or
                accessed in an unauthorized way, altered or disclosed. We limit
                access to your personal data to those employees, agents,
                contractors and other third parties who have a business need to
                know.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                5. Data Retention
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We will only retain your personal data for as long as necessary
                to fulfill the purposes we collected it for, including for the
                purposes of satisfying any legal, accounting, or reporting
                requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                6. Your Legal Rights
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Under certain circumstances, you have rights under data
                protection laws in relation to your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                Our platform uses cookies to distinguish you from other users.
                This helps us to provide you with a good experience when you
                browse our platform and also allows us to improve our platform.
                You can set your browser to refuse all or some browser cookies,
                or to alert you when websites set or access cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                8. Third-Party Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our platform may include links to third-party websites, plug-ins
                and applications. Clicking on those links or enabling those
                connections may allow third parties to collect or share data
                about you. We do not control these third-party websites and are
                not responsible for their privacy statements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date at the top of
                this Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                10. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="bg-surface-light border border-gray-800 rounded-xl p-6 space-y-2">
                <p className="text-gray-300">Email: privacy@carry.com</p>
                <p className="text-gray-300">
                  Data Protection Officer: dpo@carry.com
                </p>
                <p className="text-gray-300">Address: [Your Company Address]</p>
              </div>
            </section>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              to="/terms-and-conditions"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Terms and Conditions →
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
