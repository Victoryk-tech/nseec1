import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/app/lib/imageUrl";

const components = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-3 leading-snug border-b border-gray-100 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-playfair text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-2">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-semibold text-gray-700 mt-4 mb-1">{children}</h5>
    ),
    normal: ({ children }) => (
      <p className="text-[1.05rem] text-gray-700 leading-[1.9] mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#24c2c2] pl-5 py-2 my-6 italic text-gray-600 bg-gray-50/70 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 my-5 pl-0 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-5 pl-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 text-[1rem] leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#24c2c2] flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[1rem] leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-[#24c2c2] underline-offset-2">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through text-gray-400">{children}</span>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-[#24c2c2] border border-gray-200">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#24c2c2] hover:text-[#1a9999] underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.cloudinaryUrl || (value?.asset ? urlFor(value).url() : null);
      if (!src) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={value?.alt || "Article image"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-2 text-sm text-center text-gray-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function MediaPortableText({ content }) {
  if (!content) return null;
  return (
    <div className="max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
