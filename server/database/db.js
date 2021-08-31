import mongoose from "mongoose";

const Connection = async () => {
  try {
    const URL = `mongodb://user:music@blogweb-shard-00-00.xqnts.mongodb.net:27017,blogweb-shard-00-01.xqnts.mongodb.net:27017,blogweb-shard-00-02.xqnts.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-7da2wc-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Databse connected successfully");
  } catch (error) {
    console.log("error while connecting to mongodb", error);
  }
};

export default Connection;
