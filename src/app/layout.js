import './globals.css';
import { CarProvider } from './context/CarContext';

export const metadata = {
  title: 'Car Finder',
  description: 'Find your perfect car',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <CarProvider>
          {children}
        </CarProvider>
      </body>
    </html>
  );
}