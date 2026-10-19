# 🌸 PINK DREAM — MÓN QUÀ KỸ THUẬT SỐ 20/10 DÀNH RIÊNG CHO BẠN

Một trang web quà tặng bất ngờ lãng mạn, dễ thương và giàu cảm xúc mừng **Ngày Phụ Nữ Việt Nam 20/10**, được thiết kế theo phong cách **Pink Dream / Cute Digital Gift**, tối ưu hoàn hảo cho điện thoại và máy tính.

---

## ✨ CÁC TÍNH NĂNG NỔI BẬT

1. **Màn hình chào & Hộp quà 3D chuyển động:**
   - Hộp quà hồng phấn có nơ vàng lấp lánh, hiệu ứng floating và phát sáng.
   - Nhấn mở hộp quà bung hiệu ứng pháo hoa trái tim hồng (confetti) chuyển sang popup mở khóa.
2. **Khóa bí mật 6 số dễ thương:**
   - 6 ô nhập mật mã riêng biệt hiển thị icon trái tim phát sáng khi nhập.
   - Bàn phím số trên màn hình + hỗ trợ bàn phím điện thoại & dán mã (paste).
   - Rung nhẹ và thông báo dễ thương khi nhập sai: *"Hình như cậu nhập nhầm rồi nè 🥺 Thử lại nha!"*.
   - Mật mã mặc định: `201024` (Ngày 20/10/2024).
3. **Thế giới ảnh 3D lơ lửng khắp màn hình (Hơn 12 ảnh):**
   - **Di chuyển ngẫu nhiên toàn màn hình:** Các khung ảnh polaroid và hoa lá tự do lơ lửng, bay lượn theo quỹ đạo uốn lượn mượt mà khắp các góc màn hình, tạo cảm giác không gian 3D cổ tích.
   - Chạm vào bất kỳ bức ảnh nào để phóng to (Lightbox) xem ảnh rõ nét cùng lời nhắn dễ thương.
   - Hiệu ứng chạm màn hình bung trái tim bay lên ở mọi vị trí.
4. **Lá thư chúc mừng 20/10 đánh máy từng chữ (Typewriter):**
   - Thiệp hồng kem viền hoa với con dấu sáp trái tim nổi.
   - Hiệu ứng gõ chữ tuần tự có khoảng dừng tự nhiên theo dấu câu.
   - Có nút **"Bỏ qua hiệu ứng"** để đọc toàn bộ thư ngay lập tức.
   - Đóng rồi mở lại không bị mất nội dung thư.
5. **Trình phát nhạc mini & Lời bài hát chạy đồng bộ (Running Lyrics):**
   - Đã tích hợp sẵn bài nhạc của bạn tại: `public/audio/nhac.mp3`.
   - Nút phát/dừng hình trái tim, sóng nhạc equalizer nhảy theo điệu nhạc, thanh tua thời gian bài hát.
   - Lời chúc chạy theo nhạc (karaoke running lyrics) đồng bộ theo thời gian thực.
   - Nếu âm thanh bị chặn bởi trình duyệt, hệ thống có sẵn giai điệu piano hộp nhạc du dương dự phòng.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### 1. Khởi chạy trên máy tính
Trong thư mục dự án, mở Terminal (PowerShell hoặc Command Prompt) và chạy:

```bash
npm run dev
```

Sau đó mở trình duyệt theo đường dẫn hiển thị trên màn hình (thường là `http://localhost:5173`).

---

## 🎨 HƯỚNG DẪN TÙY BIẾN CHO BẠN

Tất cả nội dung đều có thể chỉnh sửa trong file cấu hình duy nhất:
👉 **`src/config/siteConfig.ts`**

