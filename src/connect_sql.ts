import { PrismaClient } from '@prisma/client'
import { User } from './types/tableType'
import { Post } from './types/tableType'

const prisma = new PrismaClient()

export const createUser = async (user: User) => {
    const user_name = user.user_name
    const profile_message = user.profile_message 
    await prisma.user.create({
        data: {
            user_name: user_name,
            profile_message: profile_message,
        },
    }).then(() => {
        console.log('success')
    }).catch((e) => {
        console.log(e)
    })
}

export const getUser = async () => {
    let users
    await prisma.user.findMany().then((res) => {
        users = res
        console.log("res", res)
    })
    return users
}

export const updateUser = async () => {
}

export const deleteUser = async (uid: number) => {
    let users
    await prisma.user.delete({
        where: {
            uid: uid
        }
    }).then((res) => {
        users = getUser()
    })
    return users
}

export const createPost = async (post: Post) => {
    const title = post.title || ""
    const description = post.description || ""
    const alt = post.alt || ""
    const posted_at = post.posted_at || Date.now()
    const modified_at = post.modified_at || Date.now()
    const deleted = post.deleted || false
    await prisma.post.create({
        data: {
            img_url: post.img_url,
            title: title,
            description: description,
            uid: post.uid,
            alt: alt,
            posted_at: posted_at,
            modified_at: modified_at,
            happiness_rate: 0.89,
            deleted: deleted,
        },
    })
}

export const getPost = async () => {
    const posts = await prisma.post.findMany()
    return { data: posts }
}


export const deletePost = async (post_id: number) => {
    let users
    await prisma.post.delete({
        where: {
            post_id: post_id
        }
    }).then((res) => {
        users = getUser()
    })
    return users
}

// const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })