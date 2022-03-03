const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const json = require('formidable/src/plugins/json');

function sendHtml(res, htmlPath) {
    let filePath = path.normalize(
        path.join(__dirname, htmlPath)
    );

    const html = fs.createReadStream(filePath);

    html.on('data', (data) => {
        res.write(data);
    });

    html.on('end', () => {
        res.end();
    });

    html.on('error', (err) => {
        console.log(err);
    });
}

module.exports = (req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        const html = fs.createReadStream(filePath);

        html.on('data', (data) => {
            let breeds = JSON.parse(fs.readFileSync('./data/breeds.json').toString());
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder.join(''));
            res.write(modifiedData);
        });

        html.on('end', () => {
            res.end();
        });

        html.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }
            let oldPath = files.upload.filepath;
            let newPath = path.normalize(path.join('./content/images/' + files.upload.originalFilename));

            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    throw err;
                }
                console.log("File uploaded successfully");
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;

                let allCats = JSON.parse(data);
                allCats.push({ id: Math.floor(Math.random() * 10000000000), ...fields, image: files.upload.originalFilename });
                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, { location: '/' });
                    res.end();
                })
            })
        })
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        sendHtml(res, '../views/addBreed.html');
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData = data.toString();
        });

        req.on('end', () => {

            let body = qs.decode(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log('The breed was uploaded successfully'));
            });

            res.writeHead(302, { location: '/' });
            res.end();
        });
    } else if (pathname.includes('/cats/edit') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/editCat.html')
        );

        const html = fs.createReadStream(filePath);

        html.on('data', (data) => {
            let catId = req.url.split('/')[3];
            let cat = JSON.parse(fs.readFileSync('./data/cats.json').toString()).find(cat => cat.id == catId);
            
            let modifiedData = data.toString().replace('{{id}}', cat.id);
            modifiedData = modifiedData.replace('{{name}}', cat.name);
            modifiedData = modifiedData.replace('{{description}}', cat.description);
            
            let breeds = JSON.parse(fs.readFileSync('./data/breeds.json').toString());
            const catBreedOption = breeds.map(breed => breed === cat.breed ? `<option value="${breed}" selected>${breed}</option>` : `<option value="${breed}" selected>${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedOption.join(''));

            modifiedData = modifiedData.replace('{{breed}}', cat.breed);
            res.write(modifiedData);
        });

        html.on('end', () => {
            res.end();
        });

        html.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname.includes('/cats/edit') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }
            let oldPath = files.upload.filepath;
            let newPath = path.normalize(path.join('./content/images/' + files.upload.originalFilename));

            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    throw err;
                }
                console.log("File uploaded successfully");
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;
                
                let catId = req.url.split('/')[3];
                let allCats = JSON.parse(data);
                let currentCat = allCats.find(cat => cat.id = catId);
                currentCat.name = fields.name;
                currentCat.description = fields.description;
                currentCat.breed = fields.breed;
                currentCat.image = files.upload.originalFilename;

                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, { location: '/' });
                    res.end();
                });
            });
        });
    } else if (pathname.includes('/cats/find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/catShelter.html')
        );

        const html = fs.createReadStream(filePath);

        html.on('data', (data) => {
            let catId = req.url.split('/')[3];
            let cat = JSON.parse(fs.readFileSync('./data/cats.json').toString()).find(cat => cat.id == catId);
            
            let modifiedData = data.toString().replace(/{{name}}/g, cat.name);
            modifiedData = modifiedData.replace('{{description}}', cat.description);
            modifiedData = modifiedData.replace('{{image}}', path.join('/content/images/' + cat.image));
            let breeds = JSON.parse(fs.readFileSync('./data/breeds.json').toString());
            const catBreedOption = breeds.map(breed => breed === cat.breed ? `<option value="${breed}" selected>${breed}</option>` : `<option value="${breed}" selected>${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedOption.join(''));

            modifiedData = modifiedData.replace('{{breed}}', cat.breed);
            res.write(modifiedData);
        });

        html.on('end', () => {
            res.end();
        });

        html.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname.includes('/cats/find-new-home') && req.method === 'POST') {
        fs.readFile('./data/cats.json', 'utf-8', function readFileCallback(err, data) {
            if (err) {
                throw err;
            } else {
                let currentCats = JSON.parse(data);
                let catId = req.url.split('/')[3];
                currentCats = currentCats.filter(cat => cat.id != catId);
                let json = JSON.stringify(currentCats);
                fs.writeFile('./data/cats.json', json, 'utf-8', () => {
                    res.writeHead(302, { location: '/' });
                    res.end();
                });
            }
        });
    } else {
        return true;
    }
}
