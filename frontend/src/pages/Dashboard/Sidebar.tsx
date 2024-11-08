import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Toolbar,
  Typography,
  Chip,
} from '@mui/material';
import SlideshowIcon from '@mui/icons-material/SlideshowRounded';
import { useStore } from '../../hooks/useStore';

type SidebarProps = {
  onClick: (id: string) => void;
};

const sidebarWidth = 280;

const Sidebar = ({ onClick }: SidebarProps) => {
  const store = useStore();

  const ids = Object.keys(store.store);
  // sort id by created time, the newest will be at the top
  ids.sort((a, b) => store.store[b].createAt - store.store[a].createAt);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          sm: 'none',
          xs: 'none',
          md: 'block',
        },
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Typography variant="h6">All Presentations</Typography>
        <Chip label={Object.keys(store.store).length} size="small" />
      </Box>
      <Box
        sx={{
          overflow: 'auto',
        }}
      >
        <List sx={{ p: 0 }}>
          {ids.map((id) => {
            const presentation = store.store[id];
            return (
              <ListItem
                key={id}
                disablePadding
                id={`sb.${id}`}
                onClick={() => onClick(id)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SlideshowIcon />
                  </ListItemIcon>
                  <ListItemText primary={presentation.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
