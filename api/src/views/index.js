import { top } from "./components/top.js";
import { footer } from "./components/footer.js";
import { sidebar } from "./components/sidebar.js";
import { nav } from "./components/nav.js";
import {navList} from "../models/navList.js"
import { list } from "./components/list.js";


export const homepageTemplate = ()=>/*html*/`
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
        <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
        <title>qEmbassy</title>
        
    </head>
    <body>
        <div id="container" class="container">
            ${top('qEmbassy')}
                <main id="main_content" class="main_content">
                    ${sidebar(nav(list(navList.guest.list)))}
                </main>
           ${footer()}
        </div>
    </body>
</html>

`