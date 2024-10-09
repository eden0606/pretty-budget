import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main
      className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
    >
      <Navbar />
    </main>
  );
}
