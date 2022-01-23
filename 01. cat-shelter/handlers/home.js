const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let cats = JSON.parse(fs.readFileSync('./data/cats.json').toString());
            let modifiedCats = cats.map((cat) => {
                return `<li>
                <img src=${path.join('/content/images/' + cat.image)} alt=${cat.name}>
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`;
            });
            let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.write(modifiedData);
            res.end();
        })
    } else if (pathname === '/search' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let searchText = querystring.parse(req.url.split('?')[1]).searchText.toLocaleLowerCase();
            let cats = JSON.parse(fs.readFileSync('./data/cats.json').toString());
            let searchedCats = cats.filter(cat => {
                return cat.name.toLowerCase().includes(searchText)
                    || cat.description.toLocaleLowerCase().includes(searchText)
                    || cat.breed.toLocaleLowerCase().includes(searchText);
            })
            let modifiedCats = searchedCats.map((cat) => {
                return `<li>
                <img src=${path.join('/content/images/' + cat.image)} alt=${cat.name}>
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`;
            });
            let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.write(modifiedData);
            res.end();
        })
    } else {
        return true;
    }
}