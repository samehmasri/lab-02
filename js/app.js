

let AllData = [];
$.ajax("../data/page-1.json").then(data => {
    data.forEach(element => {


        let Data = new animal(element);
        AllData.push(element);


        Data.render();
    });
    $(".photo-template").first().hide();
})
function animal(a) {
    this.image = a.image_url;
    this.title = a.title;
    this.description = a.description;
    this.horns = a.horns;
    this.keyword = a.keyword;
}
animal.prototype.render = function () {

    let template = $(".photo-template").first().clone();
    template.find("h2").text(this.title);
    template.find("img").attr("src", this.image);
    template.find("p").text(this.description);
    $("main").append(template)

}
$("#selection").change(function (e) {
    e.preventDefault();
    $("main").html("");
    let divTemp = $("main").append("<div></div>");
    $("div").addClass('photo-template');
    AllData.forEach(element => {
        if (element.keyword == $("#selection").val()) {
            Render(element);

        }

    });
    $(".photo-template").first().hide();
});
let Render = render = d => {
    let template = $(".photo-template").first().clone();
    template.append("<h2></h2>")
    template.append("<img></img>")
    template.append("<p></p>")
    template.find("h2").text(d.title);
    template.find("img").attr("src", d.image_url);
    template.find("p").text(d.description);
    $("main").append(template)
}