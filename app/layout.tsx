
import type { Metadata } from 'next';
import "./style.css";
import { StoreProvider } from '@/context/store_context'; // Kho dữ liệu
import Notification from '@/components/Home/notification';   // Thông báo
import Header from '@/components/Home/header';               // <-- HEADER CỦA BẠN ĐÂY
import CategoryModal from '@/components/Modal/categoryModal';
import ProductDetailModal from '@/components/Modal/productDetailModal';
import AuthModal from '@/components/Modal/authModal';
import CartModal from '@/components/Modal/cartModal';
import FloatingCart from '@/components/Home/floatingCart';

export const metadata: Metadata = {
  title: 'Si20k_Store',
  description: 'Cửa hàng đồ si giá rẻ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Nhúng Font Awesome để hiện icon giỏ hàng, user... */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
        />
      </head>
      <body>
        {/* Bọc toàn bộ app bằng StoreProvider để Header lấy được dữ liệu giỏ hàng/user */}
        <StoreProvider>
          
          {/* Notification luôn nằm trên cùng (z-index cao nhất) */}
          <Notification />

          {/* Header nằm ngay dưới, hiển thị xuyên suốt mọi trang */}
          <Header />
          <CategoryModal />
          <ProductDetailModal />
          <AuthModal />
          <CartModal />
          <FloatingCart />
          {/* {children} chính là nội dung thay đổi của từng trang (ví dụ trang chủ app/page.tsx) */}
          <main className="min-h-screen pt-4"> 
             {children}
          </main>

        </StoreProvider>
      </body>
    </html>
  );
}