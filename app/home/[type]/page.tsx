import { notFound } from "next/navigation";
import path from "path";
import fs from 'fs/promises';
import HomeClient from "./home-client";
import PagesData from '@/data/products/home.json';

type TypeData = {
    title: string;
    description: string;
    content: string;
    products?: any[];
    favorite_treats?: any[];
    dessert_paradise?: any[];
    flavors_feelings?: any;
    earn_rewards?: any;
};

async function getPageData(type: string): Promise<TypeData | null> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', `${type}.json`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
}

export default async function Home({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const data = await getPageData(type);

    if (!data) {
        notFound();
    }

    return <HomeClient data={data} PageList={PagesData} />;
}