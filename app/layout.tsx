import type { Metadata } from "next";
import { Josefin_Sans, Montserrat, Akaya_Kanadaka, Pacifico, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/navigation";
import SmoothScroll from "@/components/layout/smooth-scroll";
import Footer from "@/components/layout/footer";

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const akaya = Akaya_Kanadaka({
  variable: "--font-akaya",
  weight: "400",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: '%s | Frozen Creamery',
    default: 'Frozen Creamery - Home',
  },
  description: 'Frozen Creamery - Home',
  keywords: ['Frozen Creamery', 'Frozen Creamery Home', 'Frozen Creamery About', 'Frozen Creamery Contact', 'Frozen Creamery Products'],
  authors: [{ name: 'Frozen Creamery' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${montserrat.variable} ${akaya.variable} ${pacifico.variable} ${playfair.variable} antialiased`}
      >
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
