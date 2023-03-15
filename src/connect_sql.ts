import { PrismaClient } from '@prisma/client'
import { clientCreateUser } from './types/tableType'
import { clientCreatePost } from './types/tableType'
import { Post } from './types/tableType';

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const { DefaultAzureCredential } = require('@azure/identity');


const prisma = new PrismaClient()

export const createUser = async (user: clientCreateUser) => {
    const user_name = user.user_name
    const profile_message = user.profile_message
    const google_user_id = user.uid
    await prisma.user.create({
        data: {
            user_name: user_name,
            profile_message: profile_message,
            google_user_id: google_user_id,
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

export const getOneUser = async (google_user_id: string) => {
    const uid = await prisma.user.findFirst({
        where: {
            google_user_id: google_user_id
        },
        select: {
            uid: true
        }
    }).then((res) => {
        if (res?.uid) {
            return (res?.uid)
        }
        else {
            return (1)
        }
    })
    console.log(google_user_id, uid)
    const user = await prisma.user.findUnique({
        where: {
            uid: uid
        }
    }).then((res) => {
        if (res) {
            return res
        }
        else {
            return null
        }
    })
    return user
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

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
// The ID of your GCS bucket
const bucketName = 'wakuwaku-gcp-blob';

async function azure_upload(row_img: string) {
    try {

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');

        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            new DefaultAzureCredential()
        );

        // console.log("Azure Blob storage v12 - JavaScript quickstart sample");

        // // Quick start code goes here

        // const AZURE_STORAGE_CONNECTION_STRING =
        //     process.env.AZURE_STORAGE_CONNECTION_STRING;

        // if (!AZURE_STORAGE_CONNECTION_STRING) {
        //     throw Error('Azure Storage Connection string not found');
        // }else{
        //     console.log(AZURE_STORAGE_CONNECTION_STRING)
        // }

        // // Create the BlobServiceClient object with connection string
        // const blobServiceClient = BlobServiceClient.fromConnectionString(
        //     AZURE_STORAGE_CONNECTION_STRING
        // );

        // Create a unique name for the container
        const containerName = 'quickstart' + uuidv1();

        console.log('\nCreating container...');
        console.log('\t', containerName);

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // Create the container
        const createContainerResponse = await containerClient.create();
        console.log(
            `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
        );
        // Create a unique name for the blob
        const blobName = 'quickstart' + uuidv1() + '.txt';

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Display blob name and url
        console.log(
            `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
        );

        // Upload data to the blob
        const data = row_img;
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log(
            `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );

        console.log('\nListing blobs...');

        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
            // Get Blob Client from name, to get the URL
            const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

            // Display blob name and URL
            console.log(
                `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
            );
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

export const createPost = async (post: clientCreatePost) => {
    const title = post.title || ""
    const description = post.description || ""
    const alt = post.alt || ""
    const posted_at = 10
    const modified_at = 10
    const row_img = post.row_img

    // The new ID for your GCS file
    const destFileName = 'your-new-file-name' + uuidv1();
    const url: string = await storage.bucket(bucketName).file(destFileName).save(row_img).then(() => {
        return `https://storage.cloud.google.com/wakuwaku-gcp-blob/${destFileName}`
    })
    // console.log(
    //     `${destFileName} with contents ${row_img} uploaded to ${bucketName}.`
    // );

    console.log(row_img)
    //ここでblobをどっかに保存してそのurlを受け取る関数を作る,それで下のimg_urlに保存

    const img_url = url

    // const containerName = 'quickstart' + uuidv1();
    // const containerClient = BlobServiceClient.getContainerClient(containerName);
    // const blockBlobClient = containerClient.getBlockBlobClient(img_url);

    // const uploadBlobResponse = await blockBlobClient.upload(row_img, row_img.length);
    // console.log(
    //     `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    // );

    // const posted_at = Date.now()
    // const modified_at = Date.now()
    const deleted = false
    const uid = await prisma.user.findUnique({
        where: {
            google_user_id: post.uid
        },
        select: {
            uid: true
        }
    }).then((res) => {
        if (res?.uid) {
            return (res?.uid)
        }
        else {
            return (1)
        }
    })
    await prisma.post.create({
        data: {
            title: title,
            description: description,
            img_url: img_url,
            uid: uid,
            alt: alt,
            posted_at: posted_at,
            modified_at: modified_at,
            happiness_rate: 0.89,
            deleted: deleted,
        },

    })
}



export const getPost = async () => {
    const posts = await prisma.post.findMany() as Post[]
    const newPosts: Post[] = []
    await posts.map((post) => {

        const return_str = fetch(post.img_url).then((res) => {
            return res.blob().then((res_blob) => {

                post.row_img = res_blob.toString()

                return res_blob.text().then((row_img) => {
                    const myRe = /program-data="[^"]*"><\/div><input type="hidden/i;
                    const re_row_img = myRe.exec(row_img)
                    if (re_row_img) {
                        // console.log(re_row_img[0].replace('program-data="', '').replace('"><\/div><input type="hidden', ''))
                        console.log('\n\n\n')
                        return re_row_img[0].replace('program-data="', '').replace('"><\/div><input type="hidden', '')
                    }
                    else {
                        return ""
                    }
                })
            });
        }).then((res) => {
            const newPost = Object.assign({}, post)
            newPost.row_img = res
            console.log(newPost)
            newPosts.push(newPost)
        })
        console.log('return str', return_str)
    })
    return newPosts
}

export const getRandomPost = async () => {
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
        users = getPost()
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