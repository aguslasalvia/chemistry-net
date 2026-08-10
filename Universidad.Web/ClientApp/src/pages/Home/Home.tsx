import Hero from "@components/ui/Hero/Hero";
import QuickLinks from "@components/ui/QuickLinks/QuickLinks";
import News from "@components/ui/News/News";
import Programs from "@components/ui/Programs/Programs";
import Events from "@components/ui/Events/Events";
import VideoSection from "@components/ui/VideoSection/VideoSection";


const Home = () => {
    return (
        <>
            <Hero />
            <QuickLinks />
            <News />
            <Programs />
            <Events />
            <VideoSection />
        </>
    )
}

export default Home;
