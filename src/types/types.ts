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

export interface IRichArticleBlock {
    id: string;
    typeHandle: string;
    backgroundColour?: string | undefined
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



export interface IFullWidthImage {
    id: string;
    optimizedImagesFullWidth: IOptimizedImagesFullWidth
}

export interface IFullWidthImageBlock extends IRichArticleBlock {
    constrainImage?: boolean;
    // id: string;
    url: string;
    image:  IFullWidthImage[]
    imageCaption?: string;
}


export interface IRichArticle {
    [index: number]: ITextBlock | IFullWidthImageBlock | IVideoBlock
}[]



export interface ITechnologyentries {
    id: string;
    title: string;
}

export interface IGlobalSets {
    fallbacks: {
        id: string;
        fallbackImage: {
            id: string;
            url: string
        }
    }[]
    socialLinks: {
        id: string;
        twitterUsername: string;
        githubUrl: string;
        linkedinUrl: string;
    }[]
}



export interface IOptimizedImagesGridThumbnail {
    src: string;
}

export interface ISeoMeta {

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


export interface IEntry {
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

export type IIndexProjects = IEntry & {
    featuredProjects: {
        id: string;
        title: string;
    }
}

export interface ISite {
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


export interface IPageTransitionProps {
    node: any;
    exit: {
        length: number;
        trigger: any;
    };
    e: any;
    entry: any;
}