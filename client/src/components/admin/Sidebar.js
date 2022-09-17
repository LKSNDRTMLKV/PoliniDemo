import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid, Modal } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { MyButton, MyTextField, MyTypography } from '../custom/previewComponents';

const Sidebar = ({ adminItems, toggleAdminMenu }) => {
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    
    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    }

    
    // const MyModal =
    //     <Modal
    //         open={updateModal}
    //         onClose={() => setUpdateModal(prevState => !prevState)}
    //     >
    //         <MyTextField
    //             label="Product ID"
    //             name="product_id"
    //             value={productId}
    //             onChange={(e) => setProductId(e.target.value)}
    //         />
    //         <Link to="/">
    //         </Link>
    //     </Modal>

    return (
        adminItems.map((section, idx) => (
            <Accordion key={idx}
                expanded={expandedAccordion === `panel${idx}`}
                onChange={handleAccordionChange(`panel${idx}`)}
                sx={{ paddingRight: 2 }}
            >
                <AccordionSummary

                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${idx}bh-content`}
                    id={`panel${idx}bh-header`}
                    sx={{ alignItems: "center" }}
                >
                    <Box sx={{ mt: 1, mr: 1 }}>
                        {section.icon}
                    </Box>

                    <MyTypography variant="h5" section="admin_header" element={section.name} />

                </AccordionSummary>

                <AccordionDetails>
                    {section.items && section.items.map((sub, subI) =>
                   
                        (
                            <Link to={sub.path} key={subI}>
                                <MyButton
                                    color="toggledPrimarySecondary"
                                    onClick={toggleAdminMenu}
                                    section="admin_header"
                                    element={sub.name} />
                            </Link>
                        )
                    )}
                </AccordionDetails>

            </Accordion>
        ))
    )

    // adminItems.map((section, idx) => {
    //     return (
    //         <Accordion key={idx}
    //             expanded={expandedAccordion === `panel${idx}`}
    //             onChange={handleAccordionChange(`panel${idx}`)}
    //             sx={{ paddingRight: 2 }}
    //         >
    //             <AccordionSummary

    //                 expandIcon={<ExpandMoreIcon />}
    //                 aria-controls={`panel${idx}bh-content`}
    //                 id={`panel${idx}bh-header`}
    //             >
    //                 <MyTypography variant="h5" section="admin_header" element={section.name} />

    //             </AccordionSummary>

    //             <AccordionDetails>
    //                 {section.items && section.items.map((sub, subI) => (
    //                     <Link to={sub.path} key={subI}>
    //                         <MyButton
    //                             color="toggledPrimarySecondary"
    //                             onClick={toggleAdminMenu}
    //                             section="admin_header"
    //                             element={sub.name} />
    //                     </Link>
    //                 ))}
    //             </AccordionDetails>

    //         </Accordion>
    //     )
    // })




};

export default Sidebar;