import telegramChannelImage from '../../../images/telegram-channel.png';

export default function ChannelBanner() {
  return (
    <div className="bg-gradient-to-br from-[#2b5278] to-[#1e3a5f] px-5 py-4 flex items-center gap-3 border-b border-white/10">
      <div
        className="min-w-10 min-h-10 rounded-full flex items-center justify-center font-bold text-base shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        style={{
          backgroundImage: `url(${telegramChannelImage})`,
          backgroundSize: '100% 100%',
        }}
      ></div>
      <div className="channel-details">
        <h3 className="text-[15px] font-semibold">Лебидло Aрхів Стрімов</h3>
        <p className="text-[13px] opacity-70">
          Записи з усіх стрімів Михайла Лебіги від 05.09.2023
        </p>
      </div>
    </div>
  );
}
