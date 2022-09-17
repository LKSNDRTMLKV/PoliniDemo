import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { MyButton, MyTypography } from '../../custom/previewComponents';

const MobileMenu = ({ menuItems, adminItems, user, toggleMenu }) => {

    const [expandedAccordion, setExpandedAccordion] = useState(false);

    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    }

    return (
        <Box sx={{}}>
            {menuItems.map((category, idx) => {
                return (
                    <Accordion
                        key={idx}
                        expanded={expandedAccordion === `panel${idx}`}
                        onChange={handleAccordionChange(`panel${idx}`)}
                        sx={{ paddingRight: 2 }}
                    >
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${idx}bh-content`}
                            id={`panel${idx}bh-header`}

                        >

                            <MyTypography variant="h5" text={category.name} />

                        </AccordionSummary>
                        <AccordionDetails>
                            {category.items && category.items.map((sub, subI) => {
                                return (
                                    <Link key={subI} to={sub.path}>
                                        <MyButton
                                            color="toggledPrimarySecondary"
                                            onClick={toggleMenu}
                                            text={sub.name} />
                                    </Link>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            })
                //     }) : adminItems.map((section, idx) =>
                //     (<Accordion key={idx}
                //         expanded={expandedAccordion === `panel${idx}`}
                //         onChange={handleAccordionChange(`panel${idx}`)}
                //         sx={{ paddingRight: 2 }}
                //     >
                //         <AccordionSummary

                //             expandIcon={<ExpandMoreIcon />}
                //             aria-controls={`panel${idx}bh-content`}
                //             id={`panel${idx}bh-header`}
                //         >
                //           <MyTypography variant="h5" section="admin_header" element={section.name} />

                //         </AccordionSummary>

                //         <AccordionDetails>
                //             {section.items && section.items.map((sub,subI) => (
                //                 <Link to={sub.path} key={subI}>
                //                     <MyButton 
                //                     color="toggledPrimarySecondary" 
                //                     onClick={toggleMenu} 
                //                     section="admin_header"
                //                     element={sub.name}/>
                //                 </Link>
                //             ))}
                //         </AccordionDetails>

                //     </Accordion>
                //     ))

            }

        </Box>

    );
};

export default MobileMenu;