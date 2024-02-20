import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Select } from "antd";
import { StyledEngineProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Selects, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typographys from "@mui/material/Typography";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/joy";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const car_list = Array.from(Array(5).keys());

export function AllCars() {
  const [make, setMake] = React.useState("");

  const handleClick = (event: SelectChangeEvent) => {
    setMake(event.target.value);
  };
  const [val, setVal] = React.useState<number>(MIN);
  const handlePrice = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };
  return (
    <div className="all_cars">
      <Container>
        <Stack className="whole_stack">
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h3>Cars Search</h3>
            <Box className={"search_big_box"}>
              <form className="search_form" action="">
                <input
                  type="search"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Search"
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                ></Button>
              </form>
            </Box>
            <Select
              showSearch
              style={{ width: 200, marginTop: "20px", marginRight: "20px" }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Recently",
                },
                {
                  value: "2",
                  label: "Most Viewed",
                },
                {
                  value: "3",
                  label: "Most Liked",
                },
              ]}
            />
          </Stack>
          <Stack className="center_cars">
            <Stack className="car_filtering">
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div className="vertical_line"></div>
                <div className="line_near">Search By Filter</div>
              </Stack>
              <StyledEngineProvider injectFirst>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Make</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={10}>BMW</MenuItem>
                    <MenuItem value={20}>Audi</MenuItem>
                    <MenuItem value={30}>KIA</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Transmission
                  </InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={1}>AutoMative</MenuItem>
                    <MenuItem value={2}>Manual</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Petrol Type
                  </InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={3}>Gasoline</MenuItem>
                    <MenuItem value={4}>Dizel</MenuItem>
                    <MenuItem value={5}>Gas</MenuItem>
                    <MenuItem value={6}>Hybrid</MenuItem>
                    <MenuItem value={7}>Electric</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Color</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={8}>White</MenuItem>
                    <MenuItem value={9}>Black</MenuItem>
                    <MenuItem value={11}>Red</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Year</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={12}>2024</MenuItem>
                    <MenuItem value={13}>2023</MenuItem>
                    <MenuItem value={14}>2022</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Body Type
                  </InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={make}
                    label="Make"
                    onChange={handleClick}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={15}>Sedan</MenuItem>
                    <MenuItem value={16}>SUV</MenuItem>
                    <MenuItem value={17}>CrossOver</MenuItem>
                  </Selects>
                </FormControl>
              </StyledEngineProvider>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div className="vertical_line"></div>
                <div className="line_near">By Price</div>
              </Stack>
              <Box sx={{ width: 250 }}>
                <Slider
                  marks={marks}
                  step={10}
                  value={val}
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  onChange={handlePrice}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typographys
                    variant="body2"
                    onClick={() => setVal(MIN)}
                    sx={{ cursor: "pointer" }}
                  >
                    {MIN} min
                  </Typographys>
                  <Typographys
                    variant="body2"
                    onClick={() => setVal(MAX)}
                    sx={{ cursor: "pointer" }}
                  >
                    {MAX} max
                  </Typographys>
                </Box>
              </Box>
            </Stack>
            <Stack flexDirection={"column"} sx={{width:"100%"}}>
              {car_list.map((ele) => {
                return (
                  <Stack className="car_box">
                    <Box
                      className="car_size"
                      sx={{ backgroundImage: `url(/cars/top_car.webp)` }}
                    >
                        <div className="car_condition">Featured</div>
                    </Box>
                    <Stack className="right_desc">
                        <div className="right_above">
                            <h4>Toyota Highlander 2000</h4>
                            <Box className="serdechka">
                                <img src="/icons/heart.svg" style={{fill:"red"}} alt="" />
                            </Box>
                            <p>$54,000</p>
                        </div>
                        <Stack className="all_feature">
                            <Stack className="every_aspect">
                                <img src="/icons/gasoline.svg" alt="" />
                                <p>18/100</p>
                            </Stack>
                            <Stack className="every_aspect">
                                <img src="/icons/dashboard.svg" alt="" />
                                <p>1500cc</p>
                            </Stack>
                            <Stack className="every_aspect">
                                <img src="/icons/gearbox.svg" alt="" />
                                <p>Manual</p>
                            </Stack>
                            <Stack className="every_aspect">
                                <img src="/icons/location.svg" alt="" />
                                <p>Manchester</p>
                            </Stack>
                        </Stack>
                        <Stack className="right_bottom">
                            <div className="detail_button" >View in Detail</div>
                            <Stack flexDirection={"row"}>
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: "md",
                              color: "text.secondary",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            100{" "}
                            <VisibilityIcon
                              sx={{ fontsize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Box sx={{ width: 2, bgcolor: "divider" }} />
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: "md",
                              color: "text.secondary",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <div>50</div>
                            <Favorite
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                        </Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack className="bottom_box">
            
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"primary"}
                />
              )}
            />
            
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
