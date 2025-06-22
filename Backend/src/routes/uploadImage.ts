import axios from "axios";
import { Context, Hono } from "hono";
import { sha1 } from "hono/utils/crypto";
// import ImageKit from "imagekit";

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

imageUpload.post("/", async (c: Context) => {

    try {
        const body = await c.req.formData();
        const files = body.getAll("files") as File[];

        const uploadUrls: string[] = [];

        for (const file of files) {
            console.log("FILE: ",file);
            
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: file.type });
            const base64 = arrayBufferToBase64(arrayBuffer)
            const dataUri = `data:${file.type};base64,${base64}`;
            const base64Data = dataUri.replace(/^data:image\/\w+;base64,/, '')
            // console.log(dataUri);
            const private64Key = btoa(`${c.env.PRIVATE_KEY}:`);
            console.log(private64Key);
            
            const fileName = file.name;
            const form = new FormData();
            form.append("file", blob);
            form.append("fileName", file.name);
            const urlEndPoint = 'https://upload.imagekit.io/api/v1/files/upload'
            const Authorization =  `Basic ${private64Key}`;
            const res = await fetch(urlEndPoint, {
                method: "POST",
                headers: {
                    Authorization
                },
                body: form
            })
            const result = await res.json();
            console.log("DATA : ", result);

        }

        return c.json({
            "message": "MilGAya tumhara image"
        })
    } catch (error) {
        console.log(error)
        return c.json({ "message": "Problem occured" })
    }


})

export const imageUploadRoute = imageUpload;