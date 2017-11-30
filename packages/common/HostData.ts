import { SupportedHostings } from './SupportedHostings';

type HostData = {
    /**
     * Hosting full name
     */
    fullName: string;
    /**
     * Favicon url
     */
    favicon: string;
    /**
     * Used to match host url
     */
    host: string;
}

const hostData: {[H in SupportedHostings]: HostData } = {
    bitbucket: {
        fullName: 'Bitbucket',
        favicon: 'bitbucket-favicon.ico',
        host: 'bitbucket'
    },
    github: {
        fullName: 'Github',
        favicon: 'github-favicon.ico',
        host: 'github'
    },
    githubgist: {
        fullName: 'Github Gist',
        favicon: 'github-favicon.ico',
        host: 'gist.github'
    },
    gitlab: {
        fullName: 'Gitlab',
        favicon: 'gitlab-favicon.ico',
        host: 'gitlab'
    },
    pastebin: {
        fullName: 'Pastebin',
        favicon: 'pastebin-favicon.ico',
        host: 'pastebin'
    },
    sourceforge: {
        fullName: 'Sourceforge',
        favicon: 'sourceforge-favicon.ico',
        host: 'sourceforge'
    }
}

export function getHostData(host: SupportedHostings) {
    return hostData[host];
}
