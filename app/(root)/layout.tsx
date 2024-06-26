import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import CustomerSupport from "@/components/shared/CustomerSupport";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CustomerSupport />
    </div>
  );
}
