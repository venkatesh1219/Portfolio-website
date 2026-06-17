/**
 * Simplified, brand-tinted SVG glyphs for DevOps tools.
 * Used decoratively in the animated background and the hero orbit.
 * Kept dependency-free; shapes are approximations, not official logos.
 */
import * as React from "react";

type IconProps = { className?: string };

export function AwsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <text
        x="16"
        y="15"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        fill="#FF9900"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        aws
      </text>
      <path
        d="M7 20c5 3 13 3 18 0"
        stroke="#FF9900"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M22 18.6l3.2 1.2-1.1 3.1"
        stroke="#FF9900"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KubernetesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M16 3l10.4 5 2.6 11.3-7.2 9H10.2L3 19.3 5.6 8 16 3z" fill="#326CE5" />
      <g stroke="#fff" strokeWidth="1.3" strokeLinecap="round">
        <path d="M16 7.5v3.2M16 21.3v3.2M9.2 12.2l2.7 1.6M20.1 17.6l2.7 1.6M9.2 19.4l2.8-1.6M20 13.8l2.8-1.6" />
      </g>
      <circle cx="16" cy="16" r="2.3" fill="#fff" />
    </svg>
  );
}

export function DockerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <g fill="#2496ED">
        <rect x="7" y="14.5" width="4" height="4" rx="0.5" />
        <rect x="12" y="14.5" width="4" height="4" rx="0.5" />
        <rect x="17" y="14.5" width="4" height="4" rx="0.5" />
        <rect x="12" y="9.5" width="4" height="4" rx="0.5" />
        <rect x="17" y="9.5" width="4" height="4" rx="0.5" />
        <rect x="22" y="14.5" width="4" height="4" rx="0.5" />
      </g>
      <path
        d="M4 19.5c1.6 3.2 5 4.3 9 4.3 7 0 13-3.3 15-9.2 1.6 1 3.2.8 4.2-.3-1.1-1.6-3.2-1.5-4.2-.6"
        fill="#2496ED"
      />
    </svg>
  );
}

export function TerraformIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#7B42BC" aria-hidden="true">
      <path d="M13 6l6 3.5v7L13 13z" />
      <path d="M20 10l6 3.5v7L20 17z" />
      <path d="M13 14l6 3.5v7L13 21z" />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#fff" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.9 18 5.2 18 5.2c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export function PrometheusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#E6522C" aria-hidden="true">
      <path d="M16 3c3.5 4 .8 7 2.4 9.4C20 15 22 14.2 22 17.2c0 3.4-2.7 5.8-6 5.8s-6-2.4-6-5.8c0-3 2.4-3.9 3.4-5.8C16.5 8 12.6 6.4 16 3z" />
      <rect x="9.5" y="24" width="13" height="2.6" rx="1.3" />
      <rect x="12" y="27.2" width="8" height="2.2" rx="1.1" />
    </svg>
  );
}

export type Tech = {
  name: string;
  Icon: React.FC<IconProps>;
  color: string;
};

export const techTools: Tech[] = [
  { name: "AWS", Icon: AwsIcon, color: "#FF9900" },
  { name: "Kubernetes", Icon: KubernetesIcon, color: "#326CE5" },
  { name: "Terraform", Icon: TerraformIcon, color: "#7B42BC" },
  { name: "Docker", Icon: DockerIcon, color: "#2496ED" },
  { name: "Prometheus", Icon: PrometheusIcon, color: "#E6522C" },
  { name: "GitHub", Icon: GitHubIcon, color: "#ffffff" },
];
