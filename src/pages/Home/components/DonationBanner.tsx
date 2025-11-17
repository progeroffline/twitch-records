/**
 * A banner component to encourage users to support the project via Monobank.
 */
export default function DonationBanner() {
  return (
    <div className="bg-gradient-to-br from-[#2b5278] to-[#4a6741] px-5 py-4 flex items-center justify-between flex-wrap gap-3 max-md:px-4 max-md:py-3 max-md:flex-col max-md:text-center">
      <div className="flex items-center gap-3 max-md:flex-col max-md:text-center">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg pt-0.5">
          💝
        </div>
        <div className="donation-text">
          <h4 className="text-md font-semibold mb-0.5">🫙Підтримай мене</h4>
          <p className="text-sm opacity-80">
            Підтримай мене якщо тобi подобається те що я роблю
          </p>
        </div>
      </div>
      <a
        href="https://send.monobank.ua/jar/7CsHYUnPeN"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-[#2b5278] px-4 py-2 rounded-full text-[13px] font-semibold no-underline inline-block transition-all duration-300 ease-in-out hover:bg-gray-100 hover:-translate-y-0.5 max-md:w-full max-md:max-w-[200px]"
      >
        Підтримати
      </a>
    </div>
  );
}
