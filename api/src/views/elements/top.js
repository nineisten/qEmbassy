import { lock } from "../components/svg/lock.js"
import { nav } from "../components/nav.js"
import { list } from "../components/list.js"

// main header //

export const top = (logo,li) => /*html*/`
        <header id="top_header">
            <div class='logo'>
                ${logo}
            </div>
            ${nav(list(li))}
            <div id="account" class="account" >
                <div class="avatar">
                    JD
                </div>
                ${lock()}
            </div>
        </header>
    ` 