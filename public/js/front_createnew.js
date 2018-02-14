$(() => {
    let img = ($(".active img")
        .attr("src"))
        .split('/')[3];
    document.getElementById("actualImg").value = img
    $("#carouselExampleControls").on("slid.bs.carousel", () => {
        img = ($(".active img")
        .attr("src"))
        .split('/')[3]
        document.getElementById("actualImg").value = img
    })
    baseURL = 'https://api.imgflip.com/get_memes';
    axios.get(baseURL)
         .then((response)=>{
           console.log(response)
         })
});
