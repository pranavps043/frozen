
import OurValuesSection from "@/components/about/our-values-section";
import TimelineSection from "@/components/about/timeline-section";
import FullWidthSection from "@/components/common/full-width";
import Hero from "@/components/common/hero";
import db from "@/data/about.json";

export default function AboutUsPage() {
    return (
        <main className="relative w-full overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#65124366"
            />

            <TimelineSection
                backgroundImage={db.timeline.backgroundImage}
                title={db.timeline.title}
                items={db.timeline.items}
            />

            <OurValuesSection content={db.our_values} />

            <FullWidthSection
                title={db.step_into_our_frozen_world.title}
                description={
                    <p className="text-white">
                        {db.step_into_our_frozen_world.description}
                    </p>
                }
                backgroundImage={db.step_into_our_frozen_world.image}
                overlayColor={db.step_into_our_frozen_world.bg_gradient}
            />

        </main>
    );
}
