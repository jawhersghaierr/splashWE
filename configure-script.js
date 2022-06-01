
const modul = require('./env-vars');

let modulesForLoading = '';

if (modul._this) {
        modulesForLoading = `<script src="${modul._this.url}:${modul._this.port}/${modul._this.fileName}"></script>`
}
modul.remotes.map(el=> {
        modulesForLoading += `<script src="${el.url}:${el.port}/${el.fileName}"></script>\n`

})

const fs = require('fs');


fs.readFile('./dist/index.html', 'utf8', (err, data) =>
    err ? console.log("ERROR" + err)
        : fs.writeFile(
            './dist/index.html',
            data.replace(`<head>`, `<head>${modulesForLoading}`),
            'utf8',
            (err) =>
                err ? console.log("ERROR" + err)
                    : console.log("SUCCESS")
        )
);
