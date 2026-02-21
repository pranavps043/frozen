
'use client'
import ContactFormSection from "@/components/contact/contact-form-section";
import db from "@/data/rewards.json";
import Hero from "@/components/common/hero";
import FullWidth from "@/components/common/full-width";
import SectionVideo from "@/components/common/section-video";
import { RewardClaimApp } from "@/components/reward-claim/rewards-app";
import Button from "@/components/ui/button";
import { scrollToId } from "@/lib/utls";
import Modal from "@/components/ui/modal";
import { useState } from "react";

export default function RewardsPage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <main className="relative  overflow-x-hidden">
            <Hero
                backgroundImage={db.hero.backgroundImage}
                title={db.hero.title}
                description={db.hero.description}
                overlayColor="#65124340"
            >
                <div className="flex gap-x-5">
                    <Button size="sm" onClick={() => setOpenModal(true)}>Play Game</Button>
                    <Button size="sm" variant="outline" onClick={() => scrollToId("verify-reward")}>Verify Reward</Button>
                </div>
            </Hero>
            <section className="py-20" style={{
                backgroundImage: `url(/assets/images/rewards/section.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
                id="verify-reward">
                <RewardClaimApp />
            </section>

            {/* <SectionVideo
                backgroundImage={db.the_game.backgroundImage}
                title={db.the_game.title}
                description={db.the_game.description}
                overlayColor="#65124380"
                backgroundVideo={db.the_game.backgroundVideo}
            /> */}
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <video
                    src={db.the_game.backgroundVideo.src}
                    controls
                    autoPlay
                    className="w-full rounded-xl"
                />
            </Modal>

        </main>
    );
}
