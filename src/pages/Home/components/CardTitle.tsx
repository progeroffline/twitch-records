type CardTitleProps = {
  title: string;
  date: Date | string;
};

export default function CardTitle({ title, date }: CardTitleProps) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = parsedDate.toLocaleString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="px-4 py-5">
      <h2 className="text-lg font-semibold leading-[1.4] mb-1.5 text-white">{title}</h2>
      <p className="text-[13px] text-slate-400 font-normal">{formattedDate}</p>
    </div>
  );
}
