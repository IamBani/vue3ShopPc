<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    action=""
    :auto-upload="false"
    :on-change="Chang"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
type ChunkArr = {
  index: number
  chunk: Blob,
  hash:string
}
interface FileMd5 {
  hash:string
  content:ArrayBuffer
}
type Callback = ()=>void
import type { UploadFile, UploadFiles } from 'element-plus'
import SparkMD5 from 'spark-md5'
import axios from 'axios'
// import Worker from 'worker-loader!@/utils/hash.worker'
const Chang = (e: UploadFile, el: UploadFiles) => {
  cutBlob(e.raw as File)
    .then((res) => {
      getPost(res,5,()=>{
        console.log(123);
      })
      console.log(123)
    })
    .catch((err) => console.log(err))
}

// const a = ()=>{
//    const worker = new Worker()

//        worker.postMessage({file, chunkSize: this.chunkSize})

//        worker.onmessage = event => {
//          resolve(event.data)
//        }
// }

const cutBlob = (file: File, fileHash = 1, chunkSize = 100) => {
  const chunkArr: ChunkArr[] = [] // 所有切片缓存数组
  const blobSlice = File.prototype.slice
  chunkSize = chunkSize * 1024
  const chunkNums = Math.ceil(file.size / chunkSize) // 切片总数

  return new Promise<ChunkArr[]>((resolve, reject) => {
    let startIndex: number
    let endIndex: number | string | undefined
    let contentItem: Blob

    for (let i = 0; i < chunkNums; i++) {
      startIndex = i * chunkSize // 片段起点
      endIndex = (i + 1) * chunkSize // 片段尾点
      endIndex > file.size && (endIndex = file.size)

      // 切割文件
      contentItem = blobSlice.call(file, startIndex, endIndex)
      createFileMd5<FileMd5>(contentItem).then(res=>{
          chunkArr.push({
            index: i, // 当前文件片段顺序索引，一并传给后端确定顺序
            chunk: contentItem, // 当前文件片段内容
            hash:res.hash
          })
          if(chunkArr.length === chunkNums){
            resolve(chunkArr)
          }
      })
    }

    // this.fileInfo = {
    //   hash: fileHash,
    //   total: chunkNums,
    //   name: file.name,
    //   size: file.size
    // }
   
  })
}

  const createFileMd5 =<T = FileMd5>(file:Blob)=>{
    return new Promise<FileMd5>((resolve,reject)=>{
       const spark = new SparkMD5.ArrayBuffer()
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
       reader.addEventListener('loadend', () => {
          const content = reader.result as ArrayBuffer
          spark.append(content)
          const hash = spark.end()
          resolve({hash,content})
        })
      reader.addEventListener('error', function _error(err) {
          reject(err)
        })
    })
  }
  const getPost = (data:ChunkArr[],max = 6, callback:Callback) =>{
    let fetchArr:ChunkArr[] = [] 
     let toFetch = () => {
      const item = data.shift()
      if(!item){return}
      sendChunk(item)?.then(res=>{
        fetchArr.splice(fetchArr.indexOf(item as ChunkArr),1)
        toFetch()
        if(!data.length && !fetchArr.length){
          callback()
        }
      }).catch(err=>{
        //  data.unshift(item as ChunkArr) 
         console.log(err)
      })
      fetchArr.push(item)
      if(fetchArr.length>=max){
        return
      }else{
        toFetch()
      }
     }
    toFetch()
  }

  const sendChunk = (item?:ChunkArr)=> {
      if (!item) return
      let formdata = new FormData()
      formdata.append("file", item.chunk)
      formdata.append("index", `${item.index}`)
      formdata.append("hash", item.hash)
     return axios({
        url:"http://localhost:3000/api/upload/file",
        method:'post',
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
        // data: {user:123},
      })
    }
</script>

<style scoped lang="less">
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
