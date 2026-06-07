import placeInfoFind from "./personal-1-personal-place-info-find.js";

const placeInfo = document.querySelector(".place-info");
const placeH3 = document.querySelector(".place-info h3");
const placeImg = document.querySelector(".place-info img");
const placePrice = document.querySelector(".place-info-daily-price-details h3");
const html = document.querySelector(".html");
const destinations = document.querySelector("#destinations");
const click = document.querySelector(".click-audio");

const displayPlaceInfo = () => {
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (e) => {
      if (e.target.closest(".place-icon-link")) {
        e.preventDefault();
        const placeId = e.target.closest(".place-icon-link").dataset.placeId;
        
        setTimeout(async () => {
          const place = await placeInfoFind(placeId);
          
          placeH3.textContent = place.name;
          placeImg.src = place.image;
          placePrice.textContent = `${place.price}$`;
          
          placeInfo.classList.add("block");
        }, 500);
        
        document.dispatchEvent(
          new CustomEvent("hiwalk:modal-opened", {
            detail: {
              modal: placeInfo,
              closeButtonSelector: ".place-info-close",
              triggerElement: e.target.closest(".place-icon-link"),
            },
          }),
        );
        
        document.querySelector("#destinations").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        
      }

      if (e.target.closest(".place-info-close")) {
        if (click) {
          click.play().catch(() => {});
        }
        placeH3.textContent = "";
        placePrice.textContent = "";
        placeImg.src = "";
        placeInfo.classList.remove("block");
      }
    });
  });
};

export default displayPlaceInfo;
