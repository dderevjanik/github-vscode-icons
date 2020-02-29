export interface HostConf {
  fullName: string;
  favicon: string;
  showIcons: boolean;
  host: string;
}

export interface IConfig {
  hosts: {
    github: HostConf;
    "gist.github": HostConf;
    gitlab: HostConf;
    bitbucket: HostConf;
    pastebin: HostConf;
    sourceforge: HostConf;
  }
}
