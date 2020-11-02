interface Options {
  now?: Date;
  cache?: Map<any, any>;
  mirror?: string;
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
}

declare function nv(alias?: string|string[], opts?: Options): Promise<VersionInfo[]>;
export = nv;
