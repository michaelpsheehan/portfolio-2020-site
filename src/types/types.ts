import { string } from "prop-types"
import { Interface } from "readline"

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


interface ITechnologyentries {
    id: string;
    title: string;
}



interface IOptimizedImagesGridThumbnail {
    src: string;
}

interface ISeoMeta {

        title: string;
        description: string;
        social: {
          facebook: {
            title: string;
            description: string;
            image: {
                id: string;
                optimizedImagesGridThumbnail: IOptimizedImagesGridThumbnail
            }
          }
          twitter: {
                title: string;
                description: string;
                image: {
                id: string;
                optimizedImagesGridThumbnail: IOptimizedImagesGridThumbnail
              }
            }
        }
}


interface IEntry {
    id: string;
    uid: string;
    url: string;
    slug: string;
    postDate: string;
    title: string;
    projectTypeLabel: string;
    projectTypeValue: string;
    thumbnailDescription: string;
    introHeading: string;
    introBody: string;
    richText: string;
    codeRepoUrl: string;
    siteUrl: string;
    imageCaption: string;
    richArticle: IRichArticle
    technologyentries: ITechnologyentries[]
    heroImage: IHeroImage[]
    seoMeta: ISeoMeta
}

interface ISite {
    siteMetadata: {
        siteUrl: string
    }
}


export interface IEntryPageData {
    data: {
        craft: {
            entries: IEntry[]
        }
    }

}