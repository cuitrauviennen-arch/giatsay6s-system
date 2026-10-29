# Hạ tầng dự án Giặt Sấy 6S

Tài liệu ghi lại hạ tầng, phiên bản và cách vận hành website. Đọc file này khi chuyển sang máy mới hoặc khi quay lại dự án sau một thời gian.

> Cập nhật lần cuối: 29/10/2026
> Repo này đang **public**, nên **không bao giờ** ghi mật khẩu, API key, URL database vào file này. Các giá trị bí mật xem trực tiếp trên Render, Vercel, Neon, Cloudinary.

---

## 1. Tổng quan

```
Người dùng ──▶ Frontend (Next.js, Vercel) ──API──▶ Backend (Strapi, Render) ──▶ Database (Postgres, Neon)
                                                          │
                                                          └──▶ Ảnh (Cloudinary)
```

| Thành phần | Công nghệ | Chạy ở đâu (production) | Deploy |
|---|---|---|---|
| Frontend | Next.js + React + Tailwind | Vercel (tài khoản "Timothy", gói Hobby) | **Tự động** khi push lên `main` |
| Backend / CMS | Strapi 5 | Render, service `giatsay6s-backend` (gói Free) — https://giatsay6s-backend.onrender.com | **Thủ công**: Render → Manual Deploy → Deploy latest commit |
| Database | PostgreSQL | Neon (gói Free), nhánh `production` | — |
| Ảnh / media | Cloudinary | `res.cloudinary.com` | — |
| Mã nguồn | GitHub | https://github.com/cuitrauviennen-arch/giatsay6s-system, nhánh `main` | — |

Lưu ý gói Free của Render: backend tự "ngủ" khi không có truy cập, lần gọi đầu tiên sau đó có thể chậm khoảng 50 giây.

---

## 2. Phiên bản

### Môi trường máy phát triển
| Công cụ | Phiên bản |
|---|---|
| Node.js | 26.10.0 (backend yêu cầu `>=20 <=26`) |
| npm | 11.19.1 |

### Frontend (`frontend/`)
| Thư viện | Phiên bản |
|---|---|
| next | 16.4.3 |
| react / react-dom | 19.2.4 |
| tailwindcss | 4.3.2 |
| framer-motion | 12.42.0 |
| lottie-react | 2.4.1 |
| lucide-react | 1.22.0 |
| tw-animate-css (hiệu ứng chữ của giá treo đồ) | 1.4.0 |
| @next/third-parties (Google Tag Manager) | 16.2.10 |
| typescript | 5.9.3 |
| eslint / eslint-config-next | 9.39.4 / 16.4.3 |

> Next.js 16 khác nhiều so với các bản cũ. Trước khi sửa code, đọc tài liệu trong `frontend/node_modules/next/dist/docs/` (xem `frontend/AGENTS.md`).

### Backend (`backend/`)
| Thư viện | Phiên bản |
|---|---|
| @strapi/strapi | 5.60.0 |
| @strapi/plugin-users-permissions | 5.60.0 |
| @strapi/plugin-cloud | 5.60.0 |
| @strapi/provider-upload-cloudinary | 5.60.0 |
| pg (Postgres, dùng trên Render) | 8.22.0 |
| better-sqlite3 (SQLite, dùng trên máy) | 12.8.0 |
| typescript | 5.9.3 |

---

## 3. Nội dung quản lý trong Strapi

| Loại nội dung | Kiểu | API | Dùng ở frontend |
|---|---|---|---|
| Hero | Single type | `/api/hero` | Phần đầu trang chủ |
| Contact | Single type | `/api/contact` | Thanh liên hệ, phần liên hệ, footer |
| Service | Collection | `/api/services` | Danh sách dịch vụ |
| Process step | Collection | `/api/process-steps` | Các bước quy trình |
| SEO & Metadata | Single type | `/api/seo` | Thẻ meta, Open Graph, Google Tag Manager |

Quyền đọc công khai của các API trên được cấp tự động khi Strapi khởi động (`backend/src/index.ts`). Thêm loại nội dung mới thì nhớ thêm quyền vào đó.

**Không lấy từ Strapi:**
- **Giá treo đồ** (`frontend/src/components/sections/laundry-rail.tsx`, nằm giữa phần Dịch vụ và Liên hệ): 6 món đồ, hotline và link được viết thẳng trong file này. Nút vàng gọi 0816.366.176, dòng nhỏ bên dưới gọi 0907.45.22.99. Khi người xem mở một món, component gửi sự kiện `view_service_detail` (kèm `service_id`, `viewport`) vào Google Tag Manager. File `components/ui/product-rail-gallery.tsx` là component gốc của bên thiết kế, không sửa.
- **Hotline:** ô `hotline` trong Strapi đang để trống, nên thanh trên cùng (`TopBar.tsx`) và phần Liên hệ (`Contact.tsx`) dùng số mặc định trong code. Nhập hotline vào Strapi thì số trong Strapi sẽ được hiện thay.

---

## 4. Cài đặt trên máy mới

### Bước 1: tải mã nguồn
```bash
git clone https://github.com/cuitrauviennen-arch/giatsay6s-system.git
cd giatsay6s-system
```

Đặt danh tính git **cho repo này** (bắt buộc, nếu không Vercel sẽ chặn deploy khi repo private):
```bash
git config user.name "Toan Le"
git config user.email "295792828+cuitrauviennen-arch@users.noreply.github.com"
```

