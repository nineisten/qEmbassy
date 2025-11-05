export const section = (...content)=>{
    if(content === Array){
        return /*html*/`
        ${content.map(sec=>sec).join('')}
        `
    }
return /*html*/`
<section>
    ${content}
</section>
`
}