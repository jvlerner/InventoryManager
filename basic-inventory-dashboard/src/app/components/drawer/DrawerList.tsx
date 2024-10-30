import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
interface DrawerConfigListProps {
  open: boolean; // Accepting open state as a prop
}

// Define the button items with their respective icons and labels
const buttons = [
  { text: "Inicio", icon: <InboxIcon />, url: "/" },
  { text: "Categorias", icon: <MailIcon />, url: "/categorias" },
  { text: "Produtos", icon: <InboxIcon />, url: "/produtos" },
];

export default function DrawerConfigList({ open }: DrawerConfigListProps) {
  return (
    <List
      sx={{
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {buttons.map((button) => (
        <ListItem key={button.text} disablePadding sx={{ display: "flex" }}>
          <ListItemButton
            component={Link} 
            href={button.url}
            sx={[
              { minHeight: 48, px: 2.5 },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {button.icon}
            </ListItemIcon>
            <ListItemText
              primary={button.text}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}