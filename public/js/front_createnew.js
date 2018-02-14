$(() => {
  baseURL = 'https://api.imgflip.com/get_memes';
  axios.get(baseURL)
    .then((response) => {
      response.data.data.memes.forEach((element, i, array) => {
        if (i == 0) {
          $(".carousel-inner").append(
            `<div class="carousel-item active"><img class="d-block w-100 ${element.id}" style="height:500px" src=${element.url} alt="<%= i %> slide"></div>`)
        } else {
          $(".carousel-inner").append(
            `<div class="carousel-item"><img class="d-block w-100 ${element.id}" style="height:500px" src=${element.url} alt="<%= i %> slide"></div>`)
        }
      })
      $(".carousel-inner").append(
        `<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>`
      )
      let img = $(".active img").attr("class").split(' ')[2];
      // console.log(img)
      document.getElementById("actualImg").value = img
    })
    $("#carouselExampleControls").on("slid.bs.carousel", () => {
      img =  $(".active img").attr("class").split(' ')[2]
      document.getElementById("actualImg").value = img
      // console.log(img)
    })
});
