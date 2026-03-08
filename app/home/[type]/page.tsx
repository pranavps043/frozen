import { notFound } from "next/navigation";
import path from "path";
import fs from 'fs/promises';
import HomeClient from "./home-client";
import PagesData from '@/data/products/home.json';
import { HomeDataType, HeroType } from "@/types/home";

async function getPageData(type: string): Promise<any> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', `${type}.json`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
}

async function getHomeData(): Promise<HomeDataType | null> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'home.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
}

export default async function Home({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const homeData = await getHomeData();

    if (!homeData) {
        notFound();
    }

    const specificData = await getPageData(type);

    // Find the specific hero for this page type
    const activeHero = homeData.heros.find((h: HeroType) => h.slug === type);

    if (!activeHero && !specificData) {
        notFound();
    }

    // Create the final data object by merging homeData with specific data
    // Ensuring it conforms to HomeDataType
    const data: HomeDataType = {
        ...homeData,
        hero: activeHero || specificData?.hero || homeData.hero,
        ...(specificData || {})
    };

    return <HomeClient data={data} heros={homeData.heros} PageList={PagesData} />;
}