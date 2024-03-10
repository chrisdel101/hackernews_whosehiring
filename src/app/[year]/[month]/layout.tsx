import { Inter } from "next/font/google";
import "../../globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
    {children}   
   </>
  );
}
