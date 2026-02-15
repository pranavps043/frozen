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

export interface BackgroundType {
    color: string
}

export interface PageUrlListType {
    id: number
    name: string
    slug: string
    description: string
    image: ImageType
}