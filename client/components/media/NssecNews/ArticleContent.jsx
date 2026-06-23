import {PortableText} from '@portabletext/react'
import Image from 'next/image'

const components = {
  types: {
    image: ({value}) => {
      const src = value.cloudinaryUrl || value.asset?.url
      if (!src) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
            <Image src={src} alt={value.alt || ''} fill className="object-cover" unoptimized />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({children, value}) => (
      <h2
        id={value._key}
        className="font-playfair text-2xl font-bold text-[#0e4f6b] mt-10 mb-4 scroll-mt-24 border-l-4 border-[#24c2c2] pl-4"
      >
        {children}
      </h2>
    ),
    h3: ({children, value}) => (
      <h3
        id={value._key}
        className="font-playfair text-xl font-bold text-[#0e4f6b] mt-8 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({children, value}) => (
      <h4
        id={value._key}
        className="font-semibold text-lg text-[#0e4f6b] mt-6 mb-2 scroll-mt-24"
      >
        {children}
      </h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[#24c2c2] pl-6 py-2 my-8 bg-[#24c2c2]/5 rounded-r-xl italic text-[#1a6b8a] text-lg font-medium leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({children}) => (
      <p className="text-gray-700 leading-8 mb-5 text-[1.05rem]">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li className="leading-7">{children}</li>,
    number: ({children}) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    underline: ({children}) => <span className="underline">{children}</span>,
    'strike-through': ({children}) => <s>{children}</s>,
    code: ({children}) => (
      <code className="bg-gray-100 text-[#0e4f6b] font-mono text-sm px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({value, children}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#24c2c2] underline hover:text-[#1a9999] transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function ArticleContent({body}) {
  if (!body || !Array.isArray(body)) return null
  return (
    <div className="nssec-article-body">
      <PortableText value={body} components={components} />
    </div>
  )
}
