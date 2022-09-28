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
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
    :on-change="onChang"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
  </el-upload>
</template>

<script lang="ts" setup>
type ChunkArr = {
  index?: number
  chunk?: Blob
}
import type { UploadFile, UploadFiles } from 'element-plus'
import SparkMD5 from 'spark-md5'
import axios from 'axios'
const onChang = (e: UploadFile, el: UploadFiles) => {
  console.log(e, el)
  cutBlob(e.raw as File)
    .then((res) => {
      console.log(res)
      
    })
    .catch((err) => console.log(err))
}

const cutBlob = (file: File, fileHash = 1, chunkSize = 100) => {
  const chunkArr: ChunkArr[] = [] // 所有切片缓存数组
  const blobSlice = File.prototype.slice
  chunkSize = chunkSize * 1024
  const chunkNums = Math.ceil(file.size / chunkSize) // 切片总数

  return new Promise((resolve, reject) => {
    let startIndex: number
    let endIndex: number | string | undefined
    let contentItem: Blob

    for (let i = 0; i < chunkNums; i++) {
      startIndex = i * chunkSize // 片段起点
      endIndex = (i + 1) * chunkSize // 片段尾点
      endIndex > file.size && (endIndex = file.size)

      // 切割文件
      contentItem = blobSlice.call(file, startIndex, endIndex)
      createFileMd5(contentItem).then(res=>{
        console.log(res);
      })
      chunkArr.push({
        index: i, // 当前文件片段顺序索引，一并传给后端确定顺序
        chunk: contentItem, // 当前文件片段内容
      })
    }

    // this.fileInfo = {
    //   hash: fileHash,
    //   total: chunkNums,
    //   name: file.name,
    //   size: file.size
    // }
    resolve(chunkArr)
  })
}
 const createFileMd5 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
       reader.addEventListener('loadend', () => {
          const content = reader.result as ArrayBuffer
          console.log(spark);
          spark.append(content)
          const hash = spark.end()
          resolve({hash, content})
        })
        
        reader.addEventListener('error', function _error(err) {
          reject(err)
        })
    })
  }
  const getPost = () =>{
    axios.post("http:localhost:3000/api/upload/file",{

    }).then(res=>{
      console.log(res);
    }).catch(err=>console.log(err))
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