### Bước 2: backend
```bash
cd backend
npm ci
cp .env.example .env
```
Sửa `backend/.env`:
- `PORT=1338` (frontend mặc định gọi backend ở cổng 1338).
- Thay các giá trị `tobemodified` bằng chuỗi ngẫu nhiên. Tạo nhanh bằng: `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`. `APP_KEYS` cần 2 chuỗi, cách nhau bằng dấu phẩy.
- Để dùng SQLite trên máy, thêm:
  ```
  DATABASE_CLIENT=sqlite
  DATABASE_FILENAME=data.db
  ```

Chạy: `npm run develop` → trang quản trị ở http://localhost:1338/admin (lần đầu sẽ yêu cầu tạo tài khoản admin).

Database trên máy (`backend/data.db`) **không có trong git**. Máy mới sẽ bắt đầu với database trống. Muốn có dữ liệu giống production, dùng `strapi transfer` hoặc nhập lại nội dung bằng tay.

### Bước 3: frontend
```bash
cd frontend
npm ci
npm run dev
```
Mở http://localhost:3001. Frontend gọi backend theo biến `NEXT_PUBLIC_STRAPI_URL`; nếu không đặt, mặc định là `http://127.0.0.1:1338`. Muốn chạy frontend trên máy nhưng lấy dữ liệu thật, tạo `frontend/.env.local`:
```
NEXT_PUBLIC_STRAPI_URL=https://giatsay6s-backend.onrender.com
```

---

## 5. Biến môi trường trên production

Chỉ ghi **tên** biến. Giá trị xem trên dashboard tương ứng.

**Render (backend), mục Environment:**
- `DATABASE_CLIENT=postgres`, `DATABASE_URL` (chuỗi kết nối Neon)
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` (khi có `CLOUDINARY_NAME`, ảnh upload sẽ lưu lên Cloudinary)

**Vercel (frontend), mục Settings → Environment Variables:**
- `NEXT_PUBLIC_STRAPI_URL` trỏ tới backend Render.

---

## 6. Quy trình deploy

1. Sửa code, kiểm tra trên máy (`npm run build` ở `frontend/`, `npm run build` ở `backend/`).
2. Commit và push lên `main`.
3. **Frontend**: Vercel tự deploy. Xem kết quả ở Vercel → Deployments.
4. **Backend**: Render **không** tự deploy. Vào Render → `giatsay6s-backend` → **Manual Deploy → Deploy latest commit**.
   - Nếu thay đổi có đụng tới cấu trúc dữ liệu hoặc nâng phiên bản Strapi, **sao lưu database trước** (mục 7).

---

## 7. Sao lưu database (Neon)

**Cách nhanh (trên giao diện Neon):**
console.neon.tech → chọn dự án → **Branches → New branch**
- Parent branch: `production`
- Chọn **Branch data and schema**
- **Auto-delete: chọn "Never"** (mặc định là "After 1 day" → bản sao sẽ tự mất)

Khôi phục: mở branch sao lưu → **Restore** vào `production`.

**Cách tải file về máy:** cần `pg_dump` (`brew install libpq`), lấy connection string trong Neon → **Connect**, rồi chạy:
```bash
/opt/homebrew/opt/libpq/bin/pg_dump "CONNECTION_STRING" -Fc --no-owner --no-acl -f giatsay6s-backup-YYYYMMDD.dump
```

Lịch sử sao lưu:
| Ngày | Tên branch trên Neon | Lý do |
|---|---|---|
| 29/10/2026 | `backup-truoc-strapi-5-60` | Trước khi nâng Strapi 5.49 → 5.60 |

---

## 8. Lưu ý và vấn đề đã biết

- **Synology Drive**: thư mục dự án đang được đồng bộ bằng Synology Drive. Synology từng làm hỏng `node_modules` (thiếu file) và tự đổi quyền file. Cách xử lý:
  - Loại `node_modules` và `.next` khỏi đồng bộ (Synology Drive Client → Sync Rules).
  - Chạy `git config core.fileMode false` trong repo để git bỏ qua việc đổi quyền file.
  - Nếu lệnh build báo lỗi kiểu `Cannot find module ...` trong `node_modules`: xoá `node_modules` rồi chạy lại `npm ci`.
- **npm 11 chặn script cài đặt** của thư viện. `better-sqlite3` đã được cho phép trong `backend/package.json` (`allowScripts`). Thư viện mới cần script thì chạy `npm install-scripts approve <tên>`.
- **`npm run lint` ở frontend** chạy `eslint` (Next.js 16 đã bỏ lệnh `next lint`). Hiện 0 lỗi, còn 7 cảnh báo: dùng `<img>` thay vì `next/image`, dependency của `useEffect` trong `FloatingNav`, `Hero`, và 2 cảnh báo trong component gốc của giá treo (để nguyên).
- **Thư mục `giatsay6s-handoff/`** (gói bàn giao giá treo đồ, có ảnh mẫu và hướng dẫn) nằm ở gốc dự án nhưng bị bỏ qua trong `.gitignore`, nên chỉ có trên Synology, không có trên GitHub.
- **npm audit**: frontend 0 lỗ hổng. Backend còn khoảng 35 lỗ hổng (không có mức critical), nằm trong thư viện nội bộ của Strapi; chờ Strapi phát hành bản vá rồi nâng tiếp (`npx @strapi/upgrade minor`).
- **Neon Free** không hết hạn. **Render Free** không dùng database của Render (Postgres miễn phí của Render tự xoá sau ~30 ngày) — database nằm ở Neon.
