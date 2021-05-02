export interface IHeroImage {
    id: string;
    url: string;
    optimizedImagesFullWidth: IOptimizedImagesFullWidth

}

export interface EntryCardProps {
    item: {
    slug: string
    title: string
    thumbnailDescription?: string
    imageCaption?: string
    heroImage?: IHeroImage[] 
  }
  itemSection?:  string
  classes?: string
}


interface IVideo {
    id: string;
    uri: string;
    url: string;
}

export interface IVideoBlock extends IRichArticleBlock {
    isAmbientVideo: boolean;
    video: IVideo[]
}

interface IRichArticleBlock {
    id: string;
    typeHandle: string;
}

export interface ITextBlock extends IRichArticleBlock {
    heading?: string;
    body?: string;
}


export interface IOptimizedImagesFullWidth {
    focalPoint: number[];
    placeholderImage: string;
    src: string
    srcUrls: string[];
    srcWebp?: string;
    srcset: string
}



interface IFullWidthImage {
    id: string;
    optimizedImagesFullWidth: IOptimizedImagesFullWidth
}

export interface IFullWidthImageBlock extends IRichArticleBlock {
    constrainImage: boolean;
    id: string;
    url: string;
    image:  IFullWidthImage[]
    imageCaption?: string;
}


export interface IRichArticle {
    [index: number]: ITextBlock | IFullWidthImageBlock | IVideoBlock 
}