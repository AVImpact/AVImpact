export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image: string;
  };
  twitter: {
    card: string;
  };
  structuredData?: Array<Record<string, any>>;
}

export const seoData: Record<string, SEOConfig> = {
  "/": {
    title: "Enterprise Audio Visual & Collaboration Solutions | AV Impact",
    description: "AV Impact designs and installs premium video conferencing, boardroom setups, and sound reinforcement systems with top OEM brands. Explore our custom AV integration services.",
    canonical: "",
    openGraph: {
      title: "Enterprise Audio Visual & Collaboration Solutions | AV Impact",
      description: "AV Impact designs and installs premium video conferencing, boardroom setups, and sound reinforcement systems with top OEM brands. Explore our custom AV integration services.",
      type: "website",
      url: "",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AV Impact",
        "url": "ORIGIN_PLACEHOLDER"
      }
    ]
  },
  "/solutions": {
    title: "Custom Audio Visual Systems & Integration Services | AV Impact",
    description: "Explore AV Impact's solutions: boardroom integration, hybrid classrooms, town halls, and broadcast studios with Q-SYS, Shure, Crestron, and Bose.",
    canonical: "/solutions",
    openGraph: {
      title: "Custom Audio Visual Systems & Integration Services | AV Impact",
      description: "Explore AV Impact's solutions: boardroom integration, hybrid classrooms, town halls, and broadcast studios.",
      type: "website",
      url: "/solutions",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "ORIGIN_PLACEHOLDER/solutions" }
        ]
      }
    ]
  },
  "/projects": {
    title: "Solution Showcases & Audio Visual Installations | AV Impact",
    description: "Explore our portfolio of representative audio visual installations and solution showcases, covering corporate boardrooms, lecture halls, and media streaming spaces.",
    canonical: "/projects",
    openGraph: {
      title: "Case Studies & Collaboration Technology Deployments | AV Impact",
      description: "Read our portfolio of audio visual integration case studies, covering corporate boardrooms and hybrid lecture halls.",
      type: "website",
      url: "/projects",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "ORIGIN_PLACEHOLDER/projects" }
        ]
      }
    ]
  },
  "/brands-products": {
    title: "Collaborative Technologies, DSPs & Display Brands | AV Impact",
    description: "See the professional brands integrated by AV Impact (Shure, Crestron, Jabra, Cisco) and interact with our step-by-step Room Visualizer and Assembly.",
    canonical: "/brands-products",
    openGraph: {
      title: "Collaborative Technologies, DSPs & Display Brands | AV Impact",
      description: "See the professional brands integrated by AV Impact (Shure, Crestron, Jabra, Cisco) and interact with our step-by-step Room Visualizer and Assembly.",
      type: "website",
      url: "/brands-products",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Brands & Products", "item": "ORIGIN_PLACEHOLDER/brands-products" }
        ]
      }
    ]
  },
  "/industries": {
    title: "Custom AV Integration by Industry Sector | AV Impact",
    description: "Learn how AV Impact provides tailored audio visual and video conferencing solutions for corporate, education, healthcare, government, retail, and residential facilities.",
    canonical: "/industries",
    openGraph: {
      title: "Custom AV Integration by Industry Sector | AV Impact",
      description: "Learn how AV Impact provides tailored audio visual and video conferencing solutions for corporate, education, healthcare, government, retail, and residential facilities.",
      type: "website",
      url: "/industries",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Industries", "item": "ORIGIN_PLACEHOLDER/industries" }
        ]
      }
    ]
  },
  "/careers": {
    title: "Join Our Team - AV Integration Careers | AV Impact",
    description: "Explore open careers at AV Impact. We are looking for talented AV design engineers, CTS technicians, project managers, and presales specialists.",
    canonical: "/careers",
    openGraph: {
      title: "Join Our Team - AV Integration Careers | AV Impact",
      description: "Explore open careers at AV Impact for AV design engineers, technicians, and project managers.",
      type: "website",
      url: "/careers",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Careers", "item": "ORIGIN_PLACEHOLDER/careers" }
        ]
      }
    ]
  },
  "/contact": {
    title: "Connect with Our Systems Engineering Team | AV Impact",
    description: "Get in touch with AV Impact for quotes, site surveys, and systems integration questions. Located at our physical headquarters, serving global clients.",
    canonical: "/contact",
    openGraph: {
      title: "Contact Systems Engineering Specialists | AV Impact",
      description: "Reach out to AV Impact's CTS designers to draft a custom systems outline checklist today.",
      type: "website",
      url: "/contact",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "ORIGIN_PLACEHOLDER/contact" }
        ]
      }
    ]
  },
  "/about": {
    title: "About Us - Leaders in Collaboration Technology & AV Solutions | AV Impact",
    description: "Discover AV Impact's mission, values, and lifecycle process. We deliver integrated audio visual, video conferencing, and boardroom solutions designed to help teams work smarter.",
    canonical: "/about",
    openGraph: {
      title: "About Us - Leaders in Collaboration Technology & AV Solutions | AV Impact",
      description: "We deliver integrated audio visual, collaboration, and communication solutions that help organizations work smarter.",
      type: "website",
      url: "/about",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AV Impact",
        "url": "ORIGIN_PLACEHOLDER",
        "logo": "ORIGIN_PLACEHOLDER/assets/logo.webp",
        "sameAs": [
          "https://www.linkedin.com/company/av-impact"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": "ORIGIN_PLACEHOLDER/about" }
        ]
      }
    ]
  },
  "/company-profile": {
    title: "Official Corporate Capabilities & Design Services | AV Impact",
    description: "Official Capabilities Statement of AV Impact, showcasing our systems engineering lifecycle, technical support SLAs, and global OEM partnerships.",
    canonical: "/company-profile",
    openGraph: {
      title: "Official Corporate Capabilities & Design Services | AV Impact",
      description: "Official Capabilities Statement of AV Impact, showcasing our systems engineering lifecycle, technical support SLAs, and global OEM partnerships.",
      type: "website",
      url: "/company-profile",
      image: "/assets/boardroom_after.webp"
    },
    twitter: {
      card: "summary_large_image"
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN_PLACEHOLDER/" },
          { "@type": "ListItem", "position": 2, "name": "Company Profile", "item": "ORIGIN_PLACEHOLDER/company-profile" }
        ]
      }
    ]
  }
};
