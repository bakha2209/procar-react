import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Select } from "antd";
import { StyledEngineProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Selects, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typographys from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/joy";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Car } from "../../../types/car";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetCars } from "./slice";
import { retrieveTargetCars } from "./selector";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarSearchObj, SearchObj } from "../../../types/others";
import CarApiService from "../../apiServices/carApiService";
import { serverApi } from "../../lib/config";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetCars: (data: Car[]) => dispach(setTargetCars(data)),
});

// REDUX SELECTOR
const targetCarsRetriever = createSelector(
  retrieveTargetCars,
  (targetCars) => ({
    targetCars,
  })
);

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

export function AllCars(props: any) {
  /**INITIALIZATIONS */
  const history = useHistory();
  const { setTargetCars } = actionDispatch(useDispatch());
  const { targetCars } = useSelector(targetCarsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<CarSearchObj>({
    page: 1,
    limit: 5,
    order: "createdAt",
  });
  const [carRebuild, setCarRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const carService = new CarApiService();
    carService
      .getTargetCars(targetSearchObject)
      .then((data) => setTargetCars(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject, carRebuild]);
  const [clicked, setClicked] = useState(false);
  /**HANDLERS */
  const chosenCarHandler = (id: string) => {
    history.push(`/dealer/cars/${id}`);
  };
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "car",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setCarRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const refs: any = useRef([]);
  const [make, setMake] = React.useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
            <Box marginTop={"20px"}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  style={{
                    backgroundColor: clicked ? "red" : "white",
                  }}
                  onClick={() => searchHandler("car_views")}
                >
                  Popular
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? "red" : "white",
                  }}
                  onClick={() => searchHandler("createdAt")}
                >
                  Recent
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? "red" : "white",
                  }}
                  onClick={() => searchHandler("car_likes")}
                >
                  Most Liked
                </Button>
              </ButtonGroup>
            </Box>
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
            <Stack flexDirection={"column"} sx={{ width: "100%" }}>
              {targetCars.map((car: Car) => {
                const image_path = `${serverApi}/${car.car_images[0]}`;
                return (
                  <Stack className="car_box">
                    <Box
                      className="car_size"
                      sx={{ backgroundImage: `url(${image_path})` }}
                    >
                      <div className="car_condition">
                        {car.car_discount > 0 ? -car.car_discount : "Featured"}
                      </div>
                    </Box>
                    <Stack className="right_desc">
                      <div className="right_above">
                        <h4>
                          {car.car_brand} {car.car_name} {car.car_model}
                        </h4>
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                          id={car?._id}
                          onClick={targetLikeProduct}
                          checked={
                            car?.me_liked && car?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                        />
                        <p>
                          $
                          {Math.round(
                            car.car_price -
                              car.car_price * (car.car_discount / 100)
                          )}
                        </p>
                      </div>
                      <Stack className="all_feature">
                        <Stack className="every_aspect">
                          <img src="/icons/gasoline.svg" alt="" />
                          <p>{car.petrol_consumption}/100</p>
                        </Stack>
                        <Stack className="every_aspect">
                          <img src="/icons/dashboard.svg" alt="" />
                          <p>{car.acceleration}cc</p>
                        </Stack>
                        <Stack className="every_aspect">
                          <img src="/icons/gearbox.svg" alt="" />
                          <p>{car.car_transmission}</p>
                        </Stack>
                        <Stack className="every_aspect">
                          <img src="/icons/location.svg" alt="" />
                          <p>Seoul</p>
                        </Stack>
                      </Stack>
                      <Stack className="right_bottom">
                        <div
                          className="detail_button"
                          onClick={() => chosenCarHandler(car._id)}
                        >
                          View in Detail
                        </div>
                        <div
                          className="detail_button"
                          onClick={(e) => {
                            props.onAdd(car);
                            e.stopPropagation();
                          }}
                        >
                          Add to Cart
                        </div>
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
                            {car.car_views}{" "}
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
                            <div>{car.car_likes}</div>
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
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
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
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
