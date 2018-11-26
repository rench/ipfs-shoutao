const ipfsAPI = require('ipfs-api')

const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

function addFile(path) {
  ipfs.util.addFromFs(
    path,
    { recursive: true, ignore: ['subfolder/to/ignore/**'], hidden: false },
    (err, result) => {
      console.log(result)
    })
}
function catFile(hash) {
  ipfs.cat(hash, (err, result) => {
    if (err) return console.log(err)
    console.log(result.toString('utf-8'))
  })
}

function get(hash) {
  ipfs.get(hash, (err, result) => {
    if (err) return console.log(err)
    if (result.length > 1) {
      console.log('is dir')
      var i = 0
      result.forEach(element => {
        if (i++ != 0) {
          console.log('file -> ' + element.path)
        }
      });
    } else if (result.length > 0) {
      console.log('is file')
      console.log('file -> ' + result[0].path)
    }
  });
}

//addFile('./index.js')
//addFile('./package.json')
//catFile('QmfY4xvJx7CdfpQjQZ6CgePvXZEFvbbNKmVpjkW5WxCR5K')
//get('QmfY4xvJx7CdfpQjQZ6CgePvXZEFvbbNKmVpjkW5WxCR5K')
//get('QmQBPSG8nrSPqk5toLrGzwmU1fKu45tWthCyvj7Y25stgv')
addFile('./index.js')