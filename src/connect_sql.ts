import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (user_name: string, profile_message:string) => {
    await prisma.user.create({
        data: {
            user_name: user_name,
            profile_message: profile_message,
        },
    }).then(()=>{
        console.log('success')
    }).catch((e)=>{
        console.log(e)
    })
}

export const getUser = async () => {
    let users
    await prisma.user.findMany().then((res)=> {
        users = res
        console.log("res", res)
    })
    return users
}

export const createPost = async () => {
    await prisma.post.create({
        data: {
            img_url: "",
            title: "",
            description: "String",
            uid: 1,
            alt: "String",
            posted_at: Date.now(),
            modified_at: Date.now(),
            happiness_rate: 0.89,
        },
    })
}

export const getPost = async () => {
    const posts = await prisma.post.findMany()
    return posts
}

// const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })