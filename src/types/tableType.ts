export interface User {
  uid: number,
  user_name: string,
  profile_message: string | null
}

export interface Post {
  post_id: number,
  img_url: string,
  row_img?: string,
  title: string | null,
  description: string | null,
  uid: number,
  user: User,
  alt: string | null,
  posted_at: number | null, //unix time
  modified_at: number | null, //unix time
  happiness_rate: number,
  deleted: boolean | null
}

export interface clientCreatePost {
  title: string | null,
  description: string | null,
  uid: string, //google uid
  alt: string | null,
  happiness_rate: number,
  row_img: string,
}

export interface clientCreateUser {
  uid: string, //google uid
  user_name: string,
  profile_message: string | null
}

export interface clientGetAllUser {
}

export interface clientGetUser {
  uid: string //google uid 
}