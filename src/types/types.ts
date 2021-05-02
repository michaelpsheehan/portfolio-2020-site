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

interface IVideoBlock {
    id: string;
    typeHandle: string;
    isAmbientVideo: boolean;
    video: IVideo
}


export interface IRichArticle {

}
    

interface IRichArticleBlock {
    id: string;
    typeHandle: string;
}

interface ITextBlock extends IRichArticleBlock {
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

  