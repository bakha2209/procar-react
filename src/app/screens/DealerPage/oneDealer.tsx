import { Box, Container, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'

import Option from '@mui/joy/Option'
import { Select } from 'antd'
import { StyledEngineProvider } from '@mui/material/styles'
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Typography, Link } from '@mui/joy'
import { Favorite } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CallIcon from '@mui/icons-material/Call'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import SpeedIcon from '@mui/icons-material/Speed'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFlip, Pagination, Navigation } from 'swiper/modules'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Selects, { SelectChangeEvent } from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Typographys from '@mui/material/Typography'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { retrieveChosenDealer, retrieveMemberReviews, retrieveTargetCars } from '../DealerPage/selector'
import { createSelector } from 'reselect'
import { Dealer } from '../../../types/user'
import { serverApi } from '../../lib/config'
import { Dispatch } from '@reduxjs/toolkit'
import { setChosenDealer, setMemberReviews, setTargetCars } from '../../screens/DealerPage/slice'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Car } from '../../../types/car'
import { CarSearchObj, Review, SearchReviews } from '../../../types/others'
import CarApiService from '../../apiServices/carApiService'
import assert from 'assert'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import DealerApiService from '../../apiServices/dealerApiService'
import { verifiedMemberData } from '../../apiServices/verify'
import { car_brands, car_colors, car_types, car_year, petrol_types } from '../../components/filter_configs'
import Paginations from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ReviewApiService from '../../apiServices/reviewApiService'
import moment from 'moment'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

//others

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenDealer: (data: Dealer) => dispach(setChosenDealer(data)),
  setTargetCars: (data: Car[]) => dispach(setTargetCars(data)),
  setMemberReviews: (data: Review[]) => dispach(setMemberReviews(data)),
})
// REDUX SELECTOR
const chosenDealerRetriever = createSelector(retrieveChosenDealer, chosenDealer => ({
  chosenDealer,
}))
const targetCarsRetriever = createSelector(retrieveTargetCars, targetCars => ({
  targetCars,
}))
const memberReviewsRetriever = createSelector(retrieveMemberReviews, memberReviews => ({
  memberReviews,
}))

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
const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}))

