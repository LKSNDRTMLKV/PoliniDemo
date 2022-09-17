import React,{useState} from 'react';
import { Box, Button, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { MyButton } from '../../custom/previewComponents';

const Menu = ({menuItems, adminItems, user, toggleMenu}) => {

    const handlePopoverOpen = (e, idx) => {
        setAnchorEl({ anchor: e.currentTarget, idx: idx });
        console.log(anchorEl.anchor)
    }
    const handlePopoverClose = () => {
        setAnchorEl({ anchor: null, idx: null });
    };

    const [anchorEl, setAnchorEl] = useState({
        open: false,
        anchor: null,
        idx: null,
    });

    const openPopover = Boolean(anchorEl);

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mx: "auto", }}>

        {menuItems && menuItems.map((category, idx) => {
            if (category.items) {
                return (
                    <Box key={category.name} sx={{}}>
                        <Button color="toggledSuccess"
                            onClick={(e) => handlePopoverOpen(e, idx)}
                            sx={{ p: 1.5, mx: 1 }}
                        >
                            {category.name}
                            
                        </Button>
                        <Popover

                            open={anchorEl.idx === idx}
                            anchorEl={anchorEl.anchor}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}

                            sx={{ position: "absolute", top: 12, left: 0, maxWidth: "80%" }}
                        >
                            <Box sx={{ p: 2, display: 'flex', flexWrap: "wrap", mr: 0 }}>
                                {category.items.map((sub, subIdx) => (
                                    <Link key={sub.name} to={sub.path}>
                                        
                                        <Button
                                            color="toggledSuccess"
                                            variant="outlined"
                                            sx={{ m: 1 }}
                                            onClick={handlePopoverClose}
                                        >
                                            {sub.name}
                                        </Button>
                                    </Link>

                                ))}

                            </Box>
                        </Popover>
                    </Box>
                )
            }
            else {
                return (
                    <Button key={category.name} color="toggledSuccess">{category.name}</Button>
                )
            }})
        // }) : adminItems.map((section, idx) =>

        // (
        //     <Box key={idx}>
        //            {/* <Button color="toggledSuccess"
        //                     onClick={(e) => handlePopoverOpen(e, idx)}
        //                     sx={{ p: 1.5, mx: 1 }}
        //                 >
        //                     {section.name}
        //                 </Button> */}
        //                 <MyButton 
        //                 color="toggledSuccess"
        //                 onClick={(e) => handlePopoverOpen(e, idx)}
        //                 sx={{ p: 1.5, mx: 1 }}
        //                 section="admin_header"
        //                 element={section.name}
        //                 />
        //         <Popover

        //             open={anchorEl.idx === idx}
        //             anchorEl={anchorEl.anchor}
        //             onClose={handlePopoverClose}
        //             anchorOrigin={{
        //                 vertical: 'bottom',
        //                 horizontal: 'left',
        //             }}

        //             sx={{ position: "absolute", top: 12, left: 0, maxWidth: "80%" }}>
        //             <Box sx={{ p: 2, display: 'flex', flexWrap: "wrap", mr: 0 }}>
        //                 {section.items.map((sub, subI) => (
        //                     <Link key={subI} to={sub.path}>

                                
        //                         <MyButton
        //                             color="toggledSuccess"
        //                             variant="outlined"
        //                             sx={{ m: 1 }}
        //                             section="admin_header"
        //                             element={sub.name}
        //                         />
                                    
        //                     </Link>

        //                 ))}

        //             </Box>
        //         </Popover>
        //     </Box>
        // )
        // )
        }

    </Box>
    );
};

export default Menu;