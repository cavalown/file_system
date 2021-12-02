"use strict"
import Koa from "koa"
import Router from "koa-router"
import KoaBody from "koa-body"
import fse from "fs-extra"
import path from "path"
import config from "../config/index.js"
import fileSend from "koa-send"
import cors from '@koa/cors'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(KoaBody());

const dirPath = path.resolve(__dirname, config.koaApi.storage.filespace);
const recordFile = path.resolve(__dirname, config.koaApi.storage.recordpath);
// console.log(dirPath);
// console.log(recordFile)

app.use(
  KoaBody({
    multipart: true,
    urlencoded: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.resolve(dirPath),
      multiples: true,
    },
  })
);

// Check Server
router.get("/", async (ctx) => {
  ctx.body = {"Content": "Server on"};
  console.log("content: server on")
});

// Get all files
router.get("/files", async (ctx) => {
  try {
    let fileAll = await fse.readFile(recordFile, "utf-8");
    let fileResult = []
    fileAll.split('\n').forEach(item=>{
      fileResult.push(item.split('||').slice(1,2).join())
    })
    console.log("All Files:", fileResult);
    ctx.body = fileResult;
  } catch (err) {
    console.log(err);
  }
});

// Upload New File
router.post("/files/Upload", async (ctx) => {
  const fileInfo = ctx.request.files.file;
  const newFileName = fileInfo.path.split("/").slice(-1).join();
  const oriFileName = fileInfo.name;
  const FileMime = fileInfo.type;
  // const FileTimestamp = fileInfo.lastModifiedDate;
  const FileTimestamp = new Date().toISOString();
  const fileInfoRecord = `${newFileName}||${oriFileName}||${FileMime}||${FileTimestamp}`;
  console.log(fileInfoRecord);
  // write to record
  try {
    let data = await fse.readFile(recordFile, "utf-8");
    if (data) {
      data = data + "\n" + fileInfoRecord;
    } else {
      data = fileInfoRecord;
    }
    await fse.outputFile(recordFile, data, {
      flags: "a+",
    });
    ctx.body = fileInfoRecord;
  } catch (err) {
    console.log(err);
  }
});

// Delete File
router.delete("/files/Delete/fileName=:fileName", async (ctx) => {
  let fileName = ctx.params.fileName;
  console.log("filename:", fileName);
  let fileInfoRecords = (await fse.readFile(recordFile, "utf-8")).split("\n");
  let data = fileInfoRecords;
  try{
    fileInfoRecords.map((item, index, data)=>{
      if (item.includes(fileName)){
        const newFileName = item.split("||").slice(0, 1).join();
        fse.remove(path.resolve(dirPath, newFileName));
        console.log(`File: ${fileName} deleted!`);
        ctx.body = `File: ${fileName} deleted!`;
        data.splice(index, 1);
        console.log(data);
      }
    })
    fse.outputFile(recordFile, data.join('\n'), {
      flags: "w",
    });
  }catch(err){console.log(err);}
});


// Download file
router.get("/files/Download/fileName=:fileName", async (ctx) => {
  let fileName = ctx.params.fileName;
  let fileInfoRecords = (await fse.readFile(recordFile, "utf-8")).split("\n");
  try {
    fileInfoRecords.forEach((item) => {
      if (item.split('||').slice(1,2).join() === fileName) {
        const newFileName = item.split("||").slice(0, 1).join();
        const filePath = path.resolve(dirPath, newFileName);
        if (fse.existsSync(filePath)) {
          console.log("filePath:", filePath);
          ctx.body = fse.createReadStream(filePath);
          ctx.attachment(fileName);
          // fileSend(ctx, newFileName, {root:dirPath});
          // console.log('ppp', ctx.path)
          fileSend(ctx, newFileName, {root: dirPath});
          console.log('Download file done.');
        } else {
          ctx.throw(400, "File not found");
        }
      }
  })} catch (error) {
    ctx.throw(500, error);
  }
});


// Search File
router.get("/files/Search/fileKeyword=:fileKeyword", async (ctx) => {
  let fileKeyword = ctx.params.fileKeyword;
  let fileInfoRecords = (await fse.readFile(recordFile, "utf-8")).split("\n");
  let fileResult = [];
  try {
    fileInfoRecords.forEach((item) => {
      if (item.includes(fileKeyword)) {
        fileResult.push(item);
      }
    });
    console.log(fileResult);
    ctx.body = fileResult;
  } catch (err) {
    console.log(err);
  }
});


app
.use(cors())
.use(router.routes())
.use(router.allowedMethods())
.listen(3000);

export default router;
