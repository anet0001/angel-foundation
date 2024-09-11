class App {
  constructor() {
    this.elements = {
      media: [...document.querySelectorAll(".media")],
      gallery: document.querySelector(".gallery .grid"),
      overlay: document.querySelector(".overlay"),
    };

    console.log(this.elements.media);

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  toggleOverlay(action = hide, mediaType = "image", src = "") {
    if (action === "show") {
      this.elements.overlay.classList.remove("overlay--hidden");
      document.body.style.overflowY = "hidden";

      if (mediaType === "image") {
        this.addOverlayContent(src, "image");
      } else {
        this.addOverlayContent(src, "video");
      }
    } else if (action === "hide") {
      this.elements.overlay.classList.add("overlay--hidden");
      document.body.style.overflowY = "auto";
    }
  }

  addOverlayContent(src, mediaType) {
    this.elements.overlay.innerHTML = "";
    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    if (mediaType === "video") {
      overlayContent.innerHTML = `
					<video controls muted autoplay>
						<source src="${src}" type="video/mp4">	
						Your browser does not support the video tag.
					</video>
			`;
    } else {
      overlayContent.innerHTML = `
			<img src="${src}" alt="The Angels Foundation" />
			`;
    }

    this.elements.overlay.appendChild(overlayContent);
  }

  addEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("media")) {
        this.toggleOverlay("show", "image", e.target.src);
      } else if (e.target.classList.contains("thumbnail")) {
        this.toggleOverlay("show", "video", e.target.dataset.video);
      }
    });

    this.elements.overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        this.toggleOverlay("hide");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
