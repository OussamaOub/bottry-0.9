import { Navigation } from "../_components/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex dark:bg-[#020817]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {/* <SearchCommand /> */}
        {/* <ModalProvider /> */}

        {children}
      </main>
    </div>
  );
}

export default Layout;