### 1. Thay đổi bài nhạc (`nhac.mp3`)
- File nhạc của bạn đã được đặt tại: `public/audio/nhac.mp3`.
- Trong file `src/config/siteConfig.ts`, bạn có thể đổi tên bài hát và nghệ sĩ hiển thị:
```typescript
music: {
  title: 'Giai Điệu Dành Cho Cậu',
  artist: 'Nhạc Nền 20/10 ♡',
  audioSrc: '/audio/nhac.mp3', // Đường dẫn file nhạc
  autoPlayOnUnlock: true,
  fallbackToSynth: true,
}
```

### 2. Thay đổi hoặc thêm ảnh của bạn bè
Website hiện tại hỗ trợ hơn 12 bức ảnh di chuyển lơ lửng toàn màn hình. Để thay bằng ảnh thật của bạn mình:
1. Đặt ảnh (ví dụ: `anh1.jpg`, `anh2.jpg`, ...) vào thư mục:
   `public/images/friends/`
2. Mở file `src/config/siteConfig.ts`, sửa đường dẫn `url` và caption:
```typescript
photos: [
  {
    id: 'photo-1',
    url: '/images/friends/anh1.jpg',
    caption: 'Nụ cười tỏa nắng ☀️',
    subCaption: 'Khoảnh khắc rạng rỡ nhất',
    style: 'polaroid',
    sticker: 'flower',
    rotation: -3,
    depth: 1,
  },
  // Thêm bao nhiêu ảnh tùy thích...
]
```

### 3. Đổi mật mã mở khóa 6 số
Trong `src/config/siteConfig.ts`:
```typescript
secretPasscode: '201024', // Thay bằng 6 số bất kỳ, ví dụ ngày sinh '050803'
passcodeHint: 'Gợi ý: Ngày kỷ niệm 20/10 hôm nay nha! ♡',
```

### 4. Đổi nội dung thư chúc mừng & tên người nhận
Trong `src/config/siteConfig.ts`:
```typescript
recipientName: 'Cô gái đáng yêu', // Tên bạn nữ
senderName: 'Một người bạn thân',

letter: {
  title: "Happy Vietnamese Women's Day",
  salutation: 'Gửi cô gái đáng yêu của tớ 💗,',
  paragraphs: [
    'Chúc cậu có một ngày 20/10 thật nhiều niềm vui...',
    // Thêm các đoạn văn bạn muốn nhắn gửi
  ],
  closing: 'Một món quà nhỏ dành riêng cho cậu,',
  sender: 'Từ một người luôn mong cậu thật vui ♡',
  date: '20.10 — Always be smiling ✨'
}
```

### 5. Căn chỉnh lời bài hát theo thời gian (Lyrics)
Mở file `src/config/lyrics.ts` và chỉnh sửa số giây (`time`) tương ứng với lời bài hát của bạn:
```typescript
export const defaultLyrics = [
  { time: 0, text: "Gửi đến cậu những điều ngọt ngào nhất... 🌸" },
  { time: 4.5, text: "Hôm nay là một ngày đặc biệt dành riêng cho cậu ♡" },
  { time: 9.0, text: "Chúc cậu luôn rạng rỡ như ánh ban mai ☀️" },
  // ...
];
```

---

## 🌐 HƯỚNG DẪN TRIỂN KHAI LÊN VERCEL (MIỄN PHÍ)

1. Đẩy mã nguồn lên tài khoản **GitHub** của bạn:
   ```bash
   git init
   git add .
   git commit -m "Pink Dream 20/10 website"
   git branch -M main
   git remote add origin <URL_GITHUB_CỦA_BẠN>
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub.
3. Chọn **Add New...** -> **Project** -> Chọn repository vừa tạo.
4. Vercel sẽ tự động phát hiện cấu hình Vite. Bấm **Deploy**.
5. Sau 1 phút, bạn sẽ nhận được đường link website (ví dụ: `https://pink-dream-20-10.vercel.app`) để gửi tặng người bạn ấy!

---

*Chúc bạn và người nhận có một ngày 20/10 tràn đầy niềm vui và kỷ niệm thật đẹp! 🌷💖*

