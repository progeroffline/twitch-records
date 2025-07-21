import { useState, useEffect } from 'react';
import { Play, Calendar, Heart, Users, ArrowLeft } from 'lucide-react';

// Mock data for demonstration
const mockVideoData = {
  title: 'Стрім про розробку та життя',
  date: new Date('2024-07-15T20:30:00'),
  videoUrl: 'https://cdn.twitchrecords.space/file/twitchrecords/sample-video.mp4',
  channelName: 'Лебидло Aрхів Стрімов',
  description: 'Записи з усіх стрімів Михайла Лебіги від 05.09.2023',
};

// Telegram Mini App Colors
const tgColors = {
  bg: 'var(--tg-theme-bg-color, #ffffff)',
  secondary: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
  text: 'var(--tg-theme-text-color, #000000)',
  hint: 'var(--tg-theme-hint-color, #999999)',
  link: 'var(--tg-theme-link-color, #2481cc)',
  button: 'var(--tg-theme-button-color, #2481cc)',
  buttonText: 'var(--tg-theme-button-text-color, #ffffff)',
  headerBg: 'var(--tg-theme-header-bg-color, #2481cc)',
  destructive: 'var(--tg-theme-destructive-text-color, #ff3b30)',
};

function TelegramCard({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
      style={{ backgroundColor: tgColors.bg }}
    >
      {children}
    </div>
  );
}

function TelegramButton({ children, onClick, variant = 'primary', className = '' }) {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95';
  const variants = {
    primary: 'text-white shadow-sm',
    secondary: 'border border-gray-200 shadow-sm',
    ghost: 'hover:bg-gray-50 active:bg-gray-100',
  };

  const buttonStyle =
    variant === 'primary'
      ? {
        backgroundColor: tgColors.button,
        color: tgColors.buttonText,
      }
      : variant === 'secondary'
        ? {
          backgroundColor: tgColors.secondary,
          color: tgColors.text,
          borderColor: tgColors.hint + '40',
        }
        : {
          color: tgColors.text,
        };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

function ChannelHeader() {
  return (
    <div className="flex items-center p-4 border-b border-gray-100">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
        Л
      </div>
      <div className="ml-3 flex-1">
        <h3 className="font-semibold text-base" style={{ color: tgColors.text }}>
          {mockVideoData.channelName}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: tgColors.hint }}>
          {mockVideoData.description}
        </p>
      </div>
      <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
        <Users size={14} style={{ color: tgColors.hint }} />
        <span className="text-xs font-medium" style={{ color: tgColors.hint }}>
          1.2K
        </span>
      </div>
    </div>
  );
}

function VideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);

  const formattedDate = mockVideoData.date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TelegramCard className="mb-4">
      <ChannelHeader />

      <div className="p-4 pb-3">
        <h2
          className="text-lg font-semibold mb-2 leading-snug"
          style={{ color: tgColors.text }}
        >
          {mockVideoData.title}
        </h2>
        <div className="flex items-center text-sm mb-4" style={{ color: tgColors.hint }}>
          <Calendar size={14} className="mr-1.5" />
          {formattedDate}
        </div>
      </div>

      <div className="relative aspect-video bg-gray-900 mx-4 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <TelegramButton
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          >
            <Play size={24} fill="currentColor" />
          </TelegramButton>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          2:45:30
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm transition-colors duration-200 hover:text-red-500">
              <Heart size={16} style={{ color: tgColors.hint }} />
              <span style={{ color: tgColors.hint }}>234</span>
            </button>
            <button
              className="text-sm transition-colors duration-200"
              style={{ color: tgColors.link }}
            >
              Поділитися
            </button>
          </div>
          <TelegramButton variant="ghost" className="text-sm">
            Дивитися пізніше
          </TelegramButton>
        </div>
      </div>
    </TelegramCard>
  );
}

function DonationCard() {
  const [isSupported, setIsSupported] = useState(false);

  return (
    <TelegramCard className="mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
              💝
            </div>
            <div className="ml-3">
              <h4 className="font-semibold text-base" style={{ color: tgColors.text }}>
                Підтримай мене
              </h4>
              <p className="text-sm mt-0.5" style={{ color: tgColors.hint }}>
                Якщо тобі подобається контент
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <TelegramButton className="flex-1 text-sm" onClick={() => setIsSupported(true)}>
            {isSupported ? 'Дякую! ❤️' : 'Підтримати'}
          </TelegramButton>
          <TelegramButton
            variant="secondary"
            className="px-3"
            onClick={() =>
              window.open('https://send.monobank.ua/jar/7CsHYUnPeN', '_blank')
            }
          >
            Mono
          </TelegramButton>
        </div>
      </div>
    </TelegramCard>
  );
}

function NavigationHeader() {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 z-10"
      style={{ backgroundColor: tgColors.bg }}
    >
      <div className="flex items-center">
        <button className="p-2 -ml-2 rounded-full transition-colors duration-200 hover:bg-gray-100">
          <ArrowLeft size={20} style={{ color: tgColors.text }} />
        </button>
        <h1 className="ml-2 text-lg font-semibold" style={{ color: tgColors.text }}>
          Архів стрімів
        </h1>
      </div>
      <div className="flex space-x-2">
        <TelegramButton variant="ghost" className="text-sm">
          Пошук
        </TelegramButton>
      </div>
    </div>
  );
}

export default function TelegramMiniApp() {
  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Set header color
      tg.setHeaderColor(tgColors.headerBg);

      // Enable closing confirmation
      tg.enableClosingConfirmation();
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: tgColors.secondary }}>
      <NavigationHeader />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <VideoCard />
        <DonationCard />

        {/* Recent streams */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold px-1" style={{ color: tgColors.text }}>
            Останні стріми
          </h3>

          {[1, 2, 3].map(i => (
            <TelegramCard key={i}>
              <div className="p-3 flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Play size={16} style={{ color: tgColors.hint }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm" style={{ color: tgColors.text }}>
                    Стрім #{i} - Цікаві теми
                  </h4>
                  <p className="text-xs mt-1" style={{ color: tgColors.hint }}>
                    {i} день тому • 2:30:45
                  </p>
                </div>
                <TelegramButton variant="ghost" className="text-xs px-2 py-1">
                  Дивитися
                </TelegramButton>
              </div>
            </TelegramCard>
          ))}
        </div>
      </div>
    </div>
  );
}
