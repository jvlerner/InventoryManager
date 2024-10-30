import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AssessmentIcon from "@mui/icons-material/Assessment";

interface DrawerConfigListProps {
  open: boolean;
}

const buttons = [
  { text: "Inicio", icon: <HomeIcon />, url: "/" },
  { text: "Categorias", icon: <TurnedInIcon />, url: "/categorias" },
  { text: "Produtos", icon: <InventoryIcon />, url: "/produtos" },
  { text: "Saídas", icon: <UnarchiveIcon />, url: "/saidas" },
  { text: "Entradas", icon: <ArchiveIcon />, url: "/entradas" },
  { text: "Relatório", icon: <AssessmentIcon />, url: "/relatorios" },
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
            aria-label={button.text}
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
