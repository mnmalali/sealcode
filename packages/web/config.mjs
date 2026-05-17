const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://github.com/mnmalali/sealcode" : `https://${stage}.github.com/mnmalali/sealcode`,
  console: stage === "production" ? "https://github.com/mnmalali/sealcode/auth" : `https://${stage}.github.com/mnmalali/sealcode/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/mnmalali/sealcode",
  discord: "https://github.com/mnmalali/sealcode/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
