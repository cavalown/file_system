"use strict";
import Koa from "koa";
import Router from "koa-router";
import KoaBody from "koa-body";
import fse from "fs-extra";
import path from "path";
import config from "../config/index.js";
import { dir } from "console";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// import fileLib from "../lib/fileLib/index.js";

const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(KoaBody());

// const dirPath = path.resolve(__dirname, config.koaApi.storage.filespace);
// const recordFile = path.resolve(__dirname, config.koaApi.storage.recordpath);
const dirPath = "../../public";
const recordFile = "../config/files_record.txt";

app.use(
  KoaBody({
    multipart: true,
    urlencoded: true,
    // formLimit: "100mb",
    formidable: {
      keepExtensions: true,
      uploadDir: path.resolve(dirPath),
      multiples: true,
    },
  })
);

// Check Server
router.get("/", async (ctx) => {
  ctx.body = "Server on";
});

// Get all files
router.get("/files", async (ctx) => {
  try {
    // let fileList = await fse.readdir(dirPath);
    // console.log("All files:", fileList);
    // ctx.body = fileList;
    // console.log(recordFile);
    let fileAll = await fse.readFile(recordFile, "utf-8");
    console.log("All Files:", fileAll);
    ctx.body = fileAll;
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
  const FileTimestamp = fileInfo.lastModifiedDate;
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
  let fileList = await fse.readdir(dirPath);
  let removeFileIndex = [];
  try{
    fileInfoRecords.map((item, index, data)=>{
      if (item.includes(fileName)){
        console.log(item);
        const newFileName = item.split("||").slice(0, 1).join();
        fse.remove(path.resolve(dirPath, newFileName));
        console.log(`File: ${fileName} deleted!`);
        ctx.body = `File: ${fileName} deleted!`;
      }
    })
    let data = (await fse.readFile(recordFile, 'utf-8')).split('\n');
    for(index in removeFileIndex.reverse){
      data.splice(index);
    }
    fse.outputFile(recordFile, data, {
      flags: "w",
    });
  }catch(err){console.log(err);}
  // try {
  //   fileInfoRecords.forEach((item) => {
  //     if (item.includes(fileName)) {
  //       const newFileName = item.split("||").slice(0, 1).join();
  //       console.log("Find:", newFileName);
  //       fileList.forEach((element) => {
  //         if (element.includes(newFileName)) {
  //           fse.remove(path.resolve(dirPath, newFileName));
  //           console.log(`File: ${fileName} deleted!`);
  //           ctx.body = `File: ${fileName} deleted!`;
  //         }
  //       });
  //     } else {
  //       console.log(`File: ${fileName} not found.`);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  //   ctx.status = 400;
  // }
});


// Download file
router.get("/files/Download/fileName=:fileName", async (ctx) => {
  let fileName = ctx.params.fileName;
  let fileInfoRecords = (await fse.readFile(recordFile, "utf-8")).split("\n");
  try {
    fileInfoRecords.forEach((item) => {
      if (item.includes(fileName)) {
        const newFileName = item.split("||").slice(0, 1);
        filePath = path.resolve(dirPath, newFileName);
        if (fse.existsSync(filePath)) {
          ctx.attachment(filePath);
          fileSend(ctx, dirPath + filePath);
        } else {
          ctx.throw(400, "File not found");
        }
      }
    });
  } catch (error) {
    ctx.throw(500, error);
  }
});


// Search File
router.get("/files/Search/fileKeyword=:fileKeyword", async (ctx) => {
  let fileKeyword = ctx.params.fileKeyword;
  let fileInfoRecords = (await fse.readFile(recordFile, "utf-8")).split("\n");
  let fileResult = [];
  try {
    await fileInfoRecords.foreach((item) => {
      if (item.includes(fileKeyword)) {
        fileResult.push(item.split("||").slice(1, 2));
      }
    });
    console.log(fileResult);
  } catch (err) {
    console.log(err);
  }
});


app.use(router.routes()).use(router.allowedMethods()).listen(3000);

export default router;
