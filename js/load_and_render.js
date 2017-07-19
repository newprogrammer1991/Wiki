(function () {
    'use strict';
    let search = document.querySelector('.search');
    let form = document.querySelector('.search__form');
    let url = "https://en.wikipedia.org/w/api.php?";
    let btn = document.querySelector('.header__button-trigger');
    let container = document.querySelector('.article-list');
    let check;
    let param = {
        origin: '*',//for CORS
        action: 'query',
        generator: 'search',
        gsrsearch: '',
        prop: 'info|extracts',
        exintro: 'true',
        explaintext: 'true',
        exsentences: 1,
        format: 'json'
    };

    function buildUrl(obj) {
        let param = [];
        for (let key in obj) {
            param.push(key + '=' + obj[key])
        }
        return url + param.join('&');
    };

    function httpGet(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(JSON.parse(this.response));
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });

    }

    function download() {
        let text = search.value;
        param.gsrsearch = text;
        httpGet(buildUrl(param)).then(function (answer) {
            add(answer);
        }, function (answer) {
            console.log(answer)
        })
    };

    function add(obj) {
        let fragment = document.createDocumentFragment();
        container.innerHTML = '';
        obj = obj.query.pages;
        for (let key in obj) {
            let element = render(obj[key]);
            fragment.appendChild(element);
        }
        container.appendChild(fragment);
    };

    function render(obj) {
        let template = document.querySelector('.template');
        let element = template.content.children[0].cloneNode(true);
        let page = 'https://en.wikipedia.org/?curid=';
        element.querySelector('.article-list__link').setAttribute('href', page + obj.pageid);
        element.querySelector('.article-list__title').textContent = obj.title;
        element.querySelector('.article-list__preload-text').textContent = obj.extract;
        return element
    };

    document.addEventListener('keydown', function () {
        if (event.keyCode == 13 && document.activeElement == search) {
            download();
        }
    });
    btn.addEventListener('click', function () {
        container.innerHTML = '';
    })


})();
