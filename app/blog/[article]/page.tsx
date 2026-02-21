import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import Hero from "@/components/common/hero";
import BlogSection from "@/components/blog/blog-section";
import { ImageType } from "@/types/common";

interface BlogSection {
    title: string;
    description: string;
    image: ImageType;
}

interface BlogData {
    slug: string;
    meta: {
        title: string;
        description: string;
        keywords: string[];
    };
    hero: {
        backgroundImage: ImageType;
        title: string;
        description: string;
    };
    sections: BlogSection[];
}

async function getBlogData(slug: string): Promise<BlogData | null> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'blogs', `${slug}.json`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ article: string }> }): Promise<Metadata> {
    const { article } = await params;
    const data = await getBlogData(article);

    if (!data) {
        return {
            title: 'Blog Not Found',
        };
    }

    return {
        title: data.meta.title,
        description: data.meta.description,
        keywords: data.meta.keywords,
        openGraph: {
            title: data.meta.title,
            description: data.meta.description,
            images: [data.hero.backgroundImage.src],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.meta.title,
            description: data.meta.description,
            images: [data.hero.backgroundImage.src],
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ article: string }> }) {
    const { article } = await params;
    const data = await getBlogData(article);

    if (!data) {
        notFound();
    }

    return (
        <main className="relative w-full overflow-x-hidden">
            <Hero
                backgroundImage={data.hero.backgroundImage}
                title={data.hero.title}
                description={data.hero.description}
                overlayColor="#65124366"
            />

            <article>
                {data.sections.map((section, index) => (
                    <BlogSection
                        key={index}
                        title={section.title}
                        description={section.description}
                        image={section.image}
                        index={index}
                    />
                ))}
            </article>
        </main>
    );
}
