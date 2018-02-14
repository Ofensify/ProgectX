$(() => {
    let img = ($(".active img").attr("src")).split('/')[3];
    // console.log($(".carousel-item.active img").attr("src"))
    $("#carouselExampleControls").on("slid.bs.carousel", () => {
    //    console.log( ($(".active img").attr("src")).split('/')[3]);
        img = $(".active img").attr("src")
    })
    $("#doit").click(() => {
        console.log(img)
        console.log($("#Edad option:selected").val());
        console.log($("#Sexo option:selected").val())
        console.log($("#Guapo option:selected").val())
        console.log($("#Complex option:selected").val())
        console.log($("#Color option:selected").val())
        console.log($("#destino").val())
    })
});