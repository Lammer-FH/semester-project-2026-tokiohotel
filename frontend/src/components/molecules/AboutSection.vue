<template>
  <section class="about">
    <div class="about-text">
      <span class="eyebrow">UNSERE GESCHICHTE</span>
      <h2 class="about-heading heading-serif">Ein ruhiger Ort in einer chaotischen Stadt</h2>
      <p class="about-body">
        Im Herzen Wiens entstand das Tokio Hotel aus einer einfachen Überzeugung, dass wahre
        Eleganz in der Stille, im Detail und in der ungehetzten Zeit liegt. Jeder Winkel unseres
        Hauses wurde als Rückzugsort vom Lärm des Alltags gestaltet.
      </p>
      <p class="about-body">
        Von edler Bettwäschen bis hin zu einer Küche, die sich mit den Jahreszeiten
        wandelt, gestalten wir jeden Aufenthalt rund um die stillen Freuden, die so leicht in
        Vergessenheit geraten.
      </p>
      <a class="about-link">MEHR ENTDECKEN →</a>
    </div>
    <div class="about-image-wrap">
      <img
        src="/hotel_lobby.webp"
        alt="Hotel interior"
        class="about-image"
      />
      <div class="about-image-overlay"></div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: flex;
  background: #111111;
  min-height: 560px;
}

.about-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 60px 80px 64px;
}

.about-heading {
  font-size: 38px;
  margin: 0 0 28px;
}

.about-body {
  font-size: 15px;
  line-height: 1.75;
  color: #a0998a;
  margin: 0 0 14px;
  max-width: 440px;
}

.about-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9a96e;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.about-link:hover {
  opacity: 0.7;
}

.about-image-wrap {
  flex: 1;
  overflow: hidden;
  position: relative
}

.about-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #111111 0%, rgba(17, 17, 17, 0) 100%);
  pointer-events: none;
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .about {
    flex-direction: column;
    min-height: unset;
  }

  .about-image-wrap {
    order: -1;
    height: 300px;
    flex: unset;
  }

  .about-text {
    padding: 48px 24px;
  }

  .about-heading {
    font-size: 28px;
  }

  .about-image-overlay {
    background: linear-gradient(to top, #111111 0%, rgba(17, 17, 17, 0) 100%);
  }
}
</style>
