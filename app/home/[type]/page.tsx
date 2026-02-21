import { notFound } from "next/navigation";
import path from "path";
import fs from 'fs/promises';
import HomeClient from "./home-client";
import PagesData from '@/data/products/home.json';

export const dynamic = 'force-dynamic';

import { PageDataType } from "@/types/common";

async function getPageData(type: string): Promise<PageDataType | null> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', `${type}.json`);
        console.log(`Loading data from: ${filePath}`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error loading page data for ${type}:`, error);
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