import type { Metadata } from 'next';
import "./style.css";
import { StoreProvider } from '@/context/store_context';
import Notification from '@/components/Home/notification';
import Header from '@/components/Home/header';
import CategoryModal from '@/components/Modal/categoryModal';
import ProductDetailModal from '@/components/Modal/productDetailModal';
import AuthModal from '@/components/Modal/authModal';
import CartModal from '@/components/Modal/cartModal';
import FloatingCart from '@/components/Home/floatingCart';

export const metadata: Metadata = {
  title: 'Si20k_Store',
  description: 'Affordable second-hand clothing store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of unstyled content (FOUC) for dark mode
              (function() {
                const darkMode = localStorage.getItem('si20k_darkMode');
                if (darkMode === 'true') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <StoreProvider>
          <Notification />
          <Header />
          <CategoryModal />
          <ProductDetailModal />
          <AuthModal />
          <CartModal />
          <FloatingCart />
          
          <main className="min-h-screen pt-4"> 
             {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
