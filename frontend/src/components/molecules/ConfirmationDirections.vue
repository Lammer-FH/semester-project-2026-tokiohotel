<template>
  <section class="conf-section">
    <h2 class="conf-section-heading">Anreise</h2>

    <div class="directions-content">
      <div class="map-wrap no-print">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.6404785498014!2d16.366612!3d48.203544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07984a896be3%3A0x2a0e213c859e6fb5!2sOpernring%202%2C%201010%20Wien%2C%20Austria!5e0!3m2!1sde!2sat!4v1718000000000"
          class="map-iframe"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Standort Tokio Hotel"
        />
      </div>

      <div class="directions-info">
        <h3 class="directions-heading">So finden Sie uns</h3>
        <address class="hotel-address">
          Tokio Hotel<br />
          Opern Ring 2<br />
          1010 Wien, Österreich
        </address>

        <div class="travel-options">
          <div class="travel-option">
            <strong>Mit der UBahn</strong>
            <p>Wien Hauptbahnhof → U1 Richtung Leopoldau → Station Karlsplatz (ca. 10 Min.), dann 3 Minuten zu Fuß.</p>
            <p>Kaufen Sie Tickets hier: <a href="https://shop.wienmobil.at/en/products" target="_blank" rel="noopener" class="travel-link">shop.wienmobil.at</a></p>
          </div>
          <div class="travel-option">
            <strong>Mit dem Auto</strong>
            <p>Über die A1/A2 Richtung Zentrum. Tiefgarage vorhanden (€18/Tag).</p>
          </div>
          <div class="travel-option">
            <strong>Vom Flughafen</strong>
            <p>Wien-Schwechat → City Airport Train (CAT) zum Bahnhof Wien Mitte (16 Min.), dann U3 bis Stephansplatz.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conf-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.conf-section-heading {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c9a96e;
  font-weight: 700;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.directions-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.map-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #1a1a1a;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.directions-info {
  background: #1a1a1a;
  padding: 24px;
}

.directions-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 12px;
}

.hotel-address {
  font-style: normal;
  color: #a0998a;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.travel-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.travel-option strong {
  font-size: 13px;
  color: #f5f0e8;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.travel-option p {
  font-size: 14px;
  color: #a0998a;
  line-height: 1.5;
  margin: 4px 0 0;
}

.travel-link {
  color: #c9a96e;
  text-decoration: none;
}

.travel-link:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .directions-content {
    flex-direction: row;
  }

  .map-wrap {
    flex: 1;
    aspect-ratio: auto;
    min-height: 300px;
  }

  .directions-info {
    flex: 1;
  }
}

@media print {
  .no-print {
    display: none !important;
  }

  .directions-info {
    background: #ffffff;
    border: 1px solid #eeeeee;
  }

  .directions-heading {
    color: #111111;
  }

  .hotel-address,
  .travel-option p {
    color: #555555;
  }

  .travel-option strong {
    color: #111111;
  }

  .travel-link {
    color: #8a7a5a;
  }
}
</style>
