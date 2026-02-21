
import TimelineSection from "@/components/about/timeline-section";
import Hero from "@/components/common/hero";
import db from "@/data/about.json";

export default function AboutUsPage() {
    return (
        <main className="relative w-full overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#65124266"
            />

            <TimelineSection
                backgroundImage={db.timeline.backgroundImage}
                title={db.timeline.title}
                items={db.timeline.items}
            />
        </main>
    );
}
