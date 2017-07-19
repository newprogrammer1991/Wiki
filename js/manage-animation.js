/**
 * Created by ALI on 7/18/2017.
 */
(function () {
    let btn = document.querySelector('.header__button-trigger');
    let searchBox = document.querySelector('.search-box');
    let  search=document.querySelector('.search');

    btn.addEventListener('click', function () {
        searchBox.classList.toggle('search__is-visible');
        btn.classList.toggle('search__is-visible');
        search.focus();
    })

})();


