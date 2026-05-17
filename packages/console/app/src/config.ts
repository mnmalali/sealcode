/**
 * Application-wide constants and configuration
 */
export const config = {
  // Base URL
  baseUrl: "https://github.com/mnmalali/sealcode",

  // GitHub
  github: {
    repoUrl: "https://github.com/mnmalali/sealcode",
    starsFormatted: {
      compact: "160K",
      full: "160,000",
    },
  },

  // Social links
  social: {
    twitter: "https://x.com/sealcode",
    discord: "https://discord.gg/sealcode",
  },

  // Static stats (used on landing page)
  stats: {
    contributors: "900",
    commits: "13,000",
    monthlyUsers: "7.5M",
  },
} as const
