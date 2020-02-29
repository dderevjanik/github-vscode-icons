import { App, app } from "peryl/dist/hsml-app";
import { h } from "peryl/dist/hsml-h";
import { HsmlFragment } from "peryl/dist/hsml";
import { sendMessage } from "../shared/Messenger";
import { IConfig } from "../shared/IConfig";
import { defaultConf } from "../shared/DefaultConf";

interface State {
    changed: boolean;
    extVersion: string;
    conf: IConfig;
}

const state: State = {
    changed: false,
    extVersion: "1.0",
    conf: defaultConf
};

function view(state: State): HsmlFragment {
    return [
        h("div", [
            h("h2.subtitle", [
                h("img", { src: "icon16.png" }),
                " Toggle VSCode Icons"
            ]),
            h("form", { on: ["change", "FORM_CHANGE"] }, [ // checkboxes
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "github", checked: state.conf.hosts.github.showIcons }),
                    " Github",
                ]), h("br"),
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "gist.github", checked: state.conf.hosts["gist.github"].showIcons }),
                    " Gist Github",
                ]), h("br"),
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "gitlab", checked: state.conf.hosts.gitlab.showIcons }),
                    " Gitlab",
                ]), h("br"),
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "bitbucket", checked: state.conf.hosts.bitbucket.showIcons }),
                    " Bitbucket",
                ]), h("br"),
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "pastebin", checked: state.conf.hosts.pastebin.showIcons }),
                    " Pastebin",
                ]), h("br"),
                h("label.checkbox", [
                    h("input", { type: "checkbox", name: "sourceforge", checked: state.conf.hosts.sourceforge.showIcons, disabled: true }),
                    h("i", " Sourceforge")
                ])
            ]),
            state.changed
                ? h("small.has-text-danger", [
                    h("i", "To see changes, reaload page")
                ])
                : h("br"),
            h("small", { style: "margin-top: 10px" }, [
                h("p", [
                    h("a", { href: "https://github.com/dderevjanik/github-vscode-icons", target: "_blank" }, "Report an issue or send feedback")
                ]),
                h("p", [
                    h("i", `Extension version: ${state.extVersion}`)
                ])
            ])
        ])
    ];
}

function actions(app: App<State>, action: string | number, data: any, ev: any) {
    if (action === "CONF_UPDATE") {
        app.state.conf = data;
        app.update();
    } else if (action === "EXT_VER") {
        app.state.extVersion = data;
        app.update();
    } else if (action === "FORM_CHANGE") {
        const key = Object.keys(data)[0];
        const val = data[key];
        // @ts-ignore
        app.state.conf.hosts[key].showIcons = val === "true" ? true : false;
        app.state.changed = true;
        sendMessage({ type: "CONF_SET", payload: app.state.conf });
        app.update();
    }
}

const a = app(state, view, actions).mount("#div");

(async function () {
    sendMessage({ type: "CONF_GET", payload: {} }).then((conf: IConfig) => {
        console.log(`[VSCODE-ICONS] Retrieved conf from background ${conf}`);
        a.action("CONF_UPDATE", conf);
    });
    sendMessage({ type: "EXT_GET_VER", payload: {} }).then((ver: string) => {
        a.action("EXT_VER", ver);
    });
}())
