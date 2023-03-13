-- CreateTable
CREATE TABLE "Post" (
    "post_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img_url" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'no title',
    "description" TEXT NOT NULL DEFAULT 'no description',
    "uid" INTEGER NOT NULL,
    "alt" TEXT NOT NULL DEFAULT 'happy image',
    "posted_at" INTEGER NOT NULL,
    "modified_at" INTEGER NOT NULL,
    "happiness_rate" REAL NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "profile_message" TEXT
);

-- CreateTable
CREATE TABLE "Favorite" (
    "favorite_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,
    "fav_at" INTEGER NOT NULL,
    "fav" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Favorite_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("post_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follow" (
    "follow_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "followee_uid" INTEGER NOT NULL,
    "following" BOOLEAN NOT NULL DEFAULT false,
    "followed_at" INTEGER NOT NULL,
    "deleted_at" INTEGER NOT NULL,
    CONSTRAINT "Follow_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "img_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img_url" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,
    CONSTRAINT "Image_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
