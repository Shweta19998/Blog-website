import {
  Button,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { categories } from "../../constants/data";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  create: {
    backgroundColor: "black",
    color: "white",
    width: "90%",
    margin: 20,
    "&:hover": {
      color: "black",
      fontSize: 17,
    },
  },
  table: {
    border: "1px solid rgba(224,224,224,1)",
    margin: 20,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});
const Categories = () => {
  const classes = useStyles();
  return (
    <>
      <Link to="/create" className={classes.link}>
        <Button variant="contained" size="large" className={classes.create}>
          CREATE BLOG
        </Button>
      </Link>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to={`/`} className={classes.link}>
                All Categories
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow>
              <TableCell>
                <Link to={`/?category=${category}`} className={classes.link}>
                  {category}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Categories;
