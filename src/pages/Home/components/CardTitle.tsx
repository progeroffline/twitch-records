type CardTitleProps = {
  title: string;
  date: Date | string;
};

export default function CardTitle({ title, date }: CardTitleProps) {
  // Ensure the date is a Date object before formatting.
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Format the date into a readable string for the UI.
  const formattedDate = parsedDate.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-4 py-3 sm:py-5">
      <h2 className="text-base sm:text-lg font-semibold leading-[1.4] mb-1 sm:mb-1.5 text-white">
        {title}
      </h2>
      <p className="text-xs sm:text-[13px] text-slate-400 font-normal">
        {formattedDate}
      </p>
    </div>
  );
}
