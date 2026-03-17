import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </>
    )
}