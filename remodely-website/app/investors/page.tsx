'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { leadAnalytics } from '../../lib/lead-analytics'
import {
    TrendingUp,
    DollarSign,
    Users,
    Award,
    Building,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle,
    Star,
    Home,
    MapPin,
    Shield,
    Zap,
    Globe,
    Heart,
    Trophy,
    Calendar
} from 'lucide-react'

const InvestorsPage = () => {
    const [showInvestorPhone, setShowInvestorPhone] = useState(false)

    const investmentModels = [
        {
            title: "Franchise Development Partnership",
            investment: "$150K - $300K",
            roi: "35-50% ROI",
            timeline: "12-18 months to profitability",
            description: "Launch your own RemodelyAZ territory with our proven systems, training, and ongoing support",
            benefits: [
                "Exclusive territory rights (50-mile radius)",
                "Complete training & certification program",
                "Proven marketing systems & lead generation",
                "Ongoing operational support & mentorship",
                "Brand recognition & established reputation"
            ],
            ideal: "Experienced contractors or business owners seeking scalable growth"
        },
        {
            title: "Master License Opportunity",
            investment: "$500K - $1M",
            roi: "45-65% ROI",
            timeline: "6-12 months to market entry",
            description: "Become the master licensee for entire state markets (TX, CA, PA, SC, GA, FL)",
            benefits: [
                "Multi-territory development rights",
                "Sub-franchise recruitment capabilities",
                "Regional training center establishment",
                "Technology platform licensing",
                "National account access"
            ],
            ideal: "Established business operators with multi-location experience"
        },
        {
            title: "Employee Stock Ownership Plan (ESOP)",
            investment: "Sweat Equity + Performance",
            roi: "Long-term wealth building",
            timeline: "Immediate participation",
            description: "Join our team and earn ownership through performance, dedication, and company growth",
            benefits: [
                "Ownership stake through performance",
                "Profit sharing participation",
                "Career advancement pathways",
                "Retirement wealth building",
                "Voice in company decisions"
            ],
            ideal: "Skilled tradespeople and managers committed to long-term growth"
        }
    ]

    const marketOpportunity = [
        {
            icon: <Home className="w-8 h-8" />,
            title: "$472B Market Size",
            subtitle: "US Home Improvement Industry",
            description: "Massive and growing market with consistent 7-9% annual growth"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "74M Millennials",
            subtitle: "Peak Earning Years",
            description: "Largest generation reaching prime home-buying and remodeling age"
        },
        {
            icon: <Building className="w-8 h-8" />,
            title: "43M Homes",
            subtitle: "Built Before 1980",
            description: "Aging housing stock driving unprecedented renovation demand"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Sun Belt Growth",
            subtitle: "Population Migration",
            description: "TX, AZ, FL, GA seeing 15-20% population growth driving construction boom"
        }
    ]

    const competitiveAdvantages = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Licensed & Bonded",
            description: "AzRoc #327266 - Licensed contractor with transferable systems"
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "10-Year Warranty",
            description: "Industry-leading warranty program builds customer confidence"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Technology Edge",
            description: "Proprietary CRM, project management, and lead generation systems"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Neighborhood Focus",
            description: "'Neighborly remodeling' brand positioning differentiates from big box stores"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Proven Training",
            description: "Comprehensive certification program ensures quality and consistency"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Scalable Model",
            description: "Systems-dependent operation designed for rapid expansion"
        }
    ]

    const successMetrics = [
        {
            metric: "Arizona Success Rate",
            value: "98%",
            description: "Customer satisfaction with 95% referral rate"
        },
        {
            metric: "Project Margins",
            value: "35-45%",
            description: "Consistent gross margins across all project types"
        },
        {
            metric: "Market Position",
            value: "#1",
            description: "Premium remodeling brand in Phoenix/Scottsdale market"
        },
        {
            metric: "Growth Rate",
            value: "40%+",
            description: "Year-over-year revenue growth since inception"
        }
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
                            Own Your Future in
                            <span className="block text-accent-400">
                                America&apos;s $472B Remodeling Industry
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto mb-8">
                            Join the RemodelyAZ expansion with franchise opportunities, master licenses,
                            or employee ownership. From Arizona&apos;s proven success to nationwide growth.
                        </p>

                        {/* Key Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-accent-400">$472B</div>
                                <div className="text-sm text-gray-200">Market Size</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-accent-400">35-50%</div>
                                <div className="text-sm text-gray-200">ROI Potential</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl font-bold text-accent-400">6 States</div>
                                <div className="text-sm text-gray-200">Expansion Markets</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#investment-models"
                                className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <DollarSign className="w-5 h-5 mr-2" />
                                Explore Opportunities
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="#contact-investors"
                                className="inline-flex items-center bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                Schedule Meeting
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Market Opportunity Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            Massive Market Opportunity
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The remodeling industry is experiencing unprecedented growth driven by demographic shifts,
                            aging housing stock, and increased home values.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {marketOpportunity.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
                            >
                                <div className="text-accent-600 mb-4 flex justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-accent-600 font-semibold mb-3">
                                    {item.subtitle}
                                </p>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Models Section */}
            <section id="investment-models" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            Multiple Paths to Ownership
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose the investment model that fits your goals, experience level, and capital availability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {investmentModels.map((model, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200 hover:border-accent-600 transition-all duration-300"
                            >
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {model.title}
                                    </h3>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <div className="text-3xl font-bold text-accent-600">
                                                {model.investment}
                                            </div>
                                            <div className="text-sm text-gray-500">Investment</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {model.roi}
                                            </div>
                                            <div className="text-sm text-gray-500">{model.timeline}</div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6">
                                    {model.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                                    <ul className="space-y-2">
                                        {model.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-sm text-gray-600 mb-4">
                                        <strong>Ideal for:</strong> {model.ideal}
                                    </p>
                                    <Link
                                        href="#contact-investors"
                                        className="w-full bg-accent-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-700 transition-colors duration-200 text-center block"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Metrics Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            Proven Arizona Success
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our track record in Arizona demonstrates the scalability and profitability of the RemodelyAZ model.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {successMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-lg text-center"
                            >
                                <div className="text-4xl font-bold text-accent-600 mb-2">
                                    {metric.value}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {metric.metric}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {metric.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="#contact-investors"
                            className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <Trophy className="w-5 h-5 mr-2" />
                            See Detailed Financials
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Competitive Advantages Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            Why RemodelyAZ Wins
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our competitive advantages create sustainable differentiation in a crowded market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {competitiveAdvantages.map((advantage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start p-6 bg-gray-50 rounded-xl"
                            >
                                <div className="text-accent-600 mr-4 mt-1">
                                    {advantage.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        {advantage.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {advantage.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-investors" className="py-20 bg-navy-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6">
                            Ready to Build Your Future?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
                            Schedule a confidential discussion about franchise opportunities, master licenses,
                            or employee ownership with our investment team.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <Phone className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Call Us</h3>
                                <button
                                    onClick={() => {
                                        setShowInvestorPhone(!showInvestorPhone)
                                        if (!showInvestorPhone) {
                                            leadAnalytics?.trackPhoneClick('(480) 255-5887')
                                        }
                                    }}
                                    className="text-primary-100 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showInvestorPhone ? '(480) 255-5887' : 'Click to reveal phone'}
                                </button>
                                <p className="text-sm text-gray-300 mt-2">Available 9 AM - 6 PM MST</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <Mail className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Email Us</h3>
                                <p className="text-primary-100">investors@remodely-az.com</p>
                                <p className="text-sm text-gray-300 mt-2">Response within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Schedule Meeting
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                            >
                                <Building className="w-5 h-5 mr-2" />
                                Learn About Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default InvestorsPage
