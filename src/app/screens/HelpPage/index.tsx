import { Box, Container, Stack } from "@mui/material";
import React from "react";
import "../../../css/help.css";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Tablist from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function HelpPage() {
  // INITIALIZATIONS
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question:
        "CAN I SELL MY CAR HERE EVEN IF I DON'T BUY A NEW ONE FROM YOU?",
      answer:
        "Yes! We are happy to buy your vehicle even if you don't plan on buying from us. You can even value your trade right on our website.",
    },
    {
      question: "CAN I APPLY FOR FINANCING ONLINE?",
      answer:
        " Yes! we have both new and used vehicles for sale. You can shop our inventory online!",
    },
    {
      question: "CAN I SEE HOW MUCH MY VEHICLE IS WORTH?",
      answer:
        "Yes! You can see how much your vehicle is worth with our value your trade tool online. ",
    },
    {
      question: "DO YOU OFFER NEW VEHICLE SPECIALS?",
      answer:
        "Yes! You can visit our specials page to find out more about current specials.",
    },
    {
      question: " DO YOU SELL BOTH NEW AND USED CARS?",
      answer: "Yes! In Procar.uz we sell both new and used cars!",
    },
    {
      question: "WHAT SHOULD I LOOK FOR WHEN TEST DRIVING A CAR?",
      answer:
        "Our team recommends making a checklist that includes features that will be beneficial for you and your driving experience. Some features to keep in mind are comfort, functionality, and technology, as well as overall driving experience. Creating a list of things to make note of when test driving a car, will help you get a better sense of whether the model matches your driving style and buying criteria.",
    },
    {
      question: "WHAT CAN I DO IF YOU DON'T HAVE THE CAR I'M LOOKING FOR?",
      answer:
        " If we don't have the vehicle you're looking for, you can pre-order it with us! You can pre-order a vehicle online or call us for more information. ",
    },
    {
      question:
        " I'M IN THE MARKET FOR A NEW CAR BUT I'M NOT SURE WHICH VEHICLE IS BEST FOR MY LIFESTYLE. CAN YOU HELP?",
      answer:
        "Yes! Not only is our sales team trained to help buyers find the perfect fit we also have a section on our website dedicated to vehicle reviews and competitors comparisons to help guide buyers. Feel free to check those out or contact our team for assistance!",
    },
    {
      question: "What’s the total cost of the car?",
      answer:
        "The total cost of the car includes the purchase price, taxes, fees, and any other add-ons you choose (such as extended warranties or accessories). It’s important to understand the total cost of the car before making a purchase so you can budget accordingly. Not sure what your budget is? Let our finance team help!",
    },
    {
      question: "Can I test drive the car?",
      answer:
        "Absolutely! Test driving a car is an important part of the car-buying process. It allows you to get a feel for the car’s performance and features and decide if it’s the right fit for you. Any of our Product Specialists would love to help you schedule a test drive and answer any questions you may have about the car.",
    },
  ];
  const rules = [
    `You must register to use the site to make orders and use live chats`,
    `It is not possible to cancel your orders after you have paid for them in full, so please check before making payments.`,
    `The use of obscene words during live communication is strictly prohibited`,
    `The use of obscene words during live communication is strictly prohibited`,
    `Your articles should not go beyond the bounds of decency`,
    `Please respect our requests as all your actions are under the control of our admins`,
  ];
  // HANDLERS
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                style={{ display: "flex", justifyContent: "space-between" }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Rules" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Contact us" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className="help_main_content">
              <TabPanel value={"1"}>
                <Stack className="theRules_box">
                  <Box className={"theRulesFrame"}>
                    {rules.map((ele, number) => {
                      return <p>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className="accordian_menu">
                  {faq.map((ele, number) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panelia-content"
                          id="panelia-header"
                        >
                          <Typography>{ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value="3">
                <Stack className="admin_letter_box">
                  <Stack className="admin_letter_container">
                    <Stack className="contact_box">
                      <Box className="inner_box">
                        <span>+821056817724</span>
                      </Box>
                      <Box className="inner_box2">
                        <span>382, Gangnam-daero,Gangnam-gu, Seoul</span>
                      </Box>
                      <Box className="inner_box3">
                        <span>
                          Moday - Friday <br />
                          09:00 AM - 05:00 PM
                        </span>
                      </Box>
                    </Stack>
                    <Box className={"admin_letter_frame"}>
                      <span>Send Message to Admin</span>
                    </Box>
                    <form
                      action="#"
                      method="POST"
                      className="admin_letter_frame"
                    >
                      <div className="admin_input_box">
                        <label htmlFor="">Name</label>
                        <input type="text" name="mb_nick" placeholder="Name" />
                      </div>
                      <div className="admin_input_box">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="text"
                          name="mb_email"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="admin_input_box">
                        <label htmlFor="">Message</label>
                        <textarea name="mb_msg" placeholder="Text"></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
