import { ButtonType, ImageType } from "./common";

export interface ThemeType {
    button_color: string;
    button_hover: string;
    bg_gradient: string;
    accordion_bg: string;
    accordion_bg_active: string;
    dessert_paradise_bg: string;
    about_section_image: string;
    about_section_bg?: string;
}

export interface HeroContentType {
    title: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    image: ImageType;
    sub_image: ImageType;
    floatImages: string[];
    tagline: string;
    tagline_img: ImageType;
}

export interface HeroType {
    slug: string;
    title: string;
    image: string;
    bg_gradient: string;
    theme?: ThemeType;
    content: HeroContentType;
}

export interface AboutUsType {
    title: string;
    heading: string;
    description: string;
    body: string;
    button: ButtonType;
    image: ImageType;
    bg_gradient: string;
    bg_image: string;
}

export interface ProductType {
    id: number;
    title: string;
    slug?: string;
    description: string;
    image: ImageType;
    button: ButtonType;
    particles: string[];
}

export interface FavoriteTreatsType {
    title: string;
    description: string;
    image: ImageType;
    bg_gradient: string;
    bg_gradient_active: string;
    card_bg: string;
    products: ProductType[];
}

export interface DessertParadiseType {
    gradients: {
        from: string;
        to: string;
    };
    title: string;
    description: string;
    bg_gradient: string;
    button: ButtonType;
    image: ImageType;
}

export interface AccordionItemType {
    id: number;
    title: string;
    description: string;
    image: ImageType;
    button: ButtonType;
}

export interface FlavorsFeelingsType {
    title: string;
    description: string;
    bg_gradient: string;
    accordion_bg: string;
    accordion_bg_active: string;
    accordion: AccordionItemType[];
}

export interface EarnRewardsType {
    pre_title: string;
    title: string;
    subtitle: string;
    description: string;
    bg_gradient: string;
    image: ImageType;
    button: ButtonType;
    particles: string[];
}

export interface HomeDataType {
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
        accordion_bg: string;
        accordion_bg_active: string;
        dessert_paradise_bg: string;
        about_section_image: string;
    };
    heros: HeroType[];
    hero: HeroType;
    about_us: AboutUsType;
    favorite_treats: FavoriteTreatsType;
    dessert_paradise: DessertParadiseType;
    flavors_feelings: FlavorsFeelingsType;
    earn_rewards: EarnRewardsType;
}
