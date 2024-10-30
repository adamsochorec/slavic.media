<script setup>
import { onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

const gridGap2 = 20; // Define gridGap2 or import it if it's defined elsewhere

onMounted(() => {
  // Function to display stars based on the rating value
  function showStars(container, rating) {
    container.innerHTML = ""; // Clear any existing content

    // Create stars based on the rating
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "stars";

      // Fill the star if it's within the rating
      if (i <= rating) {
        star.innerHTML = "★"; // Use a star symbol
      } else {
        star.innerHTML = "☆"; // Use an empty star symbol
      }

      // Append the star to the container
      container.appendChild(star);
    }
  }

  // Get all elements with the "stars" class
  const starContainers = document.querySelectorAll(".stars");

  // Iterate through each element and display stars based on the data-rating attribute
  starContainers.forEach(function (starContainer) {
    const rating = parseInt(starContainer.getAttribute("data-rating"), 10);
    showStars(starContainer, rating);
  });

  // Initialize Swiper for the reviews section
  const reviewsSwiper = new Swiper(".swiper-reviews", {
    loop: true,
    speed: 600,
    spaceBetween: gridGap2,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    preloadImages: false,
    lazyLoading: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 2,
      },
      620: {
        slidesPerView: 3,
      },
      947: {
        slidesPerView: 4,
      },
    },
    // Optional parameters
    direction: "horizontal",
    loop: true,
  });

  // Function to truncate text to a specified length and add ellipsis
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return {
        truncated: text.substring(0, maxLength) + "...",
        full: text,
      };
    }
    return {
      truncated: text,
      full: text,
    };
  }

  // Apply truncation to review messages in Swiper reviews
  const reviewMessages = document.querySelectorAll(".rewiews-message");

  reviewMessages.forEach((message) => {
    const { truncated, full } = truncateText(message.textContent, 350);

    if (full.length > 350) {
      message.textContent = truncated;

      // Create "Read Full Review" link
      const readMoreLink = document.createElement("a");
      readMoreLink.href = "#";
      readMoreLink.textContent = "Read Full Review";
      readMoreLink.classList.add("read-more-link");

      // Append a line break and the link to the message
      const lineBreak = document.createElement("br");
      message.appendChild(lineBreak);
      message.appendChild(readMoreLink);

      // Add event listener to toggle full review
      readMoreLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (message.textContent.includes("Read Full Review")) {
          message.textContent = full;
          readMoreLink.textContent = "Show Less";
        } else {
          message.textContent = truncated;
          message.appendChild(lineBreak);
          message.appendChild(readMoreLink);
          readMoreLink.textContent = "Read Full Review";
        }
      });
    } else {
      message.textContent = full; // No truncation needed
    }
  });
});
</script>

