"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 10000, suffix: "+", label: "Schools Nationwide", desc: "Senior secondary schools across all 36 states and FCT" },
  { value: 36, suffix: "", label: "States Covered", desc: "Every state and the Federal Capital Territory reached" },
  { value: 1, suffix: "M+", label: "Students Impacted", desc: "Students benefiting from NSSEC interventions" },
  { value: 6000, suffix: "+", label: "Teachers Trained", desc: "Educators equipped with 21st-century teaching skills" },
];

function CountUp({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#082c2c] relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-3">Impact at a Glance</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            NSSEC by the Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#082c2c] px-6 py-10 text-center hover:bg-[#0e4a4a]/60 transition-colors duration-300 group"
            >
              <p className="text-4xl sm:text-5xl font-black text-[#24c2c2] mb-2 tabular-nums">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white font-bold text-base mb-2">{s.label}</p>
              <p className="text-white/45 text-xs leading-relaxed hidden sm:block">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
