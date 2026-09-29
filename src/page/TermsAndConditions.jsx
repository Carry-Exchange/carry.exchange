import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Terms and Conditions | Carry Exchange</title>
        <meta name="description" content="Read the Terms and Conditions for using Carry Exchange, the AI-powered commodity trading platform." />
        <link rel="canonical" href="https://carry.exchange/terms-and-conditions" />
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
              Terms and Conditions
            </h1>
            <p className="text-gray-400">Last updated: January 28, 2026</p>
          </div>

          <div className="prose prose-invert prose-purple max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Carry's platform, you accept and agree to
                be bound by the terms and provisions of this agreement. If you
                do not agree to these Terms and Conditions, please do not use
                our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                2. Use License
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Permission is granted to temporarily access the materials on
                Carry's platform for personal, non-commercial transitory viewing
                only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or public display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on Carry's
                  platform
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or "mirror" the
                  materials on any other server
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                3. Trading Services
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Carry provides access to commodity trading, perpetual futures,
                tokenized spot commodities, and prediction markets. All trading
                activities carry inherent risks, and users acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Trading involves substantial risk of loss</li>
                <li>Past performance is not indicative of future results</li>
                <li>
                  Users are solely responsible for their trading decisions
                </li>
                <li>Carry does not provide investment advice</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                4. Account Registration
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To access certain features of the platform, you may be required
                to create an account. You agree to provide accurate, current,
                and complete information during the registration process and to
                update such information to keep it accurate, current, and
                complete.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                5. Disclaimer
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The materials on Carry's platform are provided on an 'as is'
                basis. Carry makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                6. Limitations
              </h2>
              <p className="text-gray-300 leading-relaxed">
                In no event shall Carry or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use Carry's platform, even if Carry or an
                authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                7. Revisions and Errata
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The materials appearing on Carry's platform could include
                technical, typographical, or photographic errors. Carry does not
                warrant that any of the materials on its platform are accurate,
                complete, or current. Carry may make changes to the materials
                contained on its platform at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                8. Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which Carry
                operates, and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                9. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <div className="bg-surface-light border border-gray-800 rounded-xl p-6 space-y-2">
                <p className="text-gray-300">Email: legal@carry.com</p>
                <p className="text-gray-300">Address: [Your Company Address]</p>
              </div>
            </section>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              to="/privacy-policy"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Privacy Policy →
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

export default TermsAndConditions;
