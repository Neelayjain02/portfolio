import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Neelay Jain Portfolio",
  description:
    "Mechanical Engineer building intelligent machines & AI-powered systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V43VPC5GW4"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V43VPC5GW4');
            `,
          }}
        />
      </head>

      <body className="bg-[#080A10] text-[#E0E4EB]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
