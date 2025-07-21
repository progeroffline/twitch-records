import './DonationBanner.css';

export default function DonationBanner() {
  return (
    <div class="donation-banner">
      <div class="donation-info">
        <div class="donation-icon">💝</div>
        <div class="donation-text">
          <h4>🫙Підтримай мене</h4>
          <p>Підтримай мене якщо тобi подобається те що я роблю</p>
        </div>
      </div>
      <a href="https://send.monobank.ua/jar/7CsHYUnPeN" class="donation-button">
        Підтримати
      </a>
    </div>
  );
}
