import { useState, useEffect } from "react";
import {
  Box,
  Button,
  makeStyles,
  FormControl,
  InputBase,
  TextareaAutosize,
  getLuminance,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
import { createPost, uploadFile } from "../../service/api";

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
  textfield: {
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
    [theme.breakpoints.down("md")]: {
      width: "100px",
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

const CreateView = () => {
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

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    await createPost(post);
    history.push("/");
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
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
          className={classes.textfield}
        />
        <Button
          onClick={() => savePost()}
          variant="contained"
          size="large"
          className={classes.create}
        >
          Publish
        </Button>
      </FormControl>
      <TextareaAutosize
        minRows={5}
        placeholder="Tell your story..."
        className={classes.textarea}
        name="description"
        onChange={(e) => handleChange(e)}
      />
    </Box>
  );
};

export default CreateView;
