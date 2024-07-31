import Footer from "../shared/footer";
import Header from "../shared/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col min-h-screen">
            <Header></Header>
            <section className="flex-grow">{children}</section>
            <Footer></Footer>
        </main>
    );
}
