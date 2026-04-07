// app/publications/[slug]/page.js
import { publications } from "../../../lib/publications";
import { FileText, Download, AlertCircle, BookOpen, Search, Users, BarChart3, FileCheck, Scroll, Newspaper } from "lucide-react";
import Link from  "next/link";
export async function generateStaticParams() {
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

// Function to get icon based on slug
function getPublicationIcon(slug) {
  const iconMap = {
    "establishment-act": <Scroll className="w-8 h-8" />,
    "national-policy": <FileCheck className="w-8 h-8" />,
    "minimum-standards": <BookOpen className="w-8 h-8" />,
    "implementation-guidelines": <FileText className="w-8 h-8" />,
    "research-works": <Search className="w-8 h-8" />,
    "journals": <Newspaper className="w-8 h-8" />,
    "reports": <BarChart3 className="w-8 h-8" />,
    "data-digests": <BarChart3 className="w-8 h-8" />,
    "minimum-standards-nigeria": <FileText className="w-8 h-8" />
  };
  
  return iconMap[slug] || <FileText className="w-8 h-8" />;
}

// Function to format markdown-style content to JSX
function formatContent(content) {
  if (!content) return null;
  
  // Split content by double line breaks to get sections
  const sections = content.split('\n\n');
  
  return sections.map((section, index) => {
    const trimmedSection = section.trim();
    
    // Skip empty sections
    if (!trimmedSection) return null;
    
    // Handle standalone headers (lines that are just **text**)
    if (/^\*\*([^*]+)\*\*$/.test(trimmedSection) && !trimmedSection.includes('\n')) {
      const headerText = trimmedSection.replace(/^\*\*([^*]+)\*\*$/, '$1');
      return (
        <h2 key={index} className="text-2xl font-bold text-[#24c2c2] mb-6 mt-8 first:mt-0">
          {headerText}
        </h2>
      );
    }
    
    // Handle sections with bullet points
    if (trimmedSection.includes('\n*')) {
      const lines = trimmedSection.split('\n');
      const headerLine = lines[0];
      const bullets = lines.filter(line => line.trim().startsWith('*'));
      
      return (
        <div key={index} className="mb-8">
          {headerLine && !headerLine.startsWith('*') && (
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {headerLine.replace(/\*\*/g, '')}
            </h3>
          )}
          <ul className="list-none space-y-3 ml-0">
            {bullets.map((bullet, bulletIndex) => {
              const bulletText = bullet.replace(/^\*\s*/, '');
              const formattedText = bulletText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
              
              return (
                <li key={bulletIndex} className="flex items-start">
                  <span className="w-2 h-2 bg-[#24c2c2] rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                  <span 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    
    // Handle numbered sections
    if (/^\d+\./.test(trimmedSection)) {
      const lines = trimmedSection.split('\n');
      const items = [];
      let currentItem = null;
      
      lines.forEach(line => {
        if (/^\d+\./.test(line.trim())) {
          if (currentItem) items.push(currentItem);
          const titleText = line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
          currentItem = {
            title: titleText,
            content: []
          };
        } else if (line.trim().startsWith('*') && currentItem) {
          currentItem.content.push(line.trim().replace(/^\*\s*/, ''));
        } else if (line.trim() && currentItem && !line.trim().startsWith('*')) {
          // Handle additional content lines that aren't bullets
          currentItem.content.push(line.trim());
        }
      });
      
      if (currentItem) items.push(currentItem);
      
      return (
        <div key={index} className="mb-8">
          <div className="space-y-6">
            {items.map((item, itemIndex) => (
              <div key={itemIndex} className="border-l-4 border-[#24c2c2] pl-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h4>
                {item.content.length > 0 && (
                  <div className="space-y-2">
                    {item.content.map((contentItem, contentIndex) => {
                      const formattedContent = contentItem.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
                      
                      return (
                        <div key={contentIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                          <span 
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formattedContent }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Handle regular paragraphs
    const formattedParagraph = trimmedSection
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
      .replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    
    return (
      <div 
        key={index} 
        className="text-gray-700 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: formattedParagraph }}
      />
    );
  }).filter(Boolean);
}

// PDF Viewer Component
function PDFViewer({ pdfUrl, title }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#24c2c2]" />
          PDF Document
        </h3>
        <a 
          href={pdfUrl} 
          download
          className="inline-flex items-center px-4 py-2 bg-[#24c2c2] text-white rounded-lg hover:bg-[#1fa8a8] transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </a>
      </div>
      
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
        <iframe
          src={pdfUrl}
          title={title}
          className="w-full h-[700px] border-none"
          style={{ minHeight: '700px' }}
        />
      </div>
      
      <p className="text-sm text-gray-600 mt-4 text-center">
        If the PDF doesn`t display correctly, please{' '}
        <a 
          href={pdfUrl} 
          className="text-[#24c2c2] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here to view in a new tab
        </a>{' '}
        or download the document.
      </p>
    </div>
  );
}

export default function PublicationPage({ params }) {
  const publication = publications.find((p) => p.slug === params.slug);

  if (!publication) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Publication Not Found</h1>
          <p className="text-gray-600 mb-6">The requested publication could not be found.</p>
          <Link
            href="/publications/research-works" 
            className="inline-flex items-center px-6 py-3 bg-[#24c2c2] text-white rounded-lg hover:bg-[#1fa8a8] transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            View All Publications
          </Link>
        </div>
      </div>
    );
  }

  // Handle empty content
  if (!publication.content || publication.content.trim() === "") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-2 md:px-6 py-12">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#24c2c2] to-[#1fa8a8] rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center mb-4">
              {getPublicationIcon(publication.slug)}
              <h1 className="text-3xl font-bold ml-4">{publication.label}</h1>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white/90">
                This publication is currently being updated. Please check back later for the latest content.
              </p>
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
              <FileText className="w-16 h-16 text-[#24c2c2] mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Coming Soon</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We are currently preparing comprehensive content for this publication. 
                It will be available here once ready.
              </p>
              <Link
                href="/publications/research-works" 
                className="inline-flex items-center px-6 py-3 bg-[#24c2c2] text-white rounded-lg hover:bg-[#1fa8a8] transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Browse Other Publications
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle PDF display
  if (publication.content === "PDF_DISPLAY") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-12">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#24c2c2] to-[#1fa8a8] rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center mb-4">
              {getPublicationIcon(publication.slug)}
              <h1 className="text-3xl font-bold ml-4">{publication.label}</h1>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white/90">
                View and download the comprehensive minimum standards document for senior secondary education in Nigeria.
              </p>
            </div>
          </div>

          {/* PDF Viewer */}
          <PDFViewer 
            pdfUrl="/VALIDATED-MINIMUM-STANDARDS-NSSEC.pdf" 
            title={publication.label}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-2 md:px-6 py-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#24c2c2] to-[#1fa8a8] rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            {getPublicationIcon(publication.slug)}
            <h1 className="text-3xl font-bold ml-4">{publication.label}</h1>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-white/90">
              Official publication from the National Senior Secondary Education Commission (NSSEC)
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            {formatContent(publication.content)}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm">Published by NSSEC</span>
            </div>
            <Link 
              href="/publications" 
              className="inline-flex items-center px-4 py-2 bg-[#24c2c2] text-white rounded-lg hover:bg-[#1fa8a8] transition-colors text-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              View All Publications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}