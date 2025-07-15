import './CardTitle.css';

export default function CardTitle({ title, date }) {
  return (
    <div class="video-metadata">
      <h2 class="video-title">{title}</h2>
      <p class="video-date">{date}</p>
    </div>
  );
}
