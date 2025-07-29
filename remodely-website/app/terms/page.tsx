'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        These terms and conditions outline the rules and regulations for the use of REMODELY LLC's services.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </motion.div>

                {/* Terms Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-8"
                >
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing and using REMODELY LLC's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            REMODELY LLC provides kitchen and bathroom remodeling services including but not limited to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Kitchen design and renovation</li>
                            <li>Bathroom design and renovation</li>
                            <li>Commercial remodeling services</li>
                            <li>Design consultation services</li>
                            <li>Project management and coordination</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Project Agreements</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            All remodeling projects are subject to separate written contracts that will specify:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Scope of work and project specifications</li>
                            <li>Timeline and milestones</li>
                            <li>Payment schedule and terms</li>
                            <li>Change order procedures</li>
                            <li>Warranty information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Payment terms are specified in individual project contracts. Generally, payments are made according to project milestones. Late payments may result in project delays and additional fees as outlined in the project agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Warranties and Guarantees</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We provide warranties on our workmanship as specified in individual project contracts. Warranty terms vary based on the type of work performed and materials used. Manufacturer warranties on products and materials are separate from our workmanship warranty.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability Limitations</h2>
                        <p className="text-gray-700 leading-relaxed">
                            REMODELY LLC maintains appropriate insurance coverage. Our liability is limited to the terms specified in individual project contracts. We are not liable for indirect, incidental, or consequential damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Client Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Clients are responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Providing accurate information about their property</li>
                            <li>Obtaining necessary permissions from HOAs or landlords</li>
                            <li>Ensuring access to work areas</li>
                            <li>Making timely payments as agreed</li>
                            <li>Communicating changes or concerns promptly</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cancellation Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Cancellation terms are specified in individual project contracts. Generally, cancellations must be made in writing. Fees may apply for work already performed or materials ordered.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Any disputes arising from our services will be resolved through mediation and, if necessary, binding arbitration in accordance with Arizona state law. The venue for any legal proceedings will be Maricopa County, Arizona.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            REMODELY LLC reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                            <p className="text-gray-700"><strong>REMODELY LLC</strong></p>
                            <p className="text-gray-700">15464 W Aster Dr, Surprise, AZ 85379</p>
                            <p className="text-gray-700">Phone: (602) 818-5834</p>
                            <p className="text-gray-700">Email: help.remodely@gmail.com</p>
                        </div>
                    </section>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-primary-50 rounded-2xl p-8 text-center mt-16"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Questions About Our Terms?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our team is here to help clarify any questions you may have about our terms of service.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default TermsPage
