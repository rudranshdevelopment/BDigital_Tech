/**
 * BDigital Tech — Centralized Service Data Architecture
 * Single source of truth for all 4 Pillars and 19 Enterprise Services.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BDIGITAL_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var WHATSAPP_PHONE = '917709629488';

  var PILLARS = [
    {
      id: 'business-operations',
      number: '01',
      name: 'Business Operations Suite',
      badge: 'Core Operations',
      tagline: 'The operational backbone that keeps people, processes, finance, and daily business activities connected.',
      serviceIds: ['erp', 'hrms', 'payroll', 'attendance', 'accounting']
    },
    {
      id: 'customer-revenue',
      number: '02',
      name: 'Customer & Revenue Tools',
      badge: 'Revenue & Growth',
      tagline: 'Turn customer interactions into organized conversations, bookings, sales, and long-term relationships.',
      serviceIds: ['crm', 'whatsapp-crm', 'ecommerce', 'appointment-scheduling']
    },
    {
      id: 'industry-solutions',
      number: '03',
      name: 'Industry Solutions',
      badge: 'Vertical Domains',
      tagline: 'Software designed around the workflows, customers, and operational realities of specific industries.',
      serviceIds: ['healthcare', 'real-estate', 'restaurant', 'salon', 'logistics']
    },
    {
      id: 'platform-engineering',
      number: '04',
      name: 'Platform & Digital Engineering',
      badge: 'Custom Architecture',
      tagline: 'Custom digital products and engineering built when standard software is not enough.',
      serviceIds: ['saas-platforms', 'workflow-automation', 'analytics', 'mobile-apps', 'web-applications']
    }
  ];

  var SERVICES = [
    // PILLAR 01: BUSINESS OPERATIONS SUITE
    {
      id: 'erp',
      number: '01',
      pillarId: 'business-operations',
      shortName: 'ERP',
      title: 'Enterprise Resource Planning',
      shortDescription: 'Connect inventory, finance, procurement, operations, and business workflows in one unified system.',
      information: 'ERP brings the core functions of a business into one connected platform. Instead of managing operations across disconnected tools and spreadsheets, businesses can manage their essential workflows from a single system.',
      capabilities: [
        'Inventory management',
        'Purchase management',
        'Sales management',
        'Finance and operations',
        'Order processing',
        'Business reporting',
        'Workflow automation',
        'Centralized business data'
      ],
      idealFor: 'Growing businesses that need their departments and operations working from one connected system.',
      ctaText: 'Discuss ERP on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your ERP solutions."
    },
    {
      id: 'hrms',
      number: '02',
      pillarId: 'business-operations',
      shortName: 'HRMS',
      title: 'Human Resource Management System',
      shortDescription: 'Manage the complete employee lifecycle from onboarding to performance.',
      information: 'A centralized HR platform for managing employee information, HR workflows, leave, attendance, performance, and employee self-service.',
      capabilities: [
        'Employee management',
        'Employee onboarding',
        'Leave management',
        'Attendance integration',
        'Performance management',
        'Employee self-service',
        'HR records',
        'HR workflow automation'
      ],
      idealFor: 'Organizations managing growing teams and requiring structured HR operations.',
      ctaText: 'Discuss HRMS on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your HRMS solutions."
    },
    {
      id: 'payroll',
      number: '03',
      pillarId: 'business-operations',
      shortName: 'Payroll',
      title: 'Payroll Management',
      shortDescription: 'Automate salary processing, payroll calculations, and employee compensation workflows.',
      information: 'Payroll software helps businesses streamline salary processing and reduce manual payroll work.',
      capabilities: [
        'Salary processing',
        'Payroll calculations',
        'Employee compensation records',
        'Payroll reports',
        'Payslip generation',
        'Payroll workflow automation',
        'Employee payroll information'
      ],
      idealFor: 'Businesses that want faster and more organized payroll operations.',
      ctaText: 'Discuss Payroll on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Payroll solutions."
    },
    {
      id: 'attendance',
      number: '04',
      pillarId: 'business-operations',
      shortName: 'Attendance',
      title: 'Attendance Management',
      shortDescription: 'Track employee attendance and working patterns through a centralized system.',
      information: 'A connected attendance system that helps organizations manage employee attendance and synchronize attendance data with HR and payroll workflows.',
      capabilities: [
        'Attendance tracking',
        'Employee attendance records',
        'Shift management',
        'Attendance reports',
        'HR integration',
        'Payroll integration',
        'Automated attendance workflows'
      ],
      idealFor: 'Businesses with teams, shifts, multiple departments, or distributed operations.',
      ctaText: 'Discuss Attendance on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Attendance Management solutions."
    },
    {
      id: 'accounting',
      number: '05',
      pillarId: 'business-operations',
      shortName: 'Accounting',
      title: 'Business Accounting',
      shortDescription: 'Keep financial records, invoices, and business transactions organized in one place.',
      information: 'A connected accounting system designed to bring financial information into the broader business workflow.',
      capabilities: [
        'Financial records',
        'Invoicing',
        'Transaction management',
        'Accounting workflows',
        'Financial reporting',
        'Reconciliation',
        'Business financial visibility'
      ],
      idealFor: 'Businesses that want accounting connected to their operational systems.',
      ctaText: 'Discuss Accounting on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Accounting solutions."
    },

    // PILLAR 02: CUSTOMER & REVENUE TOOLS
    {
      id: 'crm',
      number: '06',
      pillarId: 'customer-revenue',
      shortName: 'CRM',
      title: 'Customer Relationship Management',
      shortDescription: 'Centralize customer information, conversations, sales activity, and follow-ups.',
      information: 'A CRM system that gives businesses a structured view of their customer relationships and sales processes.',
      capabilities: [
        'Customer management',
        'Lead management',
        'Sales pipelines',
        'Follow-up management',
        'Customer history',
        'Sales activity',
        'Reports and analytics',
        'Automated workflows'
      ],
      idealFor: 'Businesses that need better visibility across their customer and sales operations.',
      ctaText: 'Discuss CRM on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your CRM solutions."
    },
    {
      id: 'whatsapp-crm',
      number: '07',
      pillarId: 'customer-revenue',
      shortName: 'WhatsApp CRM',
      title: 'WhatsApp CRM',
      shortDescription: 'Turn WhatsApp conversations into an organized customer communication and sales workflow.',
      information: 'A WhatsApp-focused CRM experience that helps businesses manage customer conversations while connecting communication with their sales and service processes.',
      capabilities: [
        'Customer conversations',
        'Lead management',
        'WhatsApp communication',
        'Follow-up workflows',
        'Customer history',
        'Sales coordination',
        'Automated responses',
        'Conversation management'
      ],
      idealFor: 'Businesses where WhatsApp is a major channel for customer communication and sales.',
      ctaText: 'Discuss WhatsApp CRM on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your WhatsApp CRM solutions."
    },
    {
      id: 'ecommerce',
      number: '08',
      pillarId: 'customer-revenue',
      shortName: 'E-commerce',
      title: 'E-commerce Platforms',
      shortDescription: 'Build digital commerce experiences designed around your products, customers, and business workflows.',
      information: 'Custom e-commerce platforms designed to provide businesses with a connected digital selling experience.',
      capabilities: [
        'Product catalog',
        'Shopping experience',
        'Order management',
        'Customer management',
        'Payment integration',
        'Inventory integration',
        'Business analytics',
        'Custom workflows'
      ],
      idealFor: 'Businesses looking to sell products through a professional digital commerce platform.',
      ctaText: 'Discuss E-commerce on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your E-commerce solutions."
    },
    {
      id: 'appointment-scheduling',
      number: '09',
      pillarId: 'customer-revenue',
      shortName: 'Appointment Scheduling',
      title: 'Appointment Scheduling',
      shortDescription: 'Make booking, scheduling, and customer appointments simple and organized.',
      information: 'Digital appointment systems that help businesses manage availability, bookings, customers, and scheduling workflows.',
      capabilities: [
        'Online booking',
        'Appointment management',
        'Availability management',
        'Staff scheduling',
        'Customer records',
        'Booking notifications',
        'Calendar integration',
        'Appointment history'
      ],
      idealFor: 'Salons, clinics, consultants, service businesses, and appointment-driven organizations.',
      ctaText: 'Discuss Appointment Scheduling on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Appointment Scheduling solutions."
    },

    // PILLAR 03: INDUSTRY SOLUTIONS
    {
      id: 'healthcare',
      number: '10',
      pillarId: 'industry-solutions',
      shortName: 'Healthcare',
      title: 'Healthcare Solutions',
      shortDescription: 'Connected software for managing healthcare operations, patients, appointments, and workflows.',
      information: 'Industry-focused software designed around healthcare business operations and patient-facing workflows.',
      capabilities: [
        'Patient management',
        'Appointment management',
        'Staff management',
        'Records management',
        'Billing workflows',
        'Communication',
        'Operational reporting',
        'Custom healthcare workflows'
      ],
      idealFor: 'Clinics, healthcare businesses, and organizations requiring specialized digital workflows.',
      ctaText: 'Discuss Healthcare Solutions on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Healthcare solutions."
    },
    {
      id: 'real-estate',
      number: '11',
      pillarId: 'industry-solutions',
      shortName: 'Real Estate',
      title: 'Real Estate Solutions',
      shortDescription: 'Manage properties, leads, customers, follow-ups, and real estate operations through connected software.',
      information: 'Custom systems designed to organize real estate workflows and customer relationships.',
      capabilities: [
        'Property management',
        'Lead management',
        'Customer management',
        'Property listings',
        'Follow-ups',
        'Sales pipeline',
        'Agent management',
        'Reports and analytics'
      ],
      idealFor: 'Real estate agencies, property businesses, and growing property operations.',
      ctaText: 'Discuss Real Estate Solutions on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Real Estate solutions."
    },
    {
      id: 'restaurant',
      number: '12',
      pillarId: 'industry-solutions',
      shortName: 'Restaurant',
      title: 'Restaurant Management Solutions',
      shortDescription: 'Connect orders, operations, customers, staff, and business management.',
      information: 'Digital systems designed around restaurant workflows and day-to-day operations.',
      capabilities: [
        'Order management',
        'Menu management',
        'Customer management',
        'Table management',
        'Staff management',
        'Billing workflows',
        'Inventory coordination',
        'Business reporting'
      ],
      idealFor: 'Restaurants, cafes, food businesses, and multi-location operations.',
      ctaText: 'Discuss Restaurant Solutions on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Restaurant Management solutions."
    },
    {
      id: 'salon',
      number: '13',
      pillarId: 'industry-solutions',
      shortName: 'Salon',
      title: 'Salon Management Solutions',
      shortDescription: 'Manage customers, appointments, staff, services, and daily salon operations.',
      information: 'A connected salon management experience focused on customer relationships and operational efficiency.',
      capabilities: [
        'Appointment booking',
        'Customer management',
        'Staff management',
        'Service management',
        'Customer history',
        'Billing',
        'Notifications',
        'Business reporting'
      ],
      idealFor: 'Salons, beauty businesses, and appointment-driven service providers.',
      ctaText: 'Discuss Salon Solutions on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Salon Management solutions."
    },
    {
      id: 'logistics',
      number: '14',
      pillarId: 'industry-solutions',
      shortName: 'Logistics',
      title: 'Logistics Management Solutions',
      shortDescription: 'Connect logistics workflows, operations, tracking, and business information.',
      information: 'Custom logistics software designed to organize operational workflows and improve visibility across logistics processes.',
      capabilities: [
        'Logistics management',
        'Order tracking',
        'Delivery workflows',
        'Operations management',
        'Driver / team coordination',
        'Status tracking',
        'Reporting',
        'Workflow automation'
      ],
      idealFor: 'Logistics companies, delivery businesses, and organizations managing operational movement.',
      ctaText: 'Discuss Logistics Solutions on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Logistics solutions."
    },

    // PILLAR 04: PLATFORM & DIGITAL ENGINEERING
    {
      id: 'saas-platforms',
      number: '15',
      pillarId: 'platform-engineering',
      shortName: 'SaaS Platforms',
      title: 'SaaS Platform Development',
      shortDescription: 'Design and build scalable software products that businesses can use as a service.',
      information: 'Custom SaaS platforms built around specific business models, users, workflows, and operational requirements.',
      capabilities: [
        'Multi-user systems',
        'Role-based access',
        'Subscription workflows',
        'Scalable architecture',
        'Admin systems',
        'Customer portals',
        'Analytics',
        'API integrations'
      ],
      idealFor: 'Companies building their own software product or turning an internal system into a scalable platform.',
      ctaText: 'Discuss SaaS Development on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your SaaS Platform Development services."
    },
    {
      id: 'workflow-automation',
      number: '16',
      pillarId: 'platform-engineering',
      shortName: 'Workflow Automation',
      title: 'Workflow Automation',
      shortDescription: 'Replace repetitive manual processes with connected digital workflows.',
      information: 'Automation solutions that connect business processes and reduce repetitive manual work.',
      capabilities: [
        'Automated workflows',
        'Notifications',
        'Approval systems',
        'Data synchronization',
        'Process automation',
        'API integrations',
        'Trigger-based actions',
        'Cross-system workflows'
      ],
      idealFor: 'Businesses looking to reduce manual operations and improve process efficiency.',
      ctaText: 'Discuss Workflow Automation on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Workflow Automation services."
    },
    {
      id: 'analytics',
      number: '17',
      pillarId: 'platform-engineering',
      shortName: 'Analytics',
      title: 'Business Analytics & BI',
      shortDescription: 'Turn business data into clear operational insights and decision-making visibility.',
      information: 'Analytics systems designed to bring important business information together and make it easier to understand.',
      capabilities: [
        'Business dashboards',
        'KPI tracking',
        'Reports',
        'Data visualization',
        'Operational analytics',
        'Sales analytics',
        'Performance monitoring',
        'Custom reporting'
      ],
      idealFor: 'Businesses that want better visibility into performance and operations.',
      ctaText: 'Discuss Analytics on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Business Analytics & BI solutions."
    },
    {
      id: 'mobile-apps',
      number: '18',
      pillarId: 'platform-engineering',
      shortName: 'Mobile Apps',
      title: 'Mobile Application Development',
      shortDescription: 'Build mobile experiences that put your products, services, and workflows in your customers\' hands.',
      information: 'Custom mobile applications designed around specific business requirements and user experiences.',
      capabilities: [
        'Android applications',
        'iOS applications',
        'Cross-platform applications',
        'Customer apps',
        'Business apps',
        'API integration',
        'Notifications',
        'Mobile workflows'
      ],
      idealFor: 'Businesses that need a dedicated mobile experience for customers, employees, or operations.',
      ctaText: 'Discuss Mobile App Development on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Mobile Application Development services."
    },
    {
      id: 'web-applications',
      number: '19',
      pillarId: 'platform-engineering',
      shortName: 'Web Applications',
      title: 'Web Application Development',
      shortDescription: 'Build modern, scalable web applications around the way your business actually works.',
      information: 'Custom web applications designed for business operations, customers, internal teams, and digital products.',
      capabilities: [
        'Custom web applications',
        'Business portals',
        'Customer portals',
        'Admin systems',
        'API integrations',
        'Workflow systems',
        'Scalable architecture',
        'Responsive experiences'
      ],
      idealFor: 'Businesses requiring software beyond a standard website.',
      ctaText: 'Discuss Web Application Development on WhatsApp',
      whatsappMessage: "Hi BDigital Tech, I'd like to know more about your Web Application Development services."
    }
  ];

  function getWhatsAppUrl(serviceId, phoneOverride) {
    var service = getServiceById(serviceId);
    var phone = phoneOverride || WHATSAPP_PHONE;
    var message = service ? service.whatsappMessage : "Hi BDigital Tech, I'd like to consult on connecting our business operations software.";
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  }

  function getPillars() {
    return PILLARS;
  }

  function getServices() {
    return SERVICES;
  }

  function getPillarById(pillarId) {
    for (var i = 0; i < PILLARS.length; i++) {
      if (PILLARS[i].id === pillarId) return PILLARS[i];
    }
    return null;
  }

  function getServicesByPillar(pillarId) {
    return SERVICES.filter(function (s) {
      return s.pillarId === pillarId;
    });
  }

  function getServiceById(serviceId) {
    for (var i = 0; i < SERVICES.length; i++) {
      if (SERVICES[i].id === serviceId) return SERVICES[i];
    }
    return null;
  }

  return {
    phone: WHATSAPP_PHONE,
    pillars: PILLARS,
    services: SERVICES,
    getPillars: getPillars,
    getServices: getServices,
    getPillarById: getPillarById,
    getServicesByPillar: getServicesByPillar,
    getServiceById: getServiceById,
    getWhatsAppUrl: getWhatsAppUrl
  };
});
