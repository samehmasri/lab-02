'use strict';

let keyArray = []; // array of keywords\

// take the data and loop it and make object for everyone of them
$.ajax('data/page-1.json')
    .then(data => {
        data.forEach((item) => {

            let newHorn = new Horn(item);

            newHorn.render();
        })
        renderHorn();
    })
// constructer function takes the data from page-1.json and creates it as an object
function Horn(value) {
    this.title = value.title;
    this.description = value.description;
    this.keyword = value.keyword;
    this.image_url = value.image_url;
}
// prototype renders the data and append it to html
Horn.prototype.render = function () {

    let hornClone = $('.photo-template').clone();
    hornClone.removeClass('photo-template');
    hornClone.addClass(this.keyword);//class for each element
    hornClone.find('.h2Text').text(this.title);
    // find the img atrr and give it css codes
    hornClone.find('img').attr({
        src: this.image_url,
        // width: "200px",
        alt: this.title
    }
    )
    hornClone.find('p').text(this.description);
    $('main').append(hornClone);

    if (!(keyArray.includes(this.keyword))) {//for the repetation tekrrar
        keyArray.push(this.keyword);
    }
}
// console.log(keyArray);

function renderHorn() {
    keyArray.forEach(element => {

        $('select').append(`<option value="${element}">${element}</option>`);
    });
}


$('select').on('change', function () {
    console.log($(this).val());
    for (let i = 0; i < keyArray.length; i++) {
        $(`.${keyArray[i]}`).css('display', '');
        //delete then render again
    }


    for (let i = 0; i < keyArray.length; i++) {
        if ("default" == $(this).val()) {
            $(`.${keyArray[i]}`).toggle();
        }

    }

    for (let i = 0; i < keyArray.length; i++) {
        if (keyArray[i] != $(this).val()) {
            $(`.${keyArray[i]}`).toggle();
        }
    }
    // trying to make the code as Razan said but it didn't work
    // $('div').hide();
    // let selectdOption = $(this).val();
    // $(selectdOption).fadeIn(800);
    // $('.${selectdOption}').fadeIn(800);
    // console.log(this.val);


})