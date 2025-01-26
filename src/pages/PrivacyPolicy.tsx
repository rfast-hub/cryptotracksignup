import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-6">Last updated: 1/26/2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">At CryptoTrack</h2>
              <p className="text-gray-700">We take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mt-4 mb-2">1.1. Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full name, email address, and contact information</li>
                <li>Cryptocurrency wallet addresses and transaction history</li>
                <li>Account preferences and settings</li>
                <li>Communication preferences and history</li>
                <li>Profile pictures and other uploaded content</li>
                <li>Social media handles and related information when linked</li>
              </ul>

              <h3 className="text-xl font-medium mt-4 mb-2">1.2. Usage Information:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Device information including hardware model, operating system, unique device identifiers</li>
                <li>Browser type and version, plugins, and language preferences</li>
                <li>IP address, location data, and timezone settings</li>
                <li>Usage patterns, including pages visited, features used, and time spent</li>
                <li>Trading and portfolio data, including transaction history and asset holdings</li>
                <li>Search queries and filtering preferences</li>
                <li>Performance data and error logs</li>
                <li>Interaction with advertisements and promotional content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <h3 className="text-xl font-medium mt-4 mb-2">2.1. Service Provision:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide, maintain, and improve our services</li>
                <li>To process your transactions and maintain your accounts</li>
                <li>To verify your identity and prevent fraud</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To send service-related notifications and updates</li>
                <li>To customize and optimize your experience</li>
                <li>To analyze usage patterns and improve functionality</li>
                <li>To maintain the security and integrity of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
              <h3 className="text-xl font-medium mt-4 mb-2">3.1. Third-Party Service Providers:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cloud hosting and infrastructure providers</li>
                <li>Payment processors and financial institutions</li>
                <li>Identity verification services</li>
                <li>Analytics and monitoring services</li>
                <li>Customer support platforms</li>
                <li>Marketing and advertising partners</li>
                <li>Professional advisors and consultants</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-700">We implement a variety of security measures to maintain the safety of your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-gray-700">You have the right to access, correct, or delete your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
              <p className="text-gray-700">We use cookies to enhance your experience. You can choose to accept or decline cookies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700">We may employ third-party companies and services to facilitate our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">Our service is not intended for use by children under the age of 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Email: cryptotrack31@gmail.com</li>
                <li>Website: landing.cryptotrack.org</li>
                <li>Address: 1290 Wilson Road, Westchester, NY 10598</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PrivacyPolicy;