<template>
  <section class="swiper swiper-reviews reveal">
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="FranklinCovey, Leadership company"
              title="FranklinCovey, Leadership company"
              src="https://lh3.googleusercontent.com/a-/ALV-UjU0bBUSLZrfY0whwOy3uybp1XNy8_EVRWagirofxyijv5jTDmAs=s72-c-rp-mo-br100"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/100164207852691879240/reviews?hl=en-GB"
                >Silvija V.</a
              ><br />Marketing Specialist<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Timetravels company that specializes on tours to Scandinavia and
          Lapland had the pleasure of working with an incredible team of young
          videographers. They were not only highly professional but also
          extremely thoughtful in their approach, paying close attention to
          every detail to ensure they captured the essence of this breathtaking
          region. What stood out the most was their dedication to understanding
          our vision. They took the time to get to know our itinerary and goals,
          ensuring that each moment they filmed was meaningful and aligned with
          our overall message. We highly recommend these videographers to
          anyone.
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>
      <!-- Slide -->
      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="FranklinCovey, Leadership company"
              title="FranklinCovey, Leadership company"
              src="https://lh3.googleusercontent.com/a-/ALV-UjXLAMWur_dVziFzMUVHcio8h0BMkgbW8sUpw4KDFEcrpkztXIu8=s72-c-rp-mo-br100"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/110970382095165132586/reviews?hl=en-GB"
                >Žiga B.</a
              ><br />Artist<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          I’m beyond satisfied with the work Slavic Media did for my exhibition!
          They captured the event beautifully, with photos that truly reflect
          the atmosphere and evoked emotions. Their post-production work was
          equally impressive, enhancing every detail and bringing the images to
          life. The team was professional, easy to work with, and made the whole
          process smooth. I couldn’t be happier with the results—thank you,
          Slavic Media!
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="FranklinCovey, Leadership company"
              title="FranklinCovey, Leadership company"
              src="https://lh3.googleusercontent.com/a-/ALV-UjWKliCjpb5tKTxfmg-jhSqjGanrg583NhOCJO2SXl-PuVxnCKI=w120-h120-p-rp-mo-br100"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/102868388374755508982?hl=en-US"
                >FranklinCovey</a
              ><br />Leadership company<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Za FranklinCovey Česká republika mohu potvrdit, že vždy můžeme
          spolehnout na rychlé dodání, flexibilita, pozornost k detailům,
          kreativní nápady a doporučení k tomu, jak dosáhnout nejlepšího
          výsledku. Slavic Media drží krok s dobou a co je nejlepší - práce je
          baví a na výsledcích je to znát. Adame a Marceli, děkujeme!
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="Armando P., Musician"
              title="Armando P., Musician"
              src="https://lh3.googleusercontent.com/a-/ALV-UjVp41MBuTxuz4HQIt172lk5B4Tsj2hUAFLIRZKBl0gZd_Ax=w120-h120-p-rp-mo-br100"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/106744506446456654416?hl=en-US"
                >Armando P.</a
              ><br />Musician<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Amazing services from talented young professionals. Smart solutions,
          serious and creative attitude. Excellent.
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a/ACg8ocJpEE9rIHxCOIQH2O6oQH2G7MSYNf71eC5poj-WNPe8=w120-h120-p-rp-mo-br100"
              alt="Daniel D., Musician"
              title="Daniel D., Musician"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/110738271589854335121?hl=en-US"
                >Daniel D.</a
              ><br />Musician<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Adam photographed SLOEVSINDs first show a Pitstop Kolding. Great and
          lively pictures capturing the high energy and mood from the show -
          awesome work!
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjWr3R2B2S2VxsEfKZXltWT611uRPhp1ViWHxYRuxj9G9q4=w120-h120-p-rp-mo-br100"
              alt="Nikos S., UX Researcher"
              title="Nikos S., UX Researcher"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/109240411528056870351?hl=en-US"
                >Nikos S.</a
              ><br />UX Researcher<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          These guys are very talented, professional and always deliver in time.
          I am very happy with our collaboration as they can easily adapt to
          concepts and masterfully capture moments through their media art.
        </p>
        <!-- <span class="quotes"><i class="fa-solid fa-quote-right"></i></span>-->
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjX0xNwelhtHQ_46afqwRvy8K1_gBCCVFzmw9C-GNY9nTQ=w120-h120-p-rp-mo-br100"
              alt="Bygning 5, Collaborator"
              title="Bygning 5, Collaborator"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/116209661109434700092?hl=en-US"
                >Bygning 5</a
              ><br />Collaborator<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">Collaboration with pros :)</p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjUdOj4ktRKka0VAUcovtfK8anD-Utkduwcj5YrTJ7bnjGs=w120-h120-p-rp-mo-br100"
              alt="Annesofie B., Project Assistant"
              title="Annesofie B., Project Assistant"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/100383834414028866094?hl=en-US"
                >Annesofie B.</a
              ><br />Project Assistant<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Have had them take photos for a few events and they are just a great
          team. good guys, easy to work with, great eye for photography. 10/10
          would recommend 🙌
        </p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a/ACg8ocLtiYezKjjGk3MmzuuwgUbI9BNNjkq5y8xXZVNlGvKb=w120-h120-p-rp-mo-br100"
              alt="Erika H., Client"
              title="Erika H., Client"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/108504332332452488678?hl=en-US"
                >Erika H.</a
              ><br />Client<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          They were amazing to work with. Definitely not the last collab.
        </p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a/ACg8ocK_dqNUXsyTgNgQCIZRtpaaYHgydI3xXSg6CaJCS7Er=w120-h120-p-rp-mo-br100"
              alt="Yaan D., Client"
              title="Yaan D., Client"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/118217763143382642144?hl=en-US"
                >Yaan D.</a
              ><br />Client<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          Adam photographed my wedding. I was looking for someone who could pull
          of a combination of digital and analogue photography on the go and
          this guy just straight nailed it.
        </p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjXZ14eIvhbSg9Qmpyeu_NaaYcqbgv-I6A1vJ46rin9gn8I=w120-h120-p-rp-mo-br100"
              alt="Isbjörg, Band"
              title="Isbjörg, Band"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/116120348225372955039?hl=en-US"
                >Isbjörg</a
              ><br />Band<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">Great photos! 🙏🔥</p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjWHqZSf5lbWhEHNQtRhjD7R1VPDDXILC0-_fTAdps0N0w=w120-h120-p-rp-mo-br100"
              alt="Nicole J., Client"
              title="Nicole J., Client"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/100363374932860666953?hl=en-US"
                >Nicole J.</a
              ><br />Client<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">
          To fantastiske fyre! Slavic Media forstår at levere til tiden og i en
          upåklagelig kvalitet - hver gang. De mestrer at indfange de øjeblikke,
          der er med til at formidle den historie man vil fortælle. De største
          anbefalinger herfra.
        </p>
      </div>

      <!-- Slide -->

      <div class="swiper-slide">
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              src="https://lh3.googleusercontent.com/a-/ALV-UjVWC7FZLpPknVEpxrdB7NFfgLVs18Vs92Sfdpgo9ENmWYk=w120-h120-p-rp-mo-br100"
              alt="Janka H., Client"
              title="Janka H., Client"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.google.com/maps/contrib/101149448207142561689?hl=en-US"
                >Janka H.</a
              ><br />Client<br />
            </p>
            <div class="stars" data-rating="5"></div>
          </div>
        </div>
        <p class="rewiews-message">Amazing service! 🤩</p>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </section>
</template>

<style scoped>
.swiper-reviews .swiper-slide {
  padding: var(--grid-gap-2);
  height: auto !important;
  max-height: 256px;
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--dark-grey-color));
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews {
  border-radius: var(--border-radius-1);
  height: 300px;
}
.swiper-reviews p {
  padding: 0;
  font-size: var(--fontsize-note);
}
.swiper-reviews .quotes {
  font-size: 32px;
  color: white;
  padding: 0;
  margin: 0;
}
.swiper-reviews img {
  height: 55px;
  width: 55px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-2);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews .grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: var(--grid-gap-1);
}
.swiper-reviews .rewiews-message {
  margin: var(--grid-gap-1) 0;
}
.swiper-reviews .stars {
  display: inline-block;
  font-size: var(--fontsize-note);
  color: gold;
}
</style>
