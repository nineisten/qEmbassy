export const content=(...sec)=>/*html*/`
<div id="content">
    ${sec.map(item=>item.join(''))}
</div>
`