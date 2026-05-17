interface ImportMetaEnv {
  readonly SEALCODE_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:sealcode-server" {
  export namespace Server {
    export const listen: typeof import("../../../sealcode/dist/types/src/node").Server.listen
    export type Listener = import("../../../sealcode/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../sealcode/dist/types/src/node").Config.get
    export type Info = import("../../../sealcode/dist/types/src/node").Config.Info
  }
  export namespace Log {
    export const init: typeof import("../../../sealcode/dist/types/src/node").Log.init
  }
  export namespace Database {
    export const getPath: typeof import("../../../sealcode/dist/types/src/node").Database.getPath
    export const Client: typeof import("../../../sealcode/dist/types/src/node").Database.Client
  }
  export namespace JsonMigration {
    export type Progress = import("../../../sealcode/dist/types/src/node").JsonMigration.Progress
    export const run: typeof import("../../../sealcode/dist/types/src/node").JsonMigration.run
  }
  export const bootstrap: typeof import("../../../sealcode/dist/types/src/node").bootstrap
}
