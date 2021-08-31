import { Box, makeStyles, Typography } from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, deletePost } from "../../service/api";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 6rem",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },

  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  icons: {
    float: "right",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 10,
    },
  },
  icon: {
    //color: "grey",
    margin: 5,
    border: "1px solid #878787",
    borderRadius: 10,
    padding: 5,
  },
  heading: {
    fontSize: 38,
    fontWeight: 600,
    textAlign: "center",
    margin: "30px 10px",
  },
  subheading: {
    color: "#878787",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      paddingLeft: 10,
    },
    margin: "20px 0",
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 10,
    },
  },
  author: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const DetailView = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = useState({});

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await deletePost(post._id);
    history.push("/");
  };

  return (
    <Box className={classes.container}>
      <img className={classes.image} src={url} alt="banner" />
      <Box className={classes.icons}>
        <Link to={`/update/${post._id}`}>
          <EditTwoToneIcon
            fontSize="large"
            color="primary"
            className={classes.icon}
          />
        </Link>
        <DeleteForeverRoundedIcon
          fontSize="large"
          color="error"
          className={classes.icon}
          onClick={() => deleteBlog()}
        />
      </Box>
      <Typography className={classes.heading}>{post.title}</Typography>

      <Box className={classes.subheading}>
        <Link to={`/?username=${post.username}`} className={classes.author}>
          <Typography style={{ fontWeight: 600 }}>
            Author: {post.username}
          </Typography>
        </Link>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Box>
      <Typography className={classes.content}>{post.description}</Typography>
    </Box>
  );
};

export default DetailView;
