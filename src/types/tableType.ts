export interface User {
  uid: number,
  user_name: string,
  profile_message: string | null
}

export interface Post {
  post_id: number,
  img_url: string,
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