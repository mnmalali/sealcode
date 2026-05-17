declare global {
  const SEALCODE_VERSION: string
  const SEALCODE_CHANNEL: string
}

export const InstallationVersion = typeof SEALCODE_VERSION === "string" ? SEALCODE_VERSION : "local"
export const InstallationChannel = typeof SEALCODE_CHANNEL === "string" ? SEALCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
