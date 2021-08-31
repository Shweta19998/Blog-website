import multer from "multer";
import pkg from "multer-gridfs-storage";
const { GridFsStorage } = pkg;
const storage = new GridFsStorage({
  url:
    "mongodb://user:music@blogweb-shard-00-00.xqnts.mongodb.net:27017,blogweb-shard-00-01.xqnts.mongodb.net:27017,blogweb-shard-00-02.xqnts.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-7da2wc-shard-0&authSource=admin&retryWrites=true&w=majority",
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
