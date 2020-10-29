import { getAccountAndPassword, handleUnitTest } from "./main";

if (location.href.includes("sso.unipus.cn/sso/login")) {
    setTimeout(getAccountAndPassword, 500);
}

setTimeout(handleUnitTest, 2000);
