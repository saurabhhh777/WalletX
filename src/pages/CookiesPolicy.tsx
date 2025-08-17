import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CookiesPolicyProps {
  onBack: () => void;
}

export const CookiesPolicy: React.FC<CookiesPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 font-jost">Cookies Policy</h1>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6 font-mulish"> 
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">1. What Are Cookies</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely 
                  used to make websites work more efficiently and provide information to website owners.
                </p>
                <p>
                  WalletX uses cookies to enhance your experience and provide essential functionality.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">2. How We Use Cookies</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>WalletX uses cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the basic functionality of the application</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our application</li>
                  <li><strong>Security Cookies:</strong> Help protect against fraud and ensure secure transactions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">3. Types of Cookies We Use</h2>
              <div className="space-y-6 text-gray-700 font-mulish">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic functions like 
                    page navigation and access to secure areas of the website. The website cannot function properly 
                    without these cookies.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Preference Cookies</h3>
                  <p>
                    These cookies allow the website to remember choices you make (such as your username, language, 
                    or the region you are in) and provide enhanced, more personal features.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This helps us improve our website and user experience.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Security Cookies</h3>
                  <p>
                    These cookies are used to protect against fraud and ensure the security of transactions and user data.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">4. Third-Party Cookies</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>
                  Some cookies are placed by third-party services that appear on our pages. These may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analytics services (Google Analytics, etc.)</li>
                  <li>Blockchain RPC providers</li>
                  <li>Customer support tools</li>
                  <li>Performance monitoring services</li>
                </ul>
                <p>
                  We do not control these third-party cookies and they are subject to the privacy policies of the 
                  respective third-party providers.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">5. Managing Cookies</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete them</li>
                  <li><strong>Browser Extensions:</strong> Use browser extensions to manage cookies</li>
                  <li><strong>Device Settings:</strong> Some devices have built-in cookie management</li>
                </ul>
                <p>
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of WalletX.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">6. Cookie Duration</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Session Cookies</h3>
                  <p>
                    These cookies are temporary and are deleted when you close your browser. They are used to maintain 
                    your session while using WalletX.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jost">Persistent Cookies</h3>
                  <p>
                    These cookies remain on your device for a set period or until you delete them. They are used to 
                    remember your preferences and settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">7. Your Rights</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accept or decline cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Set your browser to notify you when cookies are being set</li>
                  <li>Set your browser to refuse cookies</li>
                  <li>Request information about the cookies we use</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">8. Updates to This Policy</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>
                  We may update this Cookies Policy from time to time to reflect changes in our practices or for 
                  other operational, legal, or regulatory reasons. We will notify you of any material changes by 
                  updating the "Last updated" date at the top of this policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-jost">9. Contact Us</h2>
              <div className="space-y-4 text-gray-700 font-mulish">
                <p>
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@walletx.com</p>
                  <p><strong>Support:</strong> support@walletx.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}; 