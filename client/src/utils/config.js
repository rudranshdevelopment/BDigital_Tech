export const SITE_CONFIG = {
  whatsappNumber: "917709629488",
  defaultMessage: "Hi BDigital Tech, I'd like to know more about your services and discuss a project.",
  brandName: "BDigital Tech",
  tagline: "We Build Digital Experiences That Scale",
  subTagline: "Architecting enterprise CRM, ERP, HRMS, SaaS platforms, and automated ecosystems engineered for industry leaders.",

  // All 19 Services with Verbatim Appendix Copy
  services: [
    {
      id: "crm",
      number: "01",
      name: "CRM",
      category: "Customer Architecture",
      description: "Manage leads, deals, and customer relationships in one intelligent dashboard.",
      badge: "Enterprise Pipeline",
      color: "from-cyan-500 to-blue-600",
      iconType: "crm-dashboard",
      features: ["Pipeline Intelligence", "Automated Lead Scoring", "360° Customer View", "Omnichannel Inbox"]
    },
    {
      id: "ecommerce",
      number: "02",
      name: "E-commerce",
      category: "Commerce Engines",
      description: "Launch and scale online stores built to convert.",
      badge: "High-Conversion",
      color: "from-purple-500 to-indigo-600",
      iconType: "ecommerce-cart",
      features: ["Sub-second Checkout", "Headless Storefronts", "Global Currency & Tax", "Real-time Inventory"]
    },
    {
      id: "erp",
      number: "03",
      name: "ERP",
      category: "Enterprise Core",
      description: "Unify inventory, finance, and operations into a single system of record.",
      badge: "Operations Hub",
      color: "from-blue-500 to-cyan-400",
      iconType: "erp-layers",
      features: ["Central Ledger", "Supply Chain Control", "Department Sync", "Automated Audit Trails"]
    },
    {
      id: "attendance",
      number: "04",
      name: "Attendance",
      category: "Workforce Systems",
      description: "Automated, biometric-ready attendance tracking for every team.",
      badge: "Zero-Tamper",
      color: "from-emerald-400 to-teal-600",
      iconType: "biometric-scan",
      features: ["Biometric & Geo-fencing", "Shift Automation", "Overtime Intelligence", "Mobile Punch-in"]
    },
    {
      id: "payroll",
      number: "05",
      name: "Payroll",
      category: "Financial Engine",
      description: "Accurate, compliant payroll processing, run in minutes, not days.",
      badge: "Compliant Engine",
      color: "from-amber-400 to-orange-500",
      iconType: "payroll-ledger",
      features: ["One-Click Payroll Run", "Statutory Tax Compliance", "Direct Bank Disbursals", "Custom Deduction Rules"]
    },
    {
      id: "hrms",
      number: "06",
      name: "HRMS",
      category: "People Platform",
      description: "End-to-end HR: onboarding, leave, performance, and employee self-service.",
      badge: "People First",
      color: "from-pink-500 to-rose-600",
      iconType: "hrms-nodes",
      features: ["Digital Onboarding", "Leave & Policy Engine", "KPI & Appraisal Cycles", "Employee Self-Service"]
    },
    {
      id: "accounting",
      number: "07",
      name: "Accounting",
      category: "Financial Suite",
      description: "Real-time books, invoicing, and reconciliation — no more spreadsheets.",
      badge: "Real-Time Ledger",
      color: "from-cyan-400 to-violet-600",
      iconType: "accounting-calc",
      features: ["Automated Bank Reconcile", "Multi-Currency Books", "GST & VAT Invoicing", "P&L Forecasting"]
    },
    {
      id: "appointment",
      number: "08",
      name: "Appointment",
      category: "Scheduling Logic",
      description: "Smart booking and scheduling that eliminates no-shows.",
      badge: "Zero No-Shows",
      color: "from-violet-400 to-purple-600",
      iconType: "calendar-radar",
      features: ["Calendar Two-way Sync", "Automated SMS/WhatsApp Alerts", "Buffer Time Engine", "Deposit Payments"]
    },
    {
      id: "healthcare",
      number: "09",
      name: "Healthcare",
      category: "HealthTech Systems",
      description: "Patient records, scheduling, and billing built for clinics and hospitals.",
      badge: "HIPAA-Ready",
      color: "from-teal-400 to-emerald-600",
      iconType: "healthcare-pulse",
      features: ["Electronic Health Records", "Telemedicine Portal", "Lab & Pharmacy Sync", "OPD/IPD Billing"]
    },
    {
      id: "real-estate",
      number: "10",
      name: "Real Estate",
      category: "PropTech Architecture",
      description: "Listings, CRM, and deal pipelines for brokers and developers.",
      badge: "PropTech CRM",
      color: "from-blue-600 to-indigo-700",
      iconType: "realestate-building",
      features: ["Interactive Property Maps", "Broker Commission Logic", "Lead-to-Site Visit Flow", "Document Vault"]
    },
    {
      id: "restaurant",
      number: "11",
      name: "Restaurant",
      category: "Hospitality Tech",
      description: "POS, table, and order management for modern restaurants.",
      badge: "Lightning POS",
      color: "from-orange-500 to-red-600",
      iconType: "restaurant-pos",
      features: ["Contactless QR Ordering", "Kitchen Display System (KDS)", "Recipe & Food Costing", "Table Turn Optimizer"]
    },
    {
      id: "salon",
      number: "12",
      name: "Salon",
      category: "Lifestyle & Wellness",
      description: "Bookings, staff rosters, and client history for salons and spas.",
      badge: "Client Retention",
      color: "from-fuchsia-500 to-pink-600",
      iconType: "salon-sparkle",
      features: ["Stylist Chair Allocation", "Treatment Packages", "Client Formula History", "Membership Accounts"]
    },
    {
      id: "logistics",
      number: "13",
      name: "Logistics",
      category: "Supply Chain",
      description: "Fleet, route, and shipment tracking with real-time visibility.",
      badge: "Live Telematics",
      color: "from-sky-400 to-blue-700",
      iconType: "logistics-route",
      features: ["GPS Fleet Dispatch", "Dynamic Route Optimization", "Proof-of-Delivery (ePOD)", "Fuel & Mileage Telemetry"]
    },
    {
      id: "whatsapp-crm",
      number: "14",
      name: "WhatsApp CRM",
      category: "Conversational Commerce",
      description: "Turn WhatsApp into a full sales and support pipeline.",
      badge: "98% Open Rate",
      color: "from-emerald-500 to-green-600",
      iconType: "whatsapp-crm-chat",
      features: ["Official WhatsApp Business API", "Multi-Agent Shared Inbox", "Automated Drip Broadcasts", "Catalog & In-Chat Pay"]
    },
    {
      id: "workflow-automation",
      number: "15",
      name: "Workflow Automation",
      category: "Zero-Busywork",
      description: "Replace manual busywork with no-code automated workflows.",
      badge: "10x Productivity",
      color: "from-indigo-500 to-violet-700",
      iconType: "workflow-nodes",
      features: ["Cross-App Event Triggers", "Conditional Branch Logic", "Webhook Architecture", "Error Healing Engine"]
    },
    {
      id: "saas-platforms",
      number: "16",
      name: "SaaS Platforms",
      category: "Cloud Products",
      description: "Custom, multi-tenant SaaS products, designed and shipped fast.",
      badge: "Multi-Tenant",
      color: "from-cyan-400 to-purple-600",
      iconType: "saas-cube",
      features: ["Tenant Isolation Logic", "Subscription & Metered Billing", "Custom Domain Routing", "High-Concurrency Scale"]
    },
    {
      id: "analytics",
      number: "17",
      name: "Analytics",
      category: "Data Intelligence",
      description: "Turn raw data into dashboards that actually drive decisions.",
      badge: "Executive BI",
      color: "from-violet-500 to-cyan-500",
      iconType: "analytics-chart",
      features: ["Real-time Aggregation", "Predictive Trend Modeling", "Custom KPI Widgets", "Automated Daily Digests"]
    },
    {
      id: "mobile-apps",
      number: "18",
      name: "Mobile Apps",
      category: "App Engineering",
      description: "Native and cross-platform apps for iOS and Android.",
      badge: "60 FPS Fluid",
      color: "from-purple-600 to-pink-500",
      iconType: "mobile-device",
      features: ["iOS & Android Parity", "Offline-first Database", "Biometric Authentication", "Micro-interaction Polish"]
    },
    {
      id: "web-applications",
      number: "19",
      name: "Web Applications",
      category: "Full-Stack Web",
      description: "Fast, scalable web apps engineered for growth.",
      badge: "Edge Scalable",
      color: "from-blue-500 to-teal-400",
      iconType: "web-app-terminal",
      features: ["Micro-frontend Architecture", "PWA Offline Readiness", "Sub-100ms API Response", "Global CDN Distribution"]
    }
  ],

  metrics: [
    { target: 50, suffix: "+", label: "Projects Delivered", desc: "Engineered and deployed across global industries with zero critical downtime." },
    { target: 19, suffix: "", label: "Enterprise Solutions", desc: "Turnkey digital systems ready to configure, customize, and scale on demand." },
    { target: 100, suffix: "%", label: "Custom Architecture", desc: "Tailored source code without restrictive vendor locks or boilerplate bloat." },
    { target: 99.9, suffix: "%", label: "System Availability", desc: "Resilient infrastructure built for continuous high-throughput transactions." }
  ],

  process: [
    {
      step: "01",
      name: "Discover",
      tagline: "Architecture Deconstruction",
      desc: "We analyze your business bottlenecks, data flows, and team dynamics to architect a high-yield digital blueprint.",
      deliverable: "Technical Scope & System Architecture Blueprint"
    },
    {
      step: "02",
      name: "Design",
      tagline: "High-Fidelity Prototyping",
      desc: "Crafting intuitive, frictionless interfaces where complex enterprise operations feel effortless and engaging.",
      deliverable: "Interactive Design System & User Journey Maps"
    },
    {
      step: "03",
      name: "Develop",
      tagline: "High-Performance Engineering",
      desc: "Building clean, scalable, multi-tenant codebases with automated testing, micro-services, and bank-grade security.",
      deliverable: "Modular Codebase & API Infrastructure"
    },
    {
      step: "04",
      name: "Deploy",
      tagline: "Zero-Downtime Rollout",
      desc: "Continuous CI/CD pipeline deployments to high-availability cloud servers with telemetry, monitoring, and stress tests.",
      deliverable: "Production Cloud Cluster & Security Hardening"
    },
    {
      step: "05",
      name: "Support",
      tagline: "Continuous Evolution",
      desc: "Proactive monitoring, regular feature sprints, and dedicated technical support to keep your operations ahead.",
      deliverable: "24/7 SLA & Proactive Feature Roadmap"
    }
  ],

  industries: [
    { name: "Healthcare & Clinics", tag: "EHR & Appointments", desc: "HIPAA-compliant patient portals, doctor scheduling, and unified lab billing systems." },
    { name: "Real Estate & PropTech", tag: "Deals & Inventory", desc: "Dynamic unit visualizers, broker commission pipelines, and lead-to-site visit workflows." },
    { name: "Restaurant & Hospitality", tag: "POS & KDS", desc: "Lightning POS, contactless tableside ordering, kitchen display workflows, and recipe costing." },
    { name: "Salon & Luxury Spas", tag: "Chair & Roster", desc: "Stylist appointment allocation, retail packages, formula history, and automated recall SMS." },
    { name: "Logistics & Supply Chain", tag: "Fleet & ePOD", desc: "Real-time GPS telematics, automated dispatch routing, and digital proof-of-delivery." },
    { name: "Retail & E-Commerce", tag: "Storefront & Cart", desc: "High-speed headless commerce engines, multi-warehouse sync, and flash-sale scale." },
    { name: "Financial Services", tag: "Ledger & Compliance", desc: "Encrypted transaction ledgers, automated bank reconciliation, and statutory audit logging." },
    { name: "Enterprise SaaS & B2B", tag: "Multi-Tenant Cloud", desc: "Scalable multi-tenant SaaS architecture, metered usage billing, and customer portals." }
  ],

  getWhatsAppUrl: function (customText) {
    const text = customText || this.defaultMessage;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
};
