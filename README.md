# HealthyBot - Team Development

HealthyBot là một ứng dụng giúp theo dõi sức khỏe và cung cấp các tính năng hữu ích liên quan đến y tế.

## 🚀 Công nghệ sử dụng

- **Frontend:** [ReactJS](https://react.dev/)

- **Backend:** [NodeJS](https://nodejs.org/)

- **Database:** [MongoDB](https://www.mongodb.com/)

## 📌 Hướng dẫn dành cho Team Development

## ✨ Code Convention

Chúng tôi tuân theo các quy tắc coding chuẩn để đảm bảo code dễ đọc, bảo trì và nhất quán trong toàn bộ dự án.

- **Naming Convention:** Biến và hàm sử dụng [camelCase](https://en.wikipedia.org/wiki/Camel_case), component sử dụng [PascalCase](https://en.wikipedia.org/wiki/Pascal_case).
- **Commit Message:** Sử dụng [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`...).
- **Đặt tên biến:** Sử dụng tên biến có ý nghĩa, mô tả rõ chức năng và mục đích của biến, tránh đặt tên chung chung như `data`, `temp`, `x`.
- **Quy tắc tạo branch:**
  - Branch cho tính năng mới: `feature/[tên-tính-năng]` (VD: `feature/login-page`)
  - Branch cho sửa lỗi: `fix/[mô-tả-lỗi]` (VD: `fix/api-auth-bug`)
  - Branch cho cải tiến code: `refactor/[mô-tả]` (VD: `refactor/user-service`)

### 1. Clone repository

#### **Frontend Repository**

```sh
git clone https://github.com/hnk005/healthybot.git
cd frontend
```

#### **Backend Repository**

```sh
git clone https://github.com/hnk005/healthybot.git
cd backend
```

### 2. Cấu hình môi trường

#### **Backend**

Tạo file `.env` trong thư mục `backend` và thêm các thông tin sau:

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/healthybot
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_pass
```

### 3. Chạy dự án

#### **Khởi động Backend**

```sh
cd backend
npm run dev
```

#### **Khởi động Frontend**

```sh
cd frontend
npm run dev
```

Dự án sẽ chạy tại `http://localhost:3000` cho frontend và `http://localhost:4000` cho backend.

## 🛠 Công cụ & thư viện

- **Frontend:** React
- **Backend:**Nodejs, Express, JWT, Mongoose
- **Database:** MongoDB
- **AI:** Model AI nội bộ được phát triển riêng cho HealthyBot

## 👥 Vai trò trong nhóm

Mỗi thành viên có thể cập nhật hồ sơ cá nhân của mình trên GitHub để giúp nhóm dễ dàng liên lạc và theo dõi công việc.

| Thành viên        | Vai trò               | GitHub |
|------------------|----------------------|--------|
| ![Team Lead](https://github.com/hnk005.png?size=100) | Quản lý dự án, theo dõi tiến độ và giải quyết vấn đề | [@profile](https://github.com/hnk005) |
| ![Frontend Dev](https://github.com/TheL1234.png?size=100) | Phát triển giao diện người dùng bằng React | [@profile](https://github.com/TheL1234) |
| ![Frontend Dev](https://github.com/TheTai132.png?size=100) | Phát triển giao diện người dùng bằng React | [@profile](https://github.com/TheTai132) |
| ![Frontend Dev](https://github.com/ntnghiazz.png?size=100) | Phát triển giao diện người dùng bằng React | [@profile](https://github.com/ntnghiazz) |
| ![Backend Dev](https://github.com/hnk005.png?size=100) | Xây dựng API và xử lý logic server bằng NodeJS | [@profile](https://github.com/hnk005) |
| ![Backend Dev](https://github.com/backend-dev-profile.png?size=100) | Xây dựng API và xử lý logic server bằng NodeJS | [@profile](https://github.com/user) |
| ![AI Engineer](https://github.com/hnk005.png?size=100) |  Phát triển và tích hợp model AI nội bộ | [@profile](https://github.com/ai-engineer-profile) |
| ![Database Admin](https://github.com/hnk005.png?size=100) | Quản lý, tối ưu hóa MongoDB và đảm bảo dữ liệu an toàn | [@profile](https://github.com/hnk005) |
| ![Test](https://github.com/hphuc116275.png?size=100) | Kiểm thử và đảm bảo chất lượng sản phẩm | [@profile](https://github.com/hphuc116275) |
## 📝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc mở issue nếu có đề xuất.

---


🎯 *HealthyBot - Team Development Guide!*
