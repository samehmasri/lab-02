'use strict';
let pageNumber = 1;
let keyArray = ["default"];
let sortt = "";
$("#switch").on("click", function () {
    if (pageNumber == 1) {
        pageNumber = 2;
    } else {
        pageNumber = 1;
    }
    $("main").text("");
    keyArray = ["default"];
    if (sortt == "sort") {
        all("sort");
    } else if (sortt == "horns") {
        all("horns");
    } else {
        all();
    }
});
$("#sort").on("click", function () {
    $("main").text("");
    keyArray = ["default"];
    sortt = "sort";
    all("sort");
});
$("#horns").on("click", function () {
    sortt = "horns";
    $("main").text("");
    keyArray = ["default"];
    all("horns");
});
all();
function all(sortt = "try") {
    $.ajax(`data/page-${pageNumber}.json`)
        .then(data => {
            if (sortt == "sort") {
                data.sort(function (a, b) {
                    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
            if (sortt == "horns") {
                data.sort(function (a, b) {
                    return a.horns - b.horns;
                });
            }
            data.forEach((item) => {
                let newHorn = new Horn(item);
                newHorn.render();
            })
            renderHorn();
        })
    function Horn(value) {
        this.title = value.title;
        this.description = value.description;
        this.keyword = value.keyword;
        this.image_url = value.image_url;
    }
    Horn.prototype.render = function () {
        let template = $('#templateHorn').html();
        // console.log(this);
        let mustacheObject = Mustache.render(template, this);
        // console.log(mustacheObject);
        if (!(keyArray.includes(this.keyword))) {
            keyArray.push(this.keyword);
        }
        $('main').append(mustacheObject);
    }
    
    $('select').on('change', function () {
        
        for (let i = 0; i < keyArray.length; i++) {
            $(`.${keyArray[i]}`).css('display', '');
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
    })
}
function renderHorn() {
    $('select').text("");
    keyArray.forEach(element => {
        $('select').append(`<option value="${element}">${element}</option>`);
    });
}