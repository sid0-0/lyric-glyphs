import "@/styles/globals.css";

import { Lexend } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Lexend({
  subsets: ["latin"],
  // variable: "--font-sans",
  // weight: "600",
});

export const metadata = {
  title: "Lyrical Glyph",
  description: "Generate a sharable *pretty* image from lyrics of any song",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <style jsx global>
          {`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}
        </style>
      </head> */}
      <body className={`font-sans ${inter.className}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
