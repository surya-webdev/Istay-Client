import SideNavigation from "../_components/SideNavigation";

export default function RootLayout({ children }) {
  return (
    <main className="grid grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div>{children}</div>
    </main>
  );
}
