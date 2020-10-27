import { Global } from "@src/global";

let startUnitIndex = (Global.USER_SETTINGS.rangeStart - 1) * 6;
let endUnitIndex = Global.USER_SETTINGS.rangeEnd * 6 - 1;
let startUnit: HTMLElement;
function get_startUnit() {
    for (let [index, unit] of document.querySelectorAll("#sidemenu li.group").entries()) {
        if (index == startUnitIndex) startUnit = unit as HTMLElement;
    }
}

function auto_next(selector: string, classFlag: string, switchLevel: number) {
    let flag = false;
    for (let [index, unit] of document.querySelectorAll(selector).entries()) {
        if (flag) {
            (unit as HTMLElement).click();
            flag = false;
            break;
        }
        if (unit.classList.contains(classFlag)) {
            flag = true;
            console.error(index, unit);
            if (Global.USER_SETTINGS.range)
                if (switchLevel == 1) {
                    if (index < startUnitIndex) {
                        //跳转至开始单元
                        startUnit.click();
                        break;
                    }
                    if (index >= endUnitIndex) {
                        if (Global.USER_SETTINGS.loop) {
                            startUnit.click();
                            break;
                        }
                    }
                }
        }
    }
}

function generate_interval() {
    let rate = 1;
    if (Global.USER_SETTINGS.randomInterval) {
        rate = Math.random();
        if (rate < 0.5) rate = 0.5;
    }
    return Global.USER_SETTINGS.switchInterval * rate * 60 * 1000;
}

export function recur() {
    setTimeout(() => {
        switch (Global.USER_SETTINGS.switchLevel) {
            case 3:
                auto_next(".layoutHeaderStyle--circleTabsBox-jQdMo a", "selected", 3);
            // fall through
            case 2:
                auto_next("#header .TabsBox li", "active", 2);
            // fall through
            case 1:
                auto_next("#sidemenu li.group", "active", 1);
            // fall through
            default:
                if (Global.USER_SETTINGS.loop) {
                    try {
                        (document.querySelector("#sidemenu li.group") as HTMLElement).click();
                    } catch (error) {}
                }
        }
        recur();
    }, generate_interval());
}

export function handleAlert() {
    setTimeout(() => {
        get_startUnit();
        try {
            document
                .querySelector("div.dialog-header-pc--dialog-header-2qsXD")!
                .parentElement!.querySelector("button")!
                .click();
        } catch (e) {}
    }, 5000);
}
