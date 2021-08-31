import { makeStyles, Box, Typography } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles({
  image: {
    background: `url(${"https://www.hallaminternet.com/wp-content/uploads/2020/01/Is-blogging-relevant-anymore.jpeg"}) center/55% repeat-x #000`,
    width: "100%",
    height: "50vh",
  },
});

const Banner = () => {
  const classes = useStyles();

  return <Box className={classes.image}></Box>;
};
export default Banner;
