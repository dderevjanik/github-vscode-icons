import { IConfig } from "./IConfig";

export const defaultConf: IConfig = {
    hosts: {
      bitbucket: {
        fullName: 'Bitbucket',
        favicon: 'bitbucket-favicon.ico',
        host: 'bitbucket',
        showIcons: false
      },
      github: {
        fullName: 'Github',
        favicon: 'github-favicon.ico',
        host: 'github',
        showIcons: true
      },
      "gist.github": {
        fullName: 'Github Gist',
        favicon: 'github-favicon.ico',
        host: 'gist.github',
        showIcons: false
      },
      gitlab: {
        fullName: 'Gitlab',
        favicon: 'gitlab-favicon.ico',
        host: 'gitlab',
        showIcons: true
      },
      pastebin: {
        fullName: 'Pastebin',
        favicon: 'pastebin-favicon.ico',
        host: 'pastebin',
        showIcons: false
      },
      sourceforge: {
        fullName: 'Sourceforge',
        favicon: 'sourceforge-favicon.ico',
        host: 'sourceforge',
        showIcons: false
      }
    }
  }
