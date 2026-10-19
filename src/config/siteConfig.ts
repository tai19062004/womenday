import { SiteConfig } from '../types';
import { defaultLyrics } from './lyrics';

export const siteConfig: SiteConfig = {
  // Tên người nhận và người gửi (thay đổi theo tên bạn của bạn)
  recipientName: 'Ngọc Anh xinh gái 💗',
  senderName: 'Mr.Tài',

  // Mật khẩu bí mật 6 số để mở quà (mặc định: 201024 - Ngày 20/10)
  secretPasscode: '010104',
  passcodeHint: 'Gợi ý: Ngày một cô gái xinh đẹp được sinh ra! VD: 190604',

  // Màn hình 1: Lời chào và mở hộp quà
  greeting: {
    badge: 'A little surprise for you ♡',
    title: 'Có một món quà nhỏ dành cho cậu...',
    subtitle: 'Nhưng phải mở khóa mới xem được nhé!',
    buttonText: 'Mở món quà bí mật 💝',
  },

  // Màn hình 4: Lá thư chúc mừng 20/10 với hiệu ứng đánh máy typewriter
  letter: {
    title: 'Happy Vietnamese Women\'s Day',
    salutation: 'Gửi Ngọc Anh xinh gái 💗,',
    paragraphs: [
      'Chúc cậu có một ngày 20/10 thật nhiều niềm vui, luôn xinh đẹp, rạng rỡ và gặp thật nhiều điều may mắn trong cuộc sống.',
      'Mong rằng mỗi ngày của cậu đều có những lý do để mỉm cười, luôn có người yêu thương, quan tâm và ở bên cậu những lúc cần thiết.',
      'Hãy luôn tự tin, hạnh phúc và sống thật rực rỡ nhé!',
      'Đặc biệt là luôn tươi cười và sớm có người yêu 🥰',
    ],
    closing: 'Một món quà nhỏ dành cho cậu',
    sender: 'Mr.Tài',
    date: '20.10 — Always be smiling 💖',
  },

  // Khu vực phát nhạc và lời bài hát
  music: {
    title: 'Women\'s Day Melody',
    artist: 'Nhạc Nền 20/10 ♡',
    // Đường dẫn file nhạc mp3 trong public/audio/nhac.mp3
    audioSrc: '/audio/nhac.mp3',
    autoPlayOnUnlock: true,
    fallbackToSynth: true,
  },

  // Danh sách ảnh nổi 3D (>10 ảnh di chuyển lơ lửng ngẫu nhiên khắp màn hình)
  // Bạn có thể bỏ ảnh thật vào thư mục public/images/friends/ rồi sửa đường dẫn tại đây
  photos: [
    {
      id: 'photo-1',
      url: '/images/friends/1.png',
      caption: 'Nụ cười tỏa nắng ☀️',
      subCaption: 'Khoảnh khắc rạng rỡ nhất',
      style: 'polaroid',
      sticker: 'flower',
      rotation: -3,
      depth: 1,
    },
    {
      id: 'photo-2',
      url: '/images/friends/2.png',
      caption: 'Luôn dịu dàng và đáng yêu 🌸',
      subCaption: 'Bình yên bên tách trà chiều',
      style: 'classic',
      sticker: 'heart',
      rotation: 4,
      depth: 2,
    },
    {
      id: 'photo-3',
      url: '/images/friends/3.jpg',
      caption: 'Công chúa nhỏ ngọt ngào 🎀',
      subCaption: 'Đẹp rực rỡ như một đóa hoa',
      style: 'ribbon',
      sticker: 'bow',
      rotation: -5,
      depth: 1,
    },
    {
      id: 'photo-4',
      url: '/images/friends/4.jpg',
      caption: 'Ánh mắt long lanh ✨',
      subCaption: 'Lưu giữ những kỷ niệm đẹp nhất',
      style: 'rounded',
      sticker: 'sparkle',
      rotation: 2,
      depth: 3,
    },
    {
      id: 'photo-5',
      url: '/images/friends/5.jpg',
      caption: 'Hạnh phúc giản đơn 🍰',
      subCaption: 'Mỗi ngày đều là niềm vui',
      style: 'polaroid',
      sticker: 'star',
      rotation: -2,
      depth: 2,
    },
    {
      id: 'photo-6',
      url: '/images/friends/6.jpg',
      caption: 'Tỏa sáng theo cách riêng 🌷',
      subCaption: 'Cô gái tự tin và tuyệt vời nhất',
      style: 'classic',
      sticker: 'flower',
      rotation: 5,
      depth: 1,
    },
    {
      id: 'photo-7',
      url: '/images/friends/7.jpg',
      caption: 'Ngọt ngào dâu tây 🍓',
      subCaption: 'Dễ thương như kẹo bông gòn',
      style: 'polaroid',
      sticker: 'heart',
      rotation: -4,
      depth: 2,
    },
    {
      id: 'photo-8',
      url: '/images/friends/8.jpg',
      caption: 'Bé mèo tinh nghịch 🐾',
      subCaption: 'Năng lượng tích cực mỗi ngày',
      style: 'rounded',
      sticker: 'bow',
      rotation: 3,
      depth: 3,
    },
    {
      id: 'photo-10',
      url: '/images/friends/10.png',
      caption: 'Ước mơ bay xa 🎈',
      subCaption: 'Chạm tới những vì sao ước mơ',
      style: 'polaroid',
      sticker: 'star',
      rotation: 4,
      depth: 2,
    }
  ],

  lyrics: defaultLyrics,
};
