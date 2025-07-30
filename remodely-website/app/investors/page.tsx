'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    TrendingUp,
    DollarSign,
    BarChart3,
    Users,
    Award,
    Building,
    Target,
    Calendar,
    FileText,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle,
    Star
} from 'lucide-react'

const InvestorsPage = () => {
    const keyMetrics = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Revenue Growth",
            value: "45%",
            period: "Year over Year",
            description: "Consistent growth in revenue driven by expanding market presence"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Projects Completed",
            value: "500+",
            period: "Since 2020",
            description: "Successfully delivered projects across residential and commercial sectors"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Client Satisfaction",
            value: "98%",
            period: "Customer Rating",
            description: "Exceptional customer satisfaction with 95% repeat business rate"
        },
        {
            icon: <Building className="w-8 h-8" />,
            title: "Expansion Markets",
            value: "6",
            period: "Target States",
            description: "Strategic expansion planned for TX, CA, PA, SC, GA, and FL markets"
        }
    ]

    const financialHighlights = [
        {
            metric: "Total Revenue",
            value: "$8.5M",
            change: "+32%",
            year: "2024"
        },
        {
            metric: "Gross Margin",
            value: "35%",
            change: "+5%",
            year: "2024"
        },
        {
            metric: "Net Income",
            value: "$1.2M",
            change: "+28%",
            year: "2024"
        },
        {
            metric: "EBITDA",
            value: "$1.8M",
            change: "+40%",
            year: "2024"
        }
    ]

    const investmentOpportunities = [
        {
            title: "Franchise Development",
            description: "Scale the Remodely brand nationwide with a proven dealership model. Investment in franchise infrastructure, training systems, and territory development across TX, CA, PA, SC, GA.",
            amount: "$2.5M",
            roi: "40% ROI"
        },
        {
            title: "Technology Platform",
            description: "Build proprietary franchise management software, customer acquisition systems, and operational tools that can be deployed across all dealerships nationwide.",
            amount: "$1.2M",
            roi: "35% ROI"
        },
        {
            title: "Master Training Center",
            description: "Establish a comprehensive training facility and certification program for franchisees, ensuring consistent quality and brand standards across all territories.",
            amount: "$800K",
            roi: "30% ROI"
        }
    ]

    const competitiveAdvantages = [
        "Proven Arizona market success with 500+ completed projects",
        "Scalable franchise model similar to ReBath and ServPro",
        "Licensed contractor framework (AzRoc #327266) replicable nationwide",
        "10-year warranty system transferable to all dealerships",
        "Established supplier relationships for bulk purchasing power",
        "Strong brand recognition ready for national expansion",
        "Comprehensive training and certification programs",
        "Proprietary project management and customer acquisition systems"
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-accent-600">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Invest in America's Next
                            <span className="block text-accent-400">
                                Remodeling Franchise Empire
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto mb-8">
                            Join us in building a scalable dealership model across Texas, California, Pennsylvania, South Carolina, Georgia, and beyond. From Remodely AZ to Remodely nationwide.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#contact-investors"
                                className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <DollarSign className="w-5 h-5 mr-2" />
                                Investment Opportunities
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="#financial-reports"
                                className="inline-flex items-center bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Financial Reports
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Metrics */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                            Key Performance Metrics
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our strong financial performance and market position make us an attractive investment opportunity.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {keyMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="bg-accent-100 rounded-full p-4 mb-6 inline-block">
                                    <div className="text-accent-600">
                                        {metric.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.title}</h3>
                                <div className="text-4xl font-bold text-accent-600 mb-2">{metric.value}</div>
                                <div className="text-sm text-gray-500 mb-4">{metric.period}</div>
                                <p className="text-gray-600">{metric.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Financial Highlights */}
            <section id="financial-reports" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                            Financial Highlights
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Strong financial performance with consistent growth across all key metrics.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {financialHighlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-2xl p-8 text-center"
                            >
                                <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                                <div className="text-lg font-semibold text-gray-700 mb-2">{item.metric}</div>
                                <div className="flex items-center justify-center">
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${item.change.startsWith('+')
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                        {item.change} vs {parseInt(item.year) - 1}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Opportunities */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                            Franchise Business Model
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Building a scalable dealership network with proven systems, comprehensive training, and ongoing support for franchise partners nationwide.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {investmentOpportunities.map((opportunity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">{opportunity.title}</h3>
                                    <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {opportunity.roi}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-3xl font-bold text-accent-600">{opportunity.amount}</span>
                                    <Link
                                        href="#contact-investors"
                                        className="inline-flex items-center text-accent-600 hover:text-accent-700 font-semibold"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Competitive Advantages */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                                Franchise Advantages
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Our scalable business model and proven systems position us for rapid nationwide expansion similar to industry leaders like ReBath and ServPro.
                            </p>
                            <div className="space-y-4">
                                {competitiveAdvantages.map((advantage, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <CheckCircle className="w-6 h-6 text-accent-600 mr-4 flex-shrink-0" />
                                        <span className="text-gray-700">{advantage}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center&q=80"
                                alt="Team meeting"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-lg"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-6 rounded-2xl shadow-lg">
                                <div className="flex items-center mb-2">
                                    <Star className="w-6 h-6 text-accent-200 mr-2" />
                                    <span className="text-2xl font-bold">4.9/5</span>
                                </div>
                                <p className="text-accent-100">Customer Rating</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Franchise Expansion Map */}
            <section className="py-20 bg-navy-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            National Expansion Strategy
                        </h2>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                            Following the proven franchise model of industry leaders like ReBath, ServPro, and Kitchen Tune-Up.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold mb-6">Target Markets for 2025-2027</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { state: 'Texas', markets: 'Houston, Dallas, Austin, San Antonio' },
                                    { state: 'California', markets: 'Los Angeles, San Diego, Sacramento' },
                                    { state: 'Pennsylvania', markets: 'Philadelphia, Pittsburgh, Allentown' },
                                    { state: 'South Carolina', markets: 'Charleston, Columbia, Greenville' },
                                    { state: 'Georgia', markets: 'Atlanta, Savannah, Augusta' },
                                    { state: 'Florida', markets: 'Miami, Tampa, Orlando, Jacksonville' }
                                ].map((market, index) => (
                                    <div key={index} className="bg-white/10 rounded-lg p-4">
                                        <h4 className="font-bold text-accent-400 mb-2">Remodely {market.state}</h4>
                                        <p className="text-sm text-primary-100">{market.markets}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="text-xl font-bold mb-4">Franchise Investment Model</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Initial Franchise Fee</span>
                                        <span className="font-semibold">$75K - $125K</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Territory Population</span>
                                        <span className="font-semibold">250K - 500K</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Investment</span>
                                        <span className="font-semibold">$200K - $400K</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Projected ROI</span>
                                        <span className="font-semibold text-accent-400">25-40%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="text-xl font-bold mb-4">Franchise Support</h4>
                                <ul className="space-y-2 text-primary-100">
                                    <li>• Comprehensive 6-week training program</li>
                                    <li>• Proprietary project management software</li>
                                    <li>• National marketing campaigns</li>
                                    <li>• Ongoing operational support</li>
                                    <li>• Bulk purchasing agreements</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Investors Section */}
            <section id="contact-investors" className="py-20 bg-navy-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to Partner With Us?
                        </h2>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                            Join us in building the next great American franchise success story. Contact our franchise development team to learn about investment and partnership opportunities.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <Phone className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                                <p className="text-primary-100">(480) 555-0123</p>
                            </div>
                            <div className="text-center">
                                <Mail className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Franchise Development</h3>
                                <p className="text-primary-100">franchise@remodely.com</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                                <p className="text-primary-100">Book a consultation</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Contact Franchise Development
                            </Link>
                            <button className="inline-flex items-center bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                                <FileText className="w-5 h-5 mr-2" />
                                Download Franchise Information
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default InvestorsPage
