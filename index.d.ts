interface Options {
  now?: Date;
  cache?: Map<any, any>;
  mirror?: string;
  latestOfMajorOnly?: Boolean;
  ignoreFutureReleases?: Boolean;
}

interface VersionInfo {
  version: string;
  major: number;
  minor: number;
  patch: number;
  tag: string;
  codename: string;
  versionName: string;
  start?: Date;
  lts?: Date;
  maintenance?: Date;
  end?: Date;
  releaseDate: Date;
  isLts: boolean;
  files: string[];
  dependencies: {
    npm: string,
    v8: string,
    uv: string,
    zlib: string,
    openssl: string
  };
}

declare function nv(alias?: string|string[], opts?: Options): Promise<VersionInfo[]>;
export = nv;
