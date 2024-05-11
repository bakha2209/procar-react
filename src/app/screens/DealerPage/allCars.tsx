import { Box, Container, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Select } from 'antd'
import { StyledEngineProvider } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Selects, { SelectChangeEvent } from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Typographys from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Typography } from '@mui/joy'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Car } from '../../../types/car'
import { createSelector } from '@reduxjs/toolkit'
import { Dispatch } from '@reduxjs/toolkit'
import { setTargetCars } from './slice'
import { retrieveTargetCars } from './selector'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CarSearchObj, SearchObj } from '../../../types/others'
import CarApiService from '../../apiServices/carApiService'
import { serverApi } from '../../lib/config'
import Checkbox from '@mui/material/Checkbox'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import assert from 'assert'
import { verifiedMemberData } from '../../apiServices/verify'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import { car_brands, car_colors, car_types, car_year, petrol_types } from '../../components/filter_configs'

const MAX = 150000
const MIN = 1000
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
]

export function AllCars(props: any) {
  /**INITIALIZATIONS */
  const { targetCars, setTargetCars, targetSearchObject, setTargetSearchObject, orderRebuild, setOrderRebuild } = props
  const history = useHistory()
  const refs: any = useRef([])
  const [make, setMake] = React.useState('')
  const [transmission, setTransmission] = React.useState('')
  const [petrol, setPetrol] = React.useState('')
  const [color, setColor] = React.useState('')
  const [year, setYear] = React.useState()
  const [type, setType] = React.useState('')
  const [price, setPrice] = React.useState<number>(MIN)

  useEffect(() => {
    const carService = new CarApiService()
    carService
      .getTargetCars(targetSearchObject)
      .then(data => setTargetCars(data))
      .catch(err => console.log(err))
  }, [targetSearchObject, orderRebuild])
  const [clicked, setClicked] = useState(false)
  /**HANDLERS */
  const handleInputChange = (event: any) => {
    //window.scrollTo(1000, 0);

    // setSearchValue(event.target.value);
    const carService = new CarApiService()

    carService
      .getTargetProductsBySearch(event.target.value)
      .then(data => setTargetCars(data))
      .catch(err => console.log(err))

    // setProductRebuild(new Date());
  }
  const chosenCarHandler = (id: string) => {
    history.push(`/dealer/cars/${id}`)
    window.scrollTo(0,500)
  }
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1
    targetSearchObject.order = category
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_make = (e: any) => {
    const selectedMake = e.target.value;
    const updatedSearchObject = {
      ...targetSearchObject,
      page: 1,
      car_brand: selectedMake
    };
    const updatedMake = selectedMake === "" ? "All" : selectedMake;
    setMake(updatedMake);
    setTargetSearchObject(updatedSearchObject);
  };
  const searchHandler_trans = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_transmission = e.target.value
    setTransmission(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_color = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_color = e.target.value
    setColor(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_engine = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_engine_type = e.target.value
    setPetrol(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_type = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_type = e.target.value
    setType(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_year = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.produced_year = e.target.value
    setYear(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const searchHandler_price = (e: any, value: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_price = value
    setPrice(value)
    setTargetSearchObject({ ...targetSearchObject })
  }
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value
    setTargetSearchObject({ ...targetSearchObject });
    window.scrollTo(0,500)
  }
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1)

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: 'car',
        })
      assert.ok(like_result, Definer.general_err1)

      await sweetTopSmallSuccessAlert('success', 700, false)
      setOrderRebuild(new Date())
    } catch (err: any) {
      console.log('targetLikeProduct, ERROR:', err)
      sweetErrorHandling(err).then()
    }
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const handleClick = (event: SelectChangeEvent) => {
    setMake(event.target.value)
  }
  const [val, setVal] = React.useState<number>(MIN)
  const handlePrice = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number)
  }
  return (
    <div className="all_cars">
      <Container>
        <Stack className="whole_stack">
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <h3>Cars Search</h3>
            <Box className={'search_big_box'}>
              <form className="search_form" action="">
                <input
                  type="search"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Search"
                  onChange={handleInputChange}
                />
                <Button className="button_search" variant="contained" endIcon={<SearchIcon />}></Button>
              </form>
            </Box>
            <Box marginTop={'20px'}>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchHandler('car_views')}>
                  Popular
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchHandler('createdAt')}>
                  Recent
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchHandler('car_likes')}>
                  Most Liked
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>
          <Stack className="center_cars">
            <Stack className="car_filtering">
              <Stack flexDirection={'row'} alignItems={'center'}>
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
                    onChange={searchHandler_make}>
                    <MenuItem value=""><em>All</em></MenuItem>
                    {car_brands.map((brand: string) => {
                      return (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      )
                    })}
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Transmission</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={transmission}
                    label="Transmission"
                    onChange={searchHandler_trans}>
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>

                    <MenuItem value="AUTOMATIC">AutoMatic</MenuItem>
                    <MenuItem value="MANUAL">Manual</MenuItem>
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Petrol Type</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={petrol}
                    label="Petrol Type"
                    onChange={searchHandler_engine}>
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {petrol_types.map((ele: string) => {
                      return <MenuItem value={ele}>{ele}</MenuItem>
                    })}
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Color</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={color}
                    label="Color"
                    onChange={searchHandler_color}>
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {car_colors.map(ele => {
                      return <MenuItem value={ele}>{ele}</MenuItem>
                    })}
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Year</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={year}
                    label="Year(above)"
                    onChange={searchHandler_year}>
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {car_year.map((ele: number) => {
                      return <MenuItem value={ele}>{ele}</MenuItem>
                    })}
                  </Selects>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Body Type</InputLabel>
                  <Selects
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={type}
                    label="Body Type"
                    onChange={searchHandler_type}>
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {car_types.map((ele: string) => {
                      return <MenuItem value={ele}>{ele}</MenuItem>
                    })}
                  </Selects>
                </FormControl>
              </StyledEngineProvider>
              <Stack flexDirection={'row'} alignItems={'center'}>
                <div className="vertical_line"></div>
                <div className="line_near">By Price</div>
              </Stack>
              <Box sx={{ width: 250 }}>
                <Slider
                  marks={marks}
                  step={10}
                  value={price}
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  onChange={searchHandler_price}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typographys variant="body2" onClick={() => setPrice(MIN)} sx={{ cursor: 'pointer' }}>
                    {MIN} min
                  </Typographys>
                  <Typographys variant="body2" onClick={() => setPrice(MAX)} sx={{ cursor: 'pointer' }}>
                    {MAX} max
                  </Typographys>
                </Box>
              </Box>
            </Stack>
            <Stack flexDirection={'column'} sx={{ width: '100%' }}>
              {targetCars.map((car: Car) => {
                const image_path = `${serverApi}/${car.car_images[0]}`
                return (
                  <Stack className="car_box">
                    <Box className="car_size" sx={{ backgroundImage: `url(${image_path})` }}>
                      <div className="car_condition">{car.car_discount > 0 ? -car.car_discount : 'Featured'}</div>
                    </Box>
                    <Stack className="right_desc">
                      <div className="right_above">
                        <h4>
                          {car.car_brand} {car.car_name} {car.car_model}
                        </h4>
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite style={{ color: 'red' }} />}
                          id={car?._id}
                          onClick={targetLikeProduct}
                          checked={car?.me_liked && car?.me_liked[0]?.my_favorite ? true : false}
                        />
                        <p>${Math.round(car.car_price - car.car_price * (car.car_discount / 100))}</p>
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
                        <div className="detail_button" onClick={() => chosenCarHandler(car._id)}>
                          View in Detail
                        </div>
                        <div
                          className="detail_button"
                          onClick={e => {
                            props.onAdd(car)
                            e.stopPropagation()
                          }}>
                          Add to Cart
                        </div>
                        <Stack flexDirection={'row'}>
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: 'md',
                              color: 'text.secondary',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            {car.car_views} <VisibilityIcon sx={{ fontsize: 20, marginLeft: '5px' }} />
                          </Typography>
                          <Box sx={{ width: 2, bgcolor: 'divider' }} />
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: 'md',
                              color: 'text.secondary',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            <div ref={element => (refs.current[car._id] = element)}>{car.car_likes}</div>
                            <Favorite sx={{ fontSize: 20, marginLeft: '5px' }} />
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
          <Stack className="bottom_box" sx={{ marginBottom: '1px' }}>
            <Pagination
              count={targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3}
              page={targetSearchObject.page}
              renderItem={item => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={'primary'}
                />
              )}
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
