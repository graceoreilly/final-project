import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import DatabaseInitializer from "@/components/DatabaseInitializer";

// ... rest of your code remains unchanged

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DatabaseInitializer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
