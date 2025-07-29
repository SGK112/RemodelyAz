'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, CheckCircle, AlertCircle, FileText, Users } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const RemodelTimelineArticle = () => {
    const article = {
        id: 5,
        title: 'Desert Landscaping: Creating Beautiful Arizona Outdoor Spaces',
        excerpt: 'Transform your Arizona backyard with drought-resistant plants and stunning desert design elements that thrive in the Southwest climate.',
        image: SITE_IMAGES.blog.small_spaces,
        author: 'David Thompson',
        date: 'July 20, 2024',
        readTime: '7 min read',
        category: 'Landscaping',
        tags: ['Desert Landscaping', 'Arizona', 'Outdoor Spaces']
    }

    const timelinePhases = [
        {
            phase: "Initial Consultation & Planning",
            duration: "1-2 weeks",
            icon: Users,
            description: "Meet with design team, discuss vision, and establish project scope"
        },
        {
            phase: "Design Development",
            duration: "2-4 weeks",
            icon: FileText,
            description: "Create detailed plans, select materials, and finalize design"
        },
        {
            phase: "Permitting & Approvals",
            duration: "2-6 weeks",
            icon: CheckCircle,
            description: "Obtain necessary permits and HOA approvals"
        },
        {
            phase: "Construction Phase",
            duration: "4-12 weeks",
            icon: AlertCircle,
            description: "Demolition, construction, and installation work"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Back to Blog */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                    {article.author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <span className="font-medium text-gray-900">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                        />
                    </div>
                </motion.div>

                {/* Timeline Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Remodeling Timeline Overview</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {timelinePhases.map((phase, index) => {
                            const IconComponent = phase.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                                    <p className="text-accent-600 font-medium mb-2">{phase.duration}</p>
                                    <p className="text-sm text-gray-600">{phase.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-lg max-w-none mb-12"
                >
                    <div className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
                        A successful remodeling project requires careful planning, realistic expectations, and clear communication between you and your renovation team. Understanding the typical timeline helps you prepare for each phase and ensures your project stays on track from conception to completion.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Phase 1: Initial Consultation & Planning (1-2 Weeks)</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Discovery Meeting</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Your remodeling journey begins with an in-depth consultation where we discuss your vision, lifestyle needs, and budget parameters. This meeting typically takes place in your home, allowing our team to assess the existing space, identify potential challenges, and understand your daily routines.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Site Assessment</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Our team conducts a thorough evaluation of your space, including structural elements, plumbing and electrical systems, and any potential obstacles. In Arizona homes, we pay special attention to HVAC considerations, sun exposure, and existing insulation that might affect the renovation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget Discussion</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We establish realistic budget expectations based on your goals and provide preliminary cost estimates. This includes discussions about which elements are must-haves versus nice-to-haves, helping prioritize your investment for maximum impact.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Planning Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Come prepared with inspiration photos, a wish list of features, and questions about the process. The more information you share during this phase, the better we can tailor the project to your needs.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Phase 2: Design Development (2-4 Weeks)</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Conceptual Design</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Our design team creates initial concept drawings and 3D renderings that bring your vision to life. These visual representations help you understand spatial relationships, traffic flow, and overall aesthetics before any construction begins.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Material Selection</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        This phase involves selecting all materials, finishes, fixtures, and appliances. In Arizona, we consider factors like heat resistance, UV exposure, and maintenance requirements when recommending materials that will perform well in the desert climate.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Design Refinement</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Based on your feedback, we refine the design, adjust layouts, and finalize all specifications. This iterative process ensures the final design perfectly matches your vision while remaining within budget and timeline constraints.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Final Approval</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Once you approve the final design, we create detailed construction drawings and specifications that will guide the entire project. This documentation becomes the blueprint for all subsequent work.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Phase 3: Permitting & Approvals (2-6 Weeks)</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Building Permits</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Most remodeling projects require building permits, especially those involving structural, electrical, or plumbing changes. We handle all permit applications and work with local authorities to ensure compliance with current building codes.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">HOA Approvals</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Many Arizona communities have homeowners associations with architectural review requirements. We prepare and submit all necessary documentation to obtain HOA approval, ensuring your project meets community standards and guidelines.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Final Preparations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        While permits are processing, we finalize material orders, coordinate subcontractor schedules, and prepare your home for construction. This includes protecting adjacent areas and establishing work zones to minimize disruption to your daily life.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Phase 4: Construction (4-12 Weeks)</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 1-2: Demolition & Structural Work</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Construction begins with careful demolition of existing elements, followed by any necessary structural modifications. This phase can be dusty and noisy, but proper containment and daily cleanup minimize impact on the rest of your home.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 3-4: Rough-In Work</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Plumbing, electrical, and HVAC rough-in work takes place once structural changes are complete. This "behind-the-walls" work is critical to your project's functionality and must pass inspection before proceeding to the next phase.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 5-8: Drywall & Painting</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Insulation installation is followed by drywall hanging, taping, and finishing. Once drywall work is complete, primer and paint application transforms the space and provides the foundation for finish work.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 9-12: Finish Work & Installation</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The final phase involves installing flooring, cabinets, countertops, fixtures, and appliances. This is when your vision truly comes to life as all the selected materials and finishes are professionally installed.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Start Your Remodeling Journey?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Understanding the remodeling timeline helps set realistic expectations and ensures a smooth project experience. Our project management team guides you through every phase, keeping you informed and your project on schedule.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Planning Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Affect Timeline</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Scope & Complexity</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Simple updates like painting and new fixtures can be completed in 2-4 weeks, while major renovations involving structural changes may take 3-4 months. Kitchen and bathroom remodels typically fall in the 6-12 week range, depending on the extent of work.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Material Availability</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Custom cabinets, specialty tiles, and unique fixtures may have longer lead times. We account for these timelines during planning and can suggest readily available alternatives if faster completion is a priority.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Seasonal Considerations</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's climate allows year-round construction, but summer heat may extend workdays to avoid peak temperatures. Winter months are often preferred for interior work, while spring and fall are ideal for projects involving outdoor components.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Change Orders</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Changes to the original plan during construction can extend timelines. While we accommodate reasonable modifications, staying as close to the approved design as possible helps maintain schedule and budget targets.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparing for Your Remodel</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Living Arrangements</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Kitchen remodels require alternative cooking arrangements, while bathroom renovations may necessitate temporary facilities. We help you plan for these disruptions and can recommend solutions to maintain comfort during construction.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication & Updates</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Regular communication keeps projects on track and addresses concerns promptly. We provide weekly progress updates, maintain clean work areas, and ensure you're informed about upcoming phases and any necessary decisions.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Final Walkthrough</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Project completion includes a comprehensive walkthrough where we review all work, address any final details, and provide care instructions for your new space. We stand behind our work and ensure you're completely satisfied before considering the project complete.
                    </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {article.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-accent-100 hover:text-accent-700 transition-colors cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </motion.div>

                {/* Author Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-2xl p-8 border border-gray-200 mb-12"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xl font-bold">
                                {article.author.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{article.author}</h4>
                            <p className="text-gray-600 leading-relaxed">
                                David is REMODELY's lead project manager with over 15 years of experience overseeing residential renovations. He specializes in timeline management, client communication, and ensuring projects are completed on schedule and within budget.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default RemodelTimelineArticle
