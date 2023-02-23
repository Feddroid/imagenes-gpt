const form = document.querySelector("form");
const input = document.querySelector("#prompt");

// document.addEventListener("DOMContentLoaded", () => {
fetch("/images")
  .then((response) => response.json())
  .then((data) => {
    console.log({ data });
    // Iterar sobre la lista de nombres de archivo y crear elementos <img>
    data.forEach((filename) => {
      const image = document.createElement("img");
      image.src = "/images/" + filename;
      document.querySelector("#results").appendChild(image);
    });
  })
  .catch((error) => {
    console.log("Error retrieving image list", error.message);
  });
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = { prompt: input.value };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("/generate-image", options)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      if (data?.filename) {
        const image = document.createElement("img");
        image.src = "/images/" + data.filename;

        const imageContainer = document.querySelector("#results");
        const firstImage = imageContainer.firstChild;

        imageContainer.insertBefore(image, firstImage);
      }
    })
    .catch((error) => {
      console.log("Error retrieving image", error.message);
    });
});
