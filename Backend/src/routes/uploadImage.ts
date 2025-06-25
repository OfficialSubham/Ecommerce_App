// import axios from "axios";
import { Context, Hono } from "hono";
// import { sha1 } from "hono/utils/crypto";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const imageUpload = new Hono();

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
}

const toBase64Safe = (str: string): string => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let binary = '';
    for (let b of bytes) {
        binary += String.fromCharCode(b);
    }
    return btoa(binary);
}

interface productInterface {
    url: string;
    fileId: string;
}

imageUpload.post("/", async (c: Context) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const body = await c.req.formData();
        const files = body.get("files") as File;
        const productName = body.get('productName');
        const productPrice = body.get('productPrice');

        const databaseData: productInterface[] = [];

        const arrayBuffer = await files.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: files.type });
        // const base64 = arrayBufferToBase64(arrayBuffer)
        // const dataUri = `data:${files.type};base64,${base64}`;
        // const base64Data = dataUri.replace(/^data:image\/\w+;base64,/, '')
        // // console.log(dataUri);
        const private64Key = btoa(`${c.env.PRIVATE_KEY}:`);
        console.log(private64Key);

        // const fileName = file.name;
        const form = new FormData();
        form.append("file", blob);
        form.append("fileName", files.name);
        const urlEndPoint = 'https://upload.imagekit.io/api/v1/files/upload'
        const Authorization = `Basic ${private64Key}`;
        const res = await fetch(urlEndPoint, {
            method: "POST",
            headers: {
                Authorization
            },
            body: form
        })
        const result = await res.json();
        console.log("DATA : ", result);
        if (result.fileId && result.url) {
            const fileId = result.fileId;
            const url = result.url;
            databaseData.push({
                fileId,
                url
            })
        }


        if (databaseData.length == 0) {
            return c.json({
                message: "Upload Failed"
            }, 500)
        }

        await prisma.$transaction(async (tx) => {

            if (typeof productName !== "string") {
                return c.json({
                    "message": "Enter Valid Name"
                }, 400)
            }
            const price = Number(productPrice) * 100;
            const res = await tx.product.create({
                data: {
                    product_name: productName,
                    price
                }
            })
            const productId = res.product_id;
            // await Promise.all(
            //     databaseData.map((data) => {
            //         return tx.images.create({
            //             data: {
            //                 productId,
            //                 imageUrl: data.url,
            //                 fileId: data.fileId
            //             }
            //         })
            //     })
            // )
            await tx.images.create({
                data: { productId, imageUrl: databaseData[0].url, fileId: databaseData[0].fileId }
            })

        })
        return c.json({
            "message": "Uploaded"
        })
    } catch (error) {
        console.log(error)
        return c.json({ "message": "Problem occured" }, 500)
    }


})

export const imageUploadRoute = imageUpload;