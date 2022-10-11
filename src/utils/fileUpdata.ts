// import Worker from 'worker-loader!@/utils/hash.worker'

// export const createFileMd5 =()=>{
//   return new Promise((resolve) => {
//        const worker = new Worker()

//        worker.postMessage({file, chunkSize: this.chunkSize})

//        worker.onmessage = event => {
//          resolve(event.data)
//        }
//      })
// }