export interface ButtonType {
    label: string
    link: string
}

export interface ImageType {
    src: string
    alt: string
    width?: number
    height?: number
}

export interface PageUrlListType {
    id: number
    name: string
    slug: string
    description: string
    image: ImageType
}

export interface BackgroundType {
    color: string
}

export interface TreatItem {
    id: number;
    title: string;
    description: string;
    image: ImageType;
    button: ButtonType;
    particles: string[];
}

export interface AccordionItemType {
    id: number;
    title: string;
    description: string;
    image: ImageType;
    button: ButtonType;
}

export interface PageDataType {
    base_styles: {
        button_color: string;
        button_shadow: string;
        button_hover: string;
        footer_bg_image?: string;
    };
    hero: {
        slug: string;
        title: string;
        image: string;
        bg_gradient: string;
        content: {
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
    };
    about_us: {
        title: string;
        heading: string;
        description: string;
        body: string;
        button: ButtonType;
        image: ImageType;
        bg_image: string;
        bg_gradient: string;
        imgOverlayColor?: string;
        imgOverlayOpacity?: number;
    };
    favorite_treats: {
        title: string;
        description: string;
        image: ImageType;
        bg_gradient: string;
        bg_gradient_active?: string;
        card_bg: string;
        products: TreatItem[];
    };
    dessert_paradise: {
        title: string;
        description: string;
        button: ButtonType;
        image: ImageType;
        gradients: {
            from: string;
            to: string;
        };
        bg_gradient: string;
    };
    flavors_feelings: {
        title: string;
        description: string;
        background: BackgroundType;
        bg_gradient: string;
        accordion_bg: string;
        accordion_bg_active: string;
        accordion: AccordionItemType[];
    };
    earn_rewards: {
        pre_title: string;
        title: string;
        subtitle: string;
        description: string;
        bg_gradient: string;
        image: ImageType;
        button: ButtonType;
        particles: string[];
    };
}