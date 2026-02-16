
import ContactFormSection from "@/components/contact/contact-form-section";
import db from "@/data/rewards.json";
import Hero from "@/components/common/hero";
import FullWidth from "@/components/common/full-width";

export default function RewardsPage() {
    return (
        <main className="relative  overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#65124340"
            />



            <FullWidth
                backgroundImage={db.the_game.backgroundImage}
                title={db.the_game.title}
                description={db.the_game.description}
                overlayColor="#65124380"
            />
        </main>
    );
}
