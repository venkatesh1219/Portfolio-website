"use client";

import { motion } from "framer-motion";
import { skills, type Skill } from "@/lib/data";

const categories: Skill["category"][] = [
  "Cloud",
  "Containers",
  "IaC",
  "CI/CD",
  "Observability",
  "Languages",
];

export function SkillsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, ci) => {
        const items = skills.filter((s) => s.category === category);
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: ci * 0.06 }}
            className="rounded-xl border border-border bg-card/40 p-5"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              {category}
            </h3>
            <ul className="space-y-3.5">
              {items.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