const customIcons: {
  [index: string]: {
    icon: React.ReactElement
    label: string
  }
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
}
function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props
  return <span {...other}>{customIcons[value].icon}</span>
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export function OneDealer(props: any) {
  /**INITIALIZATIONS */
  let { dealer_id } = useParams<{ dealer_id: string }>()
  const { setChosenDealer, setTargetCars, setMemberReviews } = actionDispatch(useDispatch())
  const { chosenDealer } = useSelector(chosenDealerRetriever)
  const { targetCars } = useSelector(targetCarsRetriever)
  const [chosenDealerId, setChosenDealerId] = useState<string>(dealer_id)
  const { memberReviews } = useSelector(memberReviewsRetriever)
  const [reviewContent, setReviewContent] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const refs: any = useRef([])
  const history = useHistory()
  const [make, setMake] = React.useState('')
  const [transmission, setTransmission] = React.useState('')
  const [petrol, setPetrol] = React.useState('')
  const [color, setColor] = React.useState('')
  const [year, setYear] = React.useState()
  const [type, setType] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [price, setPrice] = React.useState<number>(MIN)
  const [productRebuild, setProductRebuild] = useState<Date>(new Date())
  const [targetSearchObject, setTargetSearchObject] = useState<CarSearchObj>({
    page: 1,
    limit: 6,
    order: 'createdAt',
    dealer_mb_id: dealer_id,
    car_brand: '',
    car_transmission: '',
    car_color: '',
    car_engine_type: '',
    car_type: '',
    produced_year: undefined,
    car_price: undefined,
  })
  const [targetSearchDeal, setTargetSearchDeal] = useState<SearchReviews>({
    page: 1,
    limit: 3,
    order: 'updatedAt',
    review_ref_id: dealer_id,
    group_type: 'member',
  })
  useEffect(() => {
    const dealerService = new DealerApiService()
    dealerService
      .getChosenDealer(chosenDealerId)
      .then(data => setChosenDealer(data))
      .catch(err => console.log(err))

    const carService = new CarApiService()
    carService
      .getTargetCars(targetSearchObject)
      .then(data => setTargetCars(data))
      .catch(err => console.log(err))
    const carReviews = new ReviewApiService()
    carReviews
      .getMemberReviews(targetSearchDeal)
      .then(data => setMemberReviews(data))
      .catch(err => console.log(err))
  }, [targetSearchObject, targetSearchDeal, productRebuild])

  const submitReview = async () => {
    try {
      // Validate the review content
      assert.ok(localStorage.getItem('member_data'), Definer.auth_err1)
      assert.ok(reviewContent.trim() !== '', Definer.submit_content_err)
      assert.ok(reviewRating == 0, Definer.submit_rating_err)

      // Create the review object
      const reviewData = {
        mb: verifiedMemberData._id, // Replace member._id with the actual member ID
        review_ref_id: dealer_id, // Replace articleId with the actual article ID
        group_type: 'member',
        review: reviewContent.trim(),
        rating: reviewRating, // Replace 2 with the actual rating value
      }
      console.log('reviewData::', reviewData)
      // Call the API to create the review
      const communityService = new ReviewApiService()
      const createdReview = await communityService.createReview(reviewData)
      console.log('createdReview::', createdReview)
      // Handle the success case
      // console.log("Review created:", createdReview);
      // Add any additional logic or state updates as needed

      // Reset the review content
      setReviewContent('')

      await sweetTopSmallSuccessAlert('submitted successfully', 700, false)
      setProductRebuild(new Date())
    } catch (err) {
      console.log('Error creating review:', err)
      sweetErrorHandling(err).then()

      // Handle the error case
      // You can display an error message or perform any necessary actions
    }
  }

  /**HANDLERS */
  const targetLikeCar = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1)

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: 'car',
        })
      assert.ok(like_result, Definer.general_err1)

      if (like_result.like_status > 0) {
        e.target.style.fill = 'red'
        refs.current[like_result.like_ref_id].innerHTML++
      } else {
        e.target.style.fill = 'white'
        refs.current[like_result.like_ref_id].innerHTML--
      }

      await sweetTopSmallSuccessAlert('success', 700, false)
      setProductRebuild(new Date())
    } catch (err: any) {
      console.log('targetLikeCar, ERROR:', err)
      sweetErrorHandling(err).then()
    }
  }
  const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {}
  const searchHandler = (category: string) =>
    setTargetSearchObject(prevState => ({
      ...prevState,
      page: 1,
      order: category,
    }))
  const searchHandler_make = (e: any) => {
    targetSearchObject.page = 1
    targetSearchObject.car_brand = e.target.value
    setMake(e.target.value)
    setTargetSearchObject({ ...targetSearchObject })
  }
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

  const handleClick = (event: SelectChangeEvent) => {
    setMake(event.target.value)
  }
  const [val, setVal] = React.useState<number>(MIN)
  const handlePrice = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number)
  }
  const chosenCarHandler = (id: string) => {
    history.push(`/dealer/cars/${id}`)
  }
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value
    setTargetSearchObject({ ...targetSearchObject })
  }
  return (
    <div className="one_dealer">
      <Container>
        <Stack flexDirection={'column'}>
          <div className="dealer_page_title">{chosenDealer?.mb_nick}</div>
          <Stack flexDirection={'row'} alignItems={'center'}>
            <img src="/icons/map_icon.svg" style={{ width: '17px', height: '17px', marginRight: '3px' }} />
            <p className="title_address">Seoul, South Korea</p>
          </Stack>
        </Stack>
        <Stack className="central_info">
          <Stack className="info_left">
            <Stack flexDirection={'column'}>
              <div className="big_image">
                <img src={`${serverApi}/${chosenDealer?.mb_image}`} style={{ width: '100%', height: '100%' }} />
              </div>
              <Stack className="image_desc">
                <Stack flexDirection={'row'} sx={{ marginRight: '10px' }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={'column'}>
                    <div className="dealer_names">Phone Number</div>
                    <div className="dealer_phones">{chosenDealer?.mb_phone}</div>
                  </Box>
                </Stack>
                <Stack flexDirection={'row'} sx={{ marginRight: '10px' }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={'column'}>
                    <div className="dealer_names">Email Address</div>
                    <div className="dealer_phones">bakhodir2209@gmail.com</div>
                  </Box>
                </Stack>
                <Stack flexDirection={'row'} sx={{ marginRight: '10px' }}>
                  <div className="map_box">
                    <img src="/icons/map_icon.svg" alt="" />
                  </div>
                  <Box flexDirection={'column'}>
                    <div className="dealer_names">Visit Website</div>
                    <div className="dealer_phones">www.DealerDemo.com</div>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Box flexDirection={'column'}>
              <h2 style={{ color: '#1B1B1B' }}>Introduction</h2>
              <p style={{ width: '575px', color: '#83827F' }}>
                There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in
                some form, by injected humour, or randomised words which don't look even slight believable. If you are
                going to use a passa In publishing and vfx graphic design, Lorem ipsum is a placeholder text commonly
                used to demonstrate the visual fo of a document or a typeface without relying on meaningful content.
                Lorem ipsum may be used as a placeholder before final copy is available.
              </p>
            </Box>
            <Stack className="inventory_sec">
              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <h2 style={{ color: '#000' }}>Dealer Inventory</h2>
                <StyledEngineProvider injectFirst>
                  <FormControl
                    style={{
                      width: 200,
                      marginTop: '20px',
                      marginRight: '20px',
                    }}
                    size="small">
                    <InputLabel id="demo-select-small-label">Search</InputLabel>
                    <Selects
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={targetSearchObject.order}
                      label="Search"
                      onChange={(event: SelectChangeEvent<string>) => searchHandler(event.target.value)}>
                      <MenuItem value="createdAt">Recently</MenuItem>
                      <MenuItem value="car_views">Most Viewed</MenuItem>
                      <MenuItem value="car_likes">Most Liked</MenuItem>
                    </Selects>
                  </FormControl>
                </StyledEngineProvider>
                {/* <Select
                  showSearch
                  style={{ width: 200, marginTop: "20px", marginRight: "20px" }}
                  placeholder="Select"
                  optionFilterProp="children"
                  onChange={()=>searchHandler}
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? "")
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? "").toLowerCase())
                  // }
                  options={[
                    {
                      value: "createdAt",
                      label: "Recently",
                    },
                    {
                      value: "car_views",
                      label: "Most Viewed",
                    },
                    {
                      value: "car_likes",
                      label: "Most Liked",
                    },
                  ]}
                /> */}
              </Stack>
              <div className="invent_line"></div>
              <Stack className="all_invent_box">
                {targetCars.map((car: Car) => {
                  const image_path_0 = `${serverApi}/${car.car_images[0]}`
                  const image_path_1 = `${serverApi}/${car.car_images[1]}`
                  const image_path_2 = `${serverApi}/${car.car_images[2]}`
                  const image_path_3 = `${serverApi}/${car.car_images[3]}`
                  const image_path_4 = `${serverApi}/${car.car_images[4]}`

                  const car_desc = `${car.car_description.slice(0, 35)}`
                  return (
                    <CssVarsProvider key={car._id}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: 'auto',
                          width: '295px',
                          mr: '30px',
                          mb: '10px',
                        }}>
                        <CardOverflow>
                          <AspectRatio ratio={'1'}>
                            <Swiper
                              effect={'flip'}
                              grabCursor={true}
                              pagination={false}
                              navigation={true}
                              modules={[EffectFlip, Pagination, Navigation]}
                              className="mySwiper">
                              <SwiperSlide
                                className="car_img"
                                style={{
                                  backgroundImage: `url(${image_path_0})`,
                                  backgroundSize: 'cover',
                                  cursor: 'pointer',
                                }}>
                                <div className="view_btn" onClick={() => chosenCarHandler(car._id)}>
                                  View Details <img src="/icons/arrow-right.svg" style={{ marginLeft: '9px' }} />
                                </div>
                                <div
                                  className="view_btn"
                                  onClick={e => {
                                    props.onAdd(car)
                                    e.stopPropagation()
                                  }}>
                                  Add to Cart{' '}
                                </div>
                              </SwiperSlide>
                            </Swiper>
                          </AspectRatio>
                          <IconButton
                            aria-label="Like minimal photography"
                            size="md"
                            variant="solid"
                            color="neutral"
                            sx={{
                              position: 'absolute',
                              zIndex: 2,
                              borderRadius: '50%',
                              right: '1rem',
                              bottom: 0,
                              transform: 'translateY(50%)',
                              color: 'rgba(0,0,0,.4)',
                            }}
                            onClick={e => {
                              e.stopPropagation()
                            }}>
                            <Favorite
                              onClick={e => targetLikeCar(e, car._id)}
                              style={{
                                fill:
                                  car?.me_liked && car?.me_liked[0]?.my_favorite //i should check here
                                    ? 'red'
                                    : 'white',
                              }}
                            />
                          </IconButton>
                        </CardOverflow>
                        <Typography level="h3" fontSize="sm" mt="1">
                          {car.car_type}
                        </Typography>
                        <Typography level="h2" fontSize="md" mt="0.5">
                          {car.car_brand} {car.car_name} {car.produced_year}
                        </Typography>
                        <Typography level="body-sm">
                          <Link textColor="neutral.700">{car_desc}...</Link>
                        </Typography>
                        <Typography level="body-sm">
                          <Link startDecorator={<LocalGasStationIcon />} textColor="#000">
                            {car.petrol_consumption}/100
                          </Link>
                          <Link startDecorator={<SpeedIcon />} textColor="#000" sx={{ ml: '7px' }}>
                            {car.acceleration}cc
                          </Link>
                          <Link textColor="#000" sx={{ ml: '7px' }}>
                            <img
                              src="/icons/gearbox.png"
                              style={{
                                width: '18px',
                                height: '14px',
                                marginLeft: '7px',
                              }}
                              alt=""
                            />{' '}
                            {car.car_transmission}
                          </Link>
                        </Typography>
                        <CardOverflow
                          sx={{
                            display: 'flex',
                            gap: 1.5,
                            py: 1.5,
                            px: 'var(--Card-padding)',
                            borderTop: '1px solid',
                            borderColor: 'neutral.outlinedBorder',
                            bgcolor: 'background.level1',
                          }}>
                          <Stack
                            sx={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Typography
                              level="body-sm"
                              sx={{
                                fontWeight: '700',
                                fontFamily: 'Plus Jakarta Sans',
                                color: '#D01818',
                                alignItems: 'center',
                                display: 'flex',
                              }}>
                              ${Math.round(car.car_price - car.car_price * (car.car_discount / 100))}
                            </Typography>
                            <Typography
                              level="body-sm"
                              sx={{
                                fontWeight: '500',
                                fontFamily: 'Plus Jakarta Sans',
                                color: '#86898E',
                                textDecoration: 'line-through',
                                alignItems: 'center',
                                display: 'flex',
                              }}>
                              ${car.car_price}
                            </Typography>
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
                        </CardOverflow>
                      </Card>
                    </CssVarsProvider>
                  )
                })}
              </Stack>
              <Stack className="post_author">
                <h3>Post Author</h3>
                {memberReviews?.length == 0 ? (
                  <Box className="no_comment">
                    There is no comment yet, your comment could brighten someone's day. Share it here!
                  </Box>
                ) : (
                  memberReviews?.map((review: Review) => {
                    const image_path_com = `${serverApi}/${review.member_data.mb_image}`.replace(/\\/g, '/')
                    return (
                      <Stack className="each_comment">
                        <Stack className="inner_comment">
                          <div
                            className="post_image"
                            style={{
                              backgroundImage: review?.member_data?.mb_image
                                ? `url(${image_path_com})`
                                : `url("/home/super_car.jpg")`,
                            }}></div>
                          <Box flexDirection={'column'} width={'100%'}>
                            <div className="auth_inform">
                              <p>{review?.member_data?.mb_nick}</p>
                              <span>{moment(review?.member_data?.createdAt).format('LL')}</span>
                            </div>
                            <div className="auth_informs">
                              <Box justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                <Rating name="read-only" value={review.rating} readOnly size="small" />
                              </Box>
                              <p>{review.rating}.0</p>
                            </div>
                            <p className="comment_text">{review?.review_content} </p>
                          </Box>
                        </Stack>
                      </Stack>
                    )
                  })
                )}
                <h3>leave a Comment</h3>
              </Stack>
              <Stack className="leave_comment">
                <span>Ratings</span>
                <Box className="rating_box">
                  <StyledEngineProvider injectFirst>
                    <StyledRating
                      name="highlight-selected-only"
                      defaultValue={reviewRating}
                      value={reviewRating}
                      onChange={(event, value) => setReviewRating(value as number)}
                      IconContainerComponent={IconContainer}
                      getLabelText={(value: number) => customIcons[value].label}
                      highlightSelectedOnly
                    />
                  </StyledEngineProvider>
                </Box>
                <span>Write Review</span>
                <Box
                  className="review_box"
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 0 },
                  }}
                  noValidate
                  autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Tell your experience about us"
                    variant="outlined"
                    color="info"
                    style={{ width: '460px', background: 'white' }}
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                  />
                </Box>
                <Button className="submit_button" onClick={submitReview}>
                  Submit Review
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="info_right">
            <Stack className="seller_page">
              <Stack className="seller_avatar">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot">
                  <Avatar alt="Remy Sharp" src="/cars/top_car.webp" />
                </StyledBadge>
              </Stack>
              <div className="seller_name">
                <h2>Rosalina D. Willaim</h2>
                <p>Webcost car Dealer</p>
              </div>
              <Stack flexDirection={'row'}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}>
                  <Rating
                    name="read-only"
                    value={
                      chosenDealer &&
                      chosenDealer.mb_reviews &&
                      chosenDealer.mb_reviews.length !== 0 &&
                      chosenDealer.mb_rating !== undefined
                        ? Math.floor(chosenDealer.mb_rating / chosenDealer.mb_reviews.length)
                        : 0
                    }
                    readOnly
                  />
                </Box>
                <span>
                  ({chosenDealer?.mb_reviews?.length}
                  {chosenDealer?.mb_reviews?.length == 1 ? 'review' : 'reviews'})
                </span>
              </Stack>
              <p className="seller_desc">
                he whimsically named Egg Canvas is the design director and photographer in Seoul.
              </p>
              <Stack className="seller_social">
                <img src="/icons/facebook_icon.svg" style={{ marginRight: '10px' }} alt="" />
                <img src="/icons/twitter_icon.svg" style={{ marginRight: '10px' }} />
                <img src="/icons/youtube_icon.svg" style={{ marginRight: '10px' }} />
                <img src="/icons/insta_icon.svg" style={{ marginRight: '10px' }} />
              </Stack>
              <Button variant="contained" color="primary" size="small">
                Contact with Dealer
              </Button>
            </Stack>
            <Stack className="car_location">
              <Stack flexDirection={'row'} alignItems={'center'}>
                <div className="vertical_line"></div>
                <div className="line_near">Car Location</div>
              </Stack>
              <Box className="map_loc">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2089.7382483609517!2d127.72038899545637!3d34.96428111004859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2skr!4v1708086906249!5m2!1suz!2skr"
                  width="222"
                  height="235"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </Box>
            </Stack>
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
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
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
                    <MenuItem value="AUTOMATIC">AutoMative</MenuItem>
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
                  <Typographys variant="body2" onClick={() => setVal(MIN)} sx={{ cursor: 'pointer' }}>
                    {MIN} min
                  </Typographys>
                  <Typographys variant="body2" onClick={() => setVal(MAX)} sx={{ cursor: 'pointer' }}>
                    {MAX} max
                  </Typographys>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="bottom_box">
          <Paginations
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
      </Container>
    </div>
  )
}
