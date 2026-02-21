
import ContactFormSection from "@/components/contact/contact-form-section";
import db from "@/data/contact.json";
import Hero from "@/components/common/hero";

export default function ContactUsPage() {
    return (
        <main className="relative  overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#62124266"
            />

            <ContactFormSection
                backgroundImage={db.contactForm.backgroundImage}
                title={db.contactForm.title}
                description={db.contactForm.description}
                buttonText={db.contactForm.buttonText}
                fields={db.contactForm.fields}
            />
        </main>
    );
}
