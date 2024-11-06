import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Toolbar,
  useTheme,
  Typography,
  Chip,
} from '@mui/material';
import SlideshowIcon from '@mui/icons-material/SlideshowRounded';
import { useStore } from '../../hooks/useStore';

type PresentationProps = {
  onClick: React.MouseEventHandler;
};

const sidebarWidth = 280;

const Sidebar = ({ onClick }: PresentationProps) => {
  const theme = useTheme();
  const store = useStore();
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
        <Typography variant="h6">All Presentation</Typography>
        <Chip label={Object.keys(store.store).length} size="small" />
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          '::-webkit-scrollbar': {
            width: '6px',
          },
          '::-webkit-scrollbar-track': {
            background: theme.palette.nord.white[2],
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.nord.blue[2],
            borderRadius: '10px',
            border: '3px none #ffffff',
          },
        }}
      >
        <List sx={{ p: 0 }}>
          {Object.keys(store.store).map((id) => {
            const presentation = store.store[id];
            return (
              <ListItem
                key={id}
                disablePadding
                id={`sb.${id}`}
                onClick={onClick}
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
