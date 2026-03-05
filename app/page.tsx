import { Metadata } from 'next';
import path from "path";
import fs from 'fs/promises';
import HomeClient from "./home-client";
import PagesData from '@/data/products/home.json';

type HomeData = {
    seo: {
        title: string;
        description: string;
        keywords: string;
        og_title: string;
        og_description: string;
    };
    base_styles: {
        bg_gradient: string;
        button_color: string;
        button_shadow: string;
        button_hover: string;
        button_size: string;
    };
    hero: any;
    heros: any[];
    about_us: any;
    favorite_treats: any;
    dessert_paradise: any;
    flavors_feelings: any;
    earn_rewards: any;
};

export const metadata: Metadata = {
    title: 'Frozen Creamery N\' Garden - Premium Frozen Desserts & Fresh Salads',
    description: 'Discover our collection of frozen desserts, handmade ice creams, cheesecakes, and fresh garden salads. Crafted with love using only fresh fruits, premium dairy, and natural ingredients.',
    keywords: 'frozen desserts, ice cream, cheesecake, garden salads, premium frozen treats, handmade desserts',
    openGraph: {
        title: 'Frozen Creamery N\' Garden',
        description: 'Indulgence and balance sit side by side - discover our premium frozen desserts and fresh salads.',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    }
};

async function getHomeData(): Promise<HomeData> {
    const filePath = path.join(process.cwd(), 'data', 'home.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function Home() {
    const homeData = await getHomeData();

    return <HomeClient data={homeData} heros={homeData.heros} PageList={PagesData} />;
}
