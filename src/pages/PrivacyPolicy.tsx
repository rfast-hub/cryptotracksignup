import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <ScrollArea className="h-[calc(100vh-4rem)] rounded-md border p-6 bg-white">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: 1/26/2025</p>
            
            <p className="text-lg">
              At CryptoTrack, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              
              <div>
                <h3 className="text-xl font-medium">1.1. Personal Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name, email address, and contact information</li>
                  <li>Cryptocurrency wallet addresses and transaction history</li>
                  <li>Account preferences and settings</li>
                  <li>Communication preferences and history</li>
                  <li>Profile pictures and other uploaded content</li>
                  <li>Social media handles and related information when linked</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">1.2. Usage Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Device information including hardware model, operating system, unique device identifiers</li>
                  <li>Browser type and version, plugins, and language preferences</li>
                  <li>IP address, location data, and timezone settings</li>
                  <li>Usage patterns, including pages visited, features used, and time spent</li>
                  <li>Trading and portfolio data, including transaction history and asset holdings</li>
                  <li>Search queries and filtering preferences</li>
                  <li>Performance data and error logs</li>
                  <li>Interaction with advertisements and promotional content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">1.3. Technical Data:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>API usage patterns and request logs</li>
                  <li>Network performance data and connection type</li>
                  <li>Session duration and authentication tokens</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Mobile device information including app version and push notification tokens</li>
                  <li>Screen resolution and display settings</li>
                  <li>System crash reports and performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">1.4. Third-Party Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Information from identity verification services</li>
                  <li>Credit reporting agencies and financial institutions</li>
                  <li>Public blockchain data and network information</li>
                  <li>Social media platforms when integration is enabled</li>
                  <li>Marketing and analytics partners</li>
                  <li>Data enrichment services</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
              <div>
                <h3 className="text-xl font-medium">2.1. Service Provision:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process your transactions and maintain your accounts</li>
                  <li>To verify your identity and prevent fraud</li>
                  <li>To provide customer support and respond to inquiries</li>
                  <li>To send service-related notifications and updates</li>
                  <li>To customize and optimize your experience</li>
                  <li>To analyze usage patterns and improve functionality</li>
                  <li>To maintain the security and integrity of our platform</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Information Sharing and Disclosure</h2>
              
              <div>
                <h3 className="text-xl font-medium">3.1. Third-Party Service Providers:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cloud hosting and infrastructure providers</li>
                  <li>Payment processors and financial institutions</li>
                  <li>Identity verification services</li>
                  <li>Analytics and monitoring services</li>
                  <li>Customer support platforms</li>
                  <li>Marketing and advertising partners</li>
                  <li>Professional advisors and consultants</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">3.2. Legal Requirements:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To comply with applicable laws and regulations</li>
                  <li>In response to valid legal requests from authorities</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>To detect and prevent fraud or illegal activities</li>
                  <li>In connection with legal proceedings or investigations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">3.3. Data Processing Agreement:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We process data in accordance with GDPR, CCPA, and other applicable regulations</li>
                  <li>We maintain appropriate technical and organizational security measures</li>
                  <li>We conduct regular security audits and vulnerability assessments</li>
                  <li>We require our sub-processors to maintain similar security standards</li>
                  <li>We maintain records of all data processing activities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">3.4. International Data Transfers:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Data may be transferred to and processed in multiple jurisdictions</li>
                  <li>We ensure appropriate safeguards for international data transfers</li>
                  <li>We comply with Standard Contractual Clauses and other transfer mechanisms</li>
                  <li>Users consent to international data transfers as necessary for service provision</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Data Retention and Deletion</h2>
              <div>
                <h3 className="text-xl font-medium">4.1. Retention Period:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We retain data as long as necessary for service provision</li>
                  <li>Legal and regulatory compliance requirements may extend retention</li>
                  <li>Backup and archive copies may be retained longer</li>
                  <li>Some data may be anonymized rather than deleted</li>
                  <li>Deletion requests are processed within 30 days</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
              <p>By using our service, you explicitly acknowledge and agree that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We may process your data as described in this policy</li>
                <li>You have no expectation of privacy beyond what is explicitly stated</li>
                <li>Changes to the policy may be made at our discretion</li>
                <li>You are responsible for reviewing policy updates</li>
                <li>Continued use constitutes acceptance of changes</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Data Breach Notification</h2>
              <div>
                <h3 className="text-xl font-medium">6.1. Notification Process:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We will notify affected users within 72 hours of discovering a breach</li>
                  <li>Notifications will include the nature and extent of the breach</li>
                  <li>We will cooperate with law enforcement and regulatory authorities</li>
                  <li>We maintain an incident response plan and regularly test it</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Intellectual Property Rights</h2>
              <div>
                <h3 className="text-xl font-medium">7.1. Ownership:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All content and data generated by the service remains our property</li>
                  <li>Users retain rights to their uploaded content but grant us a license to use it</li>
                  <li>Our trademarks and branding may not be used without permission</li>
                  <li>Derivative works based on our data require explicit written permission</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Cookies</h2>
              <p>We use cookies to enhance your experience. You can choose to accept or decline cookies.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Third-Party Services</h2>
              <p>We may employ third-party companies and services to facilitate our service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">13. Children's Privacy</h2>
              <p>Our service is not intended for use by children under the age of 13.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">14. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> cryptotrack31@gmail.com</li>
                <li><strong>Website:</strong> <a href="https://landing.cryptotrack.org" className="text-primary hover:underline">landing.cryptotrack.org</a></li>
                <li><strong>Address:</strong> 1290 Wilson Road, Westchester, NY 10598</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PrivacyPolicy;