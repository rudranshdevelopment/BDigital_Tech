const Service = require('./models/Service');
const Metric = require('./models/Metric');

const initialServices = [
  {
    serviceId: "crm",
    number: "01",
    name: "CRM",
    category: "Customer Architecture",
    description: "Manage leads, deals, and customer relationships in one intelligent dashboard.",
    badge: "Enterprise Pipeline",
    color: "from-cyan-500 to-blue-600",
    iconType: "crm-dashboard",
    features: ["Pipeline Intelligence", "Automated Lead Scoring", "360° Customer View", "Omnichannel Inbox"],
    order: 1
  },
  {
    serviceId: "ecommerce",
    number: "02",
    name: "E-commerce",
    category: "Commerce Engines",
    description: "Launch and scale online stores built to convert.",
    badge: "High-Conversion",
    color: "from-purple-500 to-indigo-600",
    iconType: "ecommerce-cart",
    features: ["Sub-second Checkout", "Headless Storefronts", "Global Currency & Tax", "Real-time Inventory"],
    order: 2
  },
  {
    serviceId: "erp",
    number: "03",
    name: "ERP",
    category: "Enterprise Core",
    description: "Unify inventory, finance, and operations into a single system of record.",
    badge: "Operations Hub",
    color: "from-blue-500 to-cyan-400",
    iconType: "erp-layers",
    features: ["Central Ledger", "Supply Chain Control", "Department Sync", "Automated Audit Trails"],
    order: 3
  },
  {
    serviceId: "attendance",
    number: "04",
    name: "Attendance",
    category: "Workforce Systems",
    description: "Automated, biometric-ready attendance tracking for every team.",
    badge: "Zero-Tamper",
    color: "from-emerald-400 to-teal-600",
    iconType: "biometric-scan",
    features: ["Biometric & Geo-fencing", "Shift Automation", "Overtime Intelligence", "Mobile Punch-in"],
    order: 4
  },
  {
    serviceId: "payroll",
    number: "05",
    name: "Payroll",
    category: "Financial Engine",
    description: "Accurate, compliant payroll processing, run in minutes, not days.",
    badge: "Compliant Engine",
    color: "from-amber-400 to-orange-500",
    iconType: "payroll-ledger",
    features: ["One-Click Payroll Run", "Statutory Tax Compliance", "Direct Bank Disbursals", "Custom Deduction Rules"],
    order: 5
  },
  {
    serviceId: "hrms",
    number: "06",
    name: "HRMS",
    category: "People Platform",
    description: "End-to-end HR: onboarding, leave, performance, and employee self-service.",
    badge: "People First",
    color: "from-pink-500 to-rose-600",
    iconType: "hrms-nodes",
    features: ["Digital Onboarding", "Leave & Policy Engine", "KPI & Appraisal Cycles", "Employee Self-Service"],
    order: 6
  },
  {
    serviceId: "accounting",
    number: "07",
    name: "Accounting",
    category: "Financial Suite",
    description: "Real-time books, invoicing, and reconciliation — no more spreadsheets.",
    badge: "Real-Time Ledger",
    color: "from-cyan-400 to-violet-600",
    iconType: "accounting-calc",
    features: ["Automated Bank Reconcile", "Multi-Currency Books", "GST & VAT Invoicing", "P&L Forecasting"],
    order: 7
  },
  {
    serviceId: "appointment",
    number: "08",
    name: "Appointment",
    category: "Scheduling Logic",
    description: "Smart booking and scheduling that eliminates no-shows.",
    badge: "Zero No-Shows",
    color: "from-violet-400 to-purple-600",
    iconType: "calendar-radar",
    features: ["Calendar Two-way Sync", "Automated SMS/WhatsApp Alerts", "Buffer Time Engine", "Deposit Payments"],
    order: 8
  },
  {
    serviceId: "healthcare",
    number: "09",
    name: "Healthcare",
    category: "HealthTech Systems",
    description: "Patient records, scheduling, and billing built for clinics and hospitals.",
    badge: "HIPAA-Ready",
    color: "from-teal-400 to-emerald-600",
    iconType: "healthcare-pulse",
    features: ["Electronic Health Records", "Telemedicine Portal", "Lab & Pharmacy Sync", "OPD/IPD Billing"],
    order: 9
  },
  {
    serviceId: "real-estate",
    number: "10",
    name: "Real Estate",
    category: "PropTech Architecture",
    description: "Listings, CRM, and deal pipelines for brokers and developers.",
    badge: "PropTech CRM",
    color: "from-blue-600 to-indigo-700",
    iconType: "realestate-building",
    features: ["Interactive Property Maps", "Broker Commission Logic", "Lead-to-Site Visit Flow", "Document Vault"],
    order: 10
  },
  {
    serviceId: "restaurant",
    number: "11",
    name: "Restaurant",
    category: "Hospitality Tech",
    description: "POS, table, and order management for modern restaurants.",
    badge: "Lightning POS",
    color: "from-orange-500 to-red-600",
    iconType: "restaurant-pos",
    features: ["Contactless QR Ordering", "Kitchen Display System (KDS)", "Recipe & Food Costing", "Table Turn Optimizer"],
    order: 11
  },
  {
    serviceId: "salon",
    number: "12",
    name: "Salon",
    category: "Lifestyle & Wellness",
    description: "Bookings, staff rosters, and client history for salons and spas.",
    badge: "Client Retention",
    color: "from-fuchsia-500 to-pink-600",
    iconType: "salon-sparkle",
    features: ["Stylist Chair Allocation", "Treatment Packages", "Client Formula History", "Membership Accounts"],
    order: 12
  },
  {
    serviceId: "logistics",
    number: "13",
    name: "Logistics",
    category: "Supply Chain",
    description: "Fleet, route, and shipment tracking with real-time visibility.",
    badge: "Live Telematics",
    color: "from-sky-400 to-blue-700",
    iconType: "logistics-route",
    features: ["GPS Fleet Dispatch", "Dynamic Route Optimization", "Proof-of-Delivery (ePOD)", "Fuel & Mileage Telemetry"],
    order: 13
  },
  {
    serviceId: "whatsapp-crm",
    number: "14",
    name: "WhatsApp CRM",
    category: "Conversational Commerce",
    description: "Turn WhatsApp into a full sales and support pipeline.",
    badge: "98% Open Rate",
    color: "from-emerald-500 to-green-600",
    iconType: "whatsapp-crm-chat",
    features: ["Official WhatsApp Business API", "Multi-Agent Shared Inbox", "Automated Drip Broadcasts", "Catalog & In-Chat Pay"],
    order: 14
  },
  {
    serviceId: "workflow-automation",
    number: "15",
    name: "Workflow Automation",
    category: "Zero-Busywork",
    description: "Replace manual busywork with no-code automated workflows.",
    badge: "10x Productivity",
    color: "from-indigo-500 to-violet-700",
    iconType: "workflow-nodes",
    features: ["Cross-App Event Triggers", "Conditional Branch Logic", "Webhook Architecture", "Error Healing Engine"],
    order: 15
  },
  {
    serviceId: "saas-platforms",
    number: "16",
    name: "SaaS Platforms",
    category: "Cloud Products",
    description: "Custom, multi-tenant SaaS products, designed and shipped fast.",
    badge: "Multi-Tenant",
    color: "from-cyan-400 to-purple-600",
    iconType: "saas-cube",
    features: ["Tenant Isolation Logic", "Subscription & Metered Billing", "Custom Domain Routing", "High-Concurrency Scale"],
    order: 16
  },
  {
    serviceId: "analytics",
    number: "17",
    name: "Analytics",
    category: "Data Intelligence",
    description: "Turn raw data into dashboards that actually drive decisions.",
    badge: "Executive BI",
    color: "from-violet-500 to-cyan-500",
    iconType: "analytics-chart",
    features: ["Real-time Aggregation", "Predictive Trend Modeling", "Custom KPI Widgets", "Automated Daily Digests"],
    order: 17
  },
  {
    serviceId: "mobile-apps",
    number: "18",
    name: "Mobile Apps",
    category: "App Engineering",
    description: "Native and cross-platform apps for iOS and Android.",
    badge: "60 FPS Fluid",
    color: "from-purple-600 to-pink-500",
    iconType: "mobile-device",
    features: ["iOS & Android Parity", "Offline-first Database", "Biometric Authentication", "Micro-interaction Polish"],
    order: 18
  },
  {
    serviceId: "web-applications",
    number: "19",
    name: "Web Applications",
    category: "Full-Stack Web",
    description: "Fast, scalable web apps engineered for growth.",
    badge: "Edge Scalable",
    color: "from-blue-500 to-teal-400",
    iconType: "web-app-terminal",
    features: ["Micro-frontend Architecture", "PWA Offline Readiness", "Sub-100ms API Response", "Global CDN Distribution"],
    order: 19
  }
];

const initialMetrics = [
  { target: 50, suffix: "+", label: "Projects Delivered", desc: "Engineered and deployed across global industries with zero critical downtime.", order: 1 },
  { target: 19, suffix: "", label: "Enterprise Solutions", desc: "Turnkey digital systems ready to configure, customize, and scale on demand.", order: 2 },
  { target: 100, suffix: "%", label: "Custom Architecture", desc: "Tailored source code without restrictive vendor locks or boilerplate bloat.", order: 3 },
  { target: 99.9, suffix: "%", label: "System Availability", desc: "Resilient infrastructure built for continuous high-throughput transactions.", order: 4 }
];

const seedDatabase = async () => {
  try {
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(initialServices);
      console.log(`[Seed] Successfully seeded ${initialServices.length} enterprise services into MongoDB.`);
    }

    const metricCount = await Metric.countDocuments();
    if (metricCount === 0) {
      await Metric.insertMany(initialMetrics);
      console.log(`[Seed] Successfully seeded ${initialMetrics.length} metrics into MongoDB.`);
    }
  } catch (error) {
    console.warn(`[Seed] Seeding skipped or encountered error: ${error.message}`);
  }
};

module.exports = { seedDatabase, initialServices, initialMetrics };
