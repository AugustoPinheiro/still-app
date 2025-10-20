interface Meta {
  cursor: number;
  total: number;
  private?: boolean
}

interface Media {
  post_id: number;
  id: number;
  image_url: string;
  video_url: string;
}

interface Tag {
  title: string;
  sensitive: boolean;
  tagged_by_ia: boolean;
  tagged_by_id: number;
}

interface Clothing {
  pos_x: number;
  pos_y: number;
  clothing_id: number;
}

interface Person {
  pos_x: number;
  pos_y: number;
  profile_id: number;
}

interface PostData {
  id: number;
  description: string;
  profile_id: number;
  username: string;
  profile_name: string;
  avatar: string;
  media: Media[];
  tags: Tag[];
  clothing: Clothing[];
  people: Person[];
  likes: string[];
  liked: boolean;
  post: {
    media: Media[];
  }
}

export interface PostsListsType {
  meta: Meta;
  result: PostData[];
}

interface Page {
  meta: Meta;
  result: PostData[];
}

export interface InfiniteQueryData {
  pageParams: Array<number | undefined>;
  pages: Page[];
}