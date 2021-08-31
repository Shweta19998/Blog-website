import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: 30,
    borderRadius: 10,
    border: "1px solid black",
    height: 350,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    "&>*": {
      padding: "0 5px 5px 5px",
    },
  },
  image: {
    borderRadius: "10px 10px 0 0",
    height: 150,
    width: "100%",
    objectFit: "cover",
  },
  text: {
    color: "#878787",
    fontSize: 13,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Uchen",
  },
  detail: {
    fontSize: 14,
    wordBreak: "break-word",
    fontFamily: "Uchen",
  },
});

const Post = ({ post }) => {
  const classes = useStyles();
  const url =
    post.picture ||
    "https://blog.hubspot.com/hs-fs/hub/53/file-1983250087-jpeg/pictures-in-blog-post.jpeg";
  return (
    <>
      <Box className={classes.container}>
        <img className={classes.image} src={url} alt="blog-img"></img>
        <Typography className={classes.text}>{post.categories}</Typography>
        <Typography className={classes.heading}>{post.title}</Typography>
        <Typography className={classes.text}>
          Author name: {post.username}
        </Typography>
        <Typography className={classes.detail}>{post.description}</Typography>
      </Box>
    </>
  );
};
export default Post;
