import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import HeroSection from "@/Components/HeroSection";
import Navbar from "@/Components/Navbar";
import Pricing from "@/Components/Pricing";
import Footer from "@/Components/Footer";
import { getServerSession } from "next-auth";

const App = async () => {

    const session: CustomSession | null = await getServerSession(authOptions);

    return (
        <>
            <Navbar user={session?.user} />
            <HeroSection />
            <Pricing user={session?.user} />
            <Footer />
        </>
    )
};

export default App;