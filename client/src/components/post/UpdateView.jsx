import {
  Box,
  Button,
  makeStyles,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useState, useEffect } from "react";
import { getPost, updatePost, uploadFile } from "../../service/api";
import { useHistory } from "react-router-dom";

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
  form: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    flex: 1,
    margin: "0 30px",
    fontSize: 20,
  },
  create: {
    backgroundColor: "black",
    color: "white",
    width: "10%",
    margin: 20,
    "&:hover": {
      color: "black",
      fontSize: 17,
    },
  },
  textarea: {
    width: "100%",
    marginTop: 50,
    border: "none",
    fontSize: 17,
    "&:focus-visible": { outline: "none" },
  },
}));

const initialValues = {
  title: "",
  description: "",
  picture: "",
  username: "shweta_gupta",
  categories: "All",
  createdDate: new Date(),
};

const UpdateView = ({ match }) => {
  const classes = useStyles();

  const history = useHistory();

  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const url = post.picture
    ? post.picture
    : "https://www.jimdo.com/static/7f58e83e14a16db25da8e56995f710b8/62acc/hero.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const image = await uploadFile(data);
        post.picture = image.data;
      }
    };
    getImage();
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlog = async () => {
    await updatePost(match.params.id, post);
    history.push(`/details/${match.params.id}`);
  };

  return (
    <Box className={classes.container}>
      <img className={classes.image} src={url} alt="banner"></img>
      <FormControl className={classes.form}>
        <label htmlFor="img_id">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="img_id"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputBase
          className={classes.text}
          placeholder="Title"
          value={post.title}
          name="title"
          onChange={(e) => handleChange(e)}
        />
        <Button
          onClick={() => updateBlog()}
          variant="contained"
          size="large"
          className={classes.create}
        >
          Update
        </Button>
      </FormControl>
      <TextareaAutosize
        rowsMin={5}
        placeholder="Tell your Story..."
        className={classes.textarea}
        value={post.description}
        name="description"
        onChange={(e) => handleChange(e)}
      />
    </Box>
  );
};

export default UpdateView;
