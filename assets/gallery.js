const galleryDisplayFunction = () => {
  //Creating an array of works to place in the gallery

  const gallery = document.querySelector(".gallery");

  const galleryItems = gallery.childNodes;

  const works = Array.from(galleryItems).filter((el) => el.tagName === "IMG");

  //Creating an array of categories

  const categories = [];

  works.forEach((el) =>
    !categories.includes(el.dataset.galleryTag)
      ? categories.push(el.dataset.galleryTag)
      : categories
  );

  //Creating zones for placing filters, galleries and modal windows

  const modal = document.createElement("div"); //modal

  modal.classList.add("modal", "fade");
  modal.id = "myAwesomeLightbox";
  modal.tabIndex = -1;
  modal.ariaHidden = true;

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalDialog.role = "document";
  modal.appendChild(modalDialog);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalDialog.appendChild(modalContent);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalContent.appendChild(modalBody);

  const prev = document.createElement("div");
  prev.classList.add("mg-prev");
  prev.style.left = "-15px";
  prev.innerText = "<";

  const lightBoxImage = document.createElement("img");
  lightBoxImage.classList.add("lightboxImage", "img-fluid");
  lightBoxImage.alt = "Contenu de l'image affichée dans la modale au clique";

  const next = document.createElement("div");
  next.classList.add("mg-next");
  next.style.right = "-15px";
  next.innerText = ">";

  modalBody.append(prev, lightBoxImage, next);

  const galleryWorks = document.createElement("div"); //gallery

  galleryWorks.classList.add("gallery-items-row", "row");

  const filters = document.createElement("ul"); //filters

  filters.classList.add("my-4", "tags-bar", "nav", "nav-pills");

  //Filling the gallery with works

  for (let i = 0; i < works.length; i++) {
    const container = document.createElement("div");
    container.classList.add(
      "item-column",
      "mb-4",
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-4",
      "col-xl-4"
    );
    container.dataset.bsToggle = "modal";
    container.dataset.bsTarget = "#myAwesomeLightbox";
    container.appendChild(works[i]);
    galleryWorks.appendChild(container);
  }

  gallery.append(filters, galleryWorks, modal);
  gallery.style.display = "";

  //Creating filters

  const button = document.createElement("span");
  button.classList.add("nav-link", "active", "active-tag");
  button.dataset.imageToggle = "all";
  button.innerText = "Tous";

  const buttonContainer = document.createElement("li");
  buttonContainer.classList.add("nav-item");

  buttonContainer.appendChild(button);
  filters.appendChild(buttonContainer);

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("span");
    button.classList.add("nav-link");
    button.dataset.imageToggle = `${categories[i]}`;
    button.innerText = `${categories[i]}`;

    const buttonContainer = document.createElement("li");
    buttonContainer.classList.add("nav-item");

    buttonContainer.appendChild(button);
    filters.appendChild(buttonContainer);
  }

  //The function of filtering works by category

  filters.addEventListener("click", (event) => {
    if (event.target.tagName !== "SPAN") {
      return;
    }

    const buttons = document.querySelectorAll(".nav-link");

    buttons.forEach((element) => {
      element.classList.remove("active", "active-tag");
      if (event.target.dataset.imageToggle === element.dataset.imageToggle) {
        element.classList.add("active", "active-tag");
      }
    });

    const imgContainers = document.querySelectorAll(".item-column");

    if (event.target.dataset.imageToggle === "all") {
      imgContainers.forEach((element) => (element.style.display = ""));
      return;
    }

    imgContainers.forEach((element) => {
      element.style.display = "none";

      if (
        event.target.dataset.imageToggle ===
        element.firstElementChild.dataset.galleryTag
      ) {
        element.style.display = "";
      }
    });
  });

  // The function of showing photos in a modal window

  const imgContainers = document.querySelectorAll(".item-column");

  for (let i = 0; i < imgContainers.length; i++) {
    imgContainers[i].addEventListener("click", (event) => {
      lightBoxImage.src = event.target.src;

      let listOfImgContainers = [...imgContainers];

      listOfImgContainers = listOfImgContainers.filter(
        (element) => element.style.display !== "none"
      );

      listOfImgContainers.forEach((element, index) => {
        element.dataset.id = index;
      });

      prev.onclick = () => {
        let openWindow = null;

        listOfImgContainers.forEach((element) => {
          if (element.firstElementChild.src === lightBoxImage.src) {
            openWindow = +element.dataset.id;
          }
        });

        if (openWindow !== 0) {
          openWindow--;
        } else {
          openWindow = listOfImgContainers.length - 1;
        }

        lightBoxImage.src =
          listOfImgContainers[openWindow].firstElementChild.src;
      };

      next.onclick = () => {
        let openWindow = null;

        listOfImgContainers.forEach((element) => {
          if (element.firstElementChild.src === lightBoxImage.src) {
            openWindow = +element.dataset.id;
          }
        });

        if (openWindow < listOfImgContainers.length - 1) {
          openWindow++;
        } else {
          openWindow = 0;
        }

        lightBoxImage.src =
          listOfImgContainers[openWindow].firstElementChild.src;
      };
    });
  }
};

export { galleryDisplayFunction };
