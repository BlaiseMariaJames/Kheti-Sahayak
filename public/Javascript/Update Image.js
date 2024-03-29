let image = document.querySelector("img");
let imageUpload = document.querySelector("#image");
imageUpload.addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    } else {
        image.src = "https://res.cloudinary.com/dtwgxcqkr/image/upload/v1706147664/Kheti%20Sahayak%20Related%20Media/No_Image_Available.webp";
    }
});