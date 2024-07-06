import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import HomeIcon from "@mui/icons-material/Home";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
const routes = [
  {
    path: "/",
    content: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/service",
    content: "Service",
    icon: <LocalPostOfficeIcon />,
  },
  {
    path: "/orders",
    content: "Orders",
    icon: <BookOnlineIcon />,
  },
];

export default routes;
