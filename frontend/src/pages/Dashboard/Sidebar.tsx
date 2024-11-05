import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  useTheme,
} from '@mui/material';

type PresentationProps = {
  items: Array<string>;
  onClick: React.MouseEventHandler;
};

const sidebarWidth = 300;

const Sidebar = ({ items, onClick }: PresentationProps) => {
  const theme = useTheme();
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
          {items.map((item) => {
            return (
              <ListItem
                key={item}
                disablePadding
                id={`sb-${item}`}
                onClick={onClick}
              >
                <ListItemButton>
                  <ListItemText primary={item} />
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
