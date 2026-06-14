"use client";

import { Award, Calendar, CheckCircle, ExternalLink, Server, Network, Database, Shield, Code, Cloud } from 'lucide-react';
import Image from 'next/image';

const certificates = [
  {
    id: 1,
    title: "On-The-Job Training Completion",
    subtitle: "Computer System Servicing & Technical Support",
    issuer: "Makerspace InnovHub OPC",
    date: "Feb 4 - May 27, 2026",
    credentialId: "OJT-MAKERSPACE-2026",
    imageUrl: "/Certificate/e3a980a7-0fe4-44fc-bf00-ce745dffe83f.jpg",
    link: "#",
    description: "Completed 486 hours of intensive on-the-job training in Web Development, gaining hands-on experience in building modern web applications and front-end development.",
    category: "Professional Training"
  },
  {
    id: 2,
    title: "Computer System Servicing",
    subtitle: "Networking and Server Setup - Industry Ready Skills",
    issuer: "ICT Training Program",
    date: "2025",
    credentialId: "CSS-NET-SRV-2025",
    imageUrl: "/Certificate/869d40e6-af62-493c-b435-b3a948708539.jpg",
    link: "#",
    description: "Comprehensive training program focused on networking infrastructure, server deployment, and industry-ready ICT skills for graduates.",
    category: "Technical Certification"
  },
  {
    id: 3,
    title: "Computer System Servicing NC II",
    subtitle: "Assessment Completion - COC1 to COC4",
    issuer: "TESDA",
    date: "2025",
    credentialId: "CSS-NCII-2025-001",
    imageUrl: "/Certificate/15fed4b9-ebd8-467d-9ec0-644de2cd0cd8.jpg",
    link: "#",
    description: "Complete assessment covering all four Competency Outcome Categories (COC1-COC4) for Computer System Servicing National Certification Level II.",
    category: "National Certification"
  },
  {
    id: 4,
    title: "Salesforce VIP Program",
    subtitle: "Virtual Internship Program",
    issuer: "SmartBridge",
    date: "2025",
    credentialId: "SF-VIP-SB-2025",
    imageUrl: "/Certificate/6058fba5-42f2-4b56-9104-15c1a8084ea0.jpg",
    link: "#",
    description: "Completed the Salesforce Virtual Internship Program, gaining hands-on experience with Salesforce platform and CRM solutions.",
    category: "Virtual Internship"
  },
  {
    id: 5,
    title: "Database Programming with SQL",
    subtitle: "Oracle Academy - English Track",
    issuer: "Oracle Academy",
    date: "2025",
    credentialId: "ORA-SQL-2025-001",
    imageUrl: "/Certificate/03d583cd-8d68-4f61-8043-5a480399cc34.jpg",
    link: "#",
    description: "Advanced database programming course covering SQL fundamentals, data manipulation, and database design principles.",
    category: "Academic Certification"
  },
  {
    id: 6,
    title: "Introduction to Cybersecurity",
    subtitle: "Cisco Networking Academy",
    issuer: "Universidad de Dagupan",
    date: "2025",
    credentialId: "CSCO-CYBER-INTRO-001",
    imageUrl: "/Certificate/CCNA Cert/f2d3f7ee-2150-4c0e-861c-f9f953d972b9.jpg",
    link: "#",
    description: "Foundational cybersecurity course covering threat landscape, security best practices, and defense mechanisms.",
    category: "Cybersecurity"
  },
  {
    id: 7,
    title: "Introduction to Cybersecurity",
    subtitle: "Networking Academy Program",
    issuer: "Cisco Networking Academy",
    date: "2025",
    credentialId: "CSCO-CYBER-INTRO-002",
    imageUrl: "/Certificate/CCNA Cert/4ac49175-aaf0-4556-addc-53698ed76f62.jpg",
    link: "#",
    description: "Comprehensive introduction to cybersecurity principles, practices, and technologies for protecting networks and data.",
    category: "Cybersecurity"
  },
  {
    id: 8,
    title: "Cybersecurity Essentials",
    subtitle: "Cisco Networking Academy",
    issuer: "Cisco Networking Academy",
    date: "2025",
    credentialId: "CSCO-CYBER-ESS-001",
    imageUrl: "/Certificate/CCNA Cert/5ea6c907-5cbe-4111-afba-bdba25426d77.jpg",
    link: "#",
    description: "Essential cybersecurity concepts including security monitoring, endpoint protection, and cryptographic techniques.",
    category: "Cybersecurity"
  },
  {
    id: 9,
    title: "CCNAv7: Introduction to Networks",
    subtitle: "Cisco Certified Network Associate",
    issuer: "Cisco Networking Academy",
    date: "2025",
    credentialId: "CSCO-CCNAv7-INTRO-001",
    imageUrl: "/Certificate/CCNA Cert/2c4cc33d-55b0-468f-a1a6-63ec05d82a76.jpg",
    link: "#",
    description: "Foundational networking course covering network fundamentals, IP addressing, protocols, and basic routing concepts.",
    category: "Networking"
  },
  {
    id: 10,
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    subtitle: "Cisco Certified Network Associate",
    issuer: "Universidad de Dagupan / Cisco Networking Academy",
    date: "2025",
    credentialId: "CSCO-CCNA-SRW-001",
    imageUrl: "/Certificate/CCNA Cert/8a5a817f-5b94-47ea-9474-a5fb9786c37e.jpg",
    link: "#",
    description: "Advanced networking concepts including switching technologies, routing protocols, and wireless network configuration.",
    category: "Networking"
  },
  {
    id: 11,
    title: "CCNA: Enterprise Networking, Security, and Automation",
    subtitle: "Cisco Certified Network Associate",
    issuer: "Universidad de Dagupan / Cisco Networking Academy",
    date: "2025",
    credentialId: "CSCO-CCNA-ENSA-001",
    imageUrl: "/Certificate/CCNA Cert/32911df0-b3cb-4ad6-8c70-cc332651253e.jpg",
    link: "#",
    description: "Enterprise-level networking focusing on automation, programmability, security, and advanced network management.",
    category: "Networking"
  }
];

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "Networking": return <Network className="w-4 h-4" />;
    case "Cybersecurity": return <Shield className="w-4 h-4" />;
    case "Database": return <Database className="w-4 h-4" />;
    case "Programming": return <Code className="w-4 h-4" />;
    default: return <Award className="w-4 h-4" />;
  }
};

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl mb-4 shadow-lg shadow-red-500/25">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            Certificates & Achievements
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications and technical achievements in Networking, Cybersecurity, and IT Infrastructure
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{certificates.length}+</div>
            <div className="text-xs text-gray-400">Certifications</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">6+</div>
            <div className="text-xs text-gray-400">CCNA Courses</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">3+</div>
            <div className="text-xs text-gray-400">Cybersecurity Certs</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">Cisco</div>
            <div className="text-xs text-gray-400">Networking Academy</div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black border border-red-500/20 rounded-xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
            >
              {/* Certificate Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                  }}
                />
                <div className="fallback-icon hidden absolute inset-0 flex items-center justify-center">
                  <Award className="w-12 h-12 text-red-500/30 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Category Badge */}
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-red-500 border border-red-500/30 flex items-center gap-1">
                  {getCategoryIcon(cert.category)}
                  <span>{cert.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{cert.subtitle}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                
                <p className="text-red-500 text-sm font-medium mb-3">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">
                  {cert.description}
                </p>

                {/* Credential ID */}
                <div className="text-xs text-gray-500 mb-4 font-mono">
                  Credential ID: {cert.credentialId}
                </div>

                {/* Verify Button */}
                {cert.link !== "#" && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                  >
                    Verify Certificate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}