
import ContactFormSection from "@/components/contact/contact-form-section";
import db from "@/data/franchise.json";
import Hero from "@/components/common/hero";
import FullWidth from "@/components/common/full-width";

export default function FranchisePage() {
    return (
        <main className="relative  overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#65124380" 
            />

            <ContactFormSection
                backgroundImage={db.contactForm.backgroundImage}
                title={db.contactForm.title}
                description={db.contactForm.description}
                buttonText={db.contactForm.buttonText}
                overlayColor="#651243"
                overlayOpacity={0.1}
                fields={db.contactForm.fields}
            />

            <FullWidth
                backgroundImage={db.start_journey.backgroundImage}
                title={db.start_journey.title}
                description={db.start_journey.description}
                overlayColor="#651243"
                overlayOpacity={0.1}
            />
        </main>
    );
}
