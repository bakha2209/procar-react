import { Button, Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules'
import Box from '@mui/material/Box'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import { StyledEngineProvider, styled } from '@mui/material/styles'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { Car } from '../../../types/car'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveChosenCar, retrieveChosenDealer, retrieveMemberReviews } from '../DealerPage/selector'
import { createSelector } from 'reselect'
import { Dealer } from '../../../types/user'
import { serverApi } from '../../lib/config'
import { Dispatch } from '@reduxjs/toolkit'
import { setChosenDealer, setChosenCar, setMemberReviews } from '../../screens/DealerPage/slice'
import { useEffect } from 'react'
import CarApiService from '../../apiServices/carApiService'
import DealerApiService from '../../apiServices/dealerApiService'
import assert from 'assert'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import { verifiedMemberData } from '../../apiServices/verify'
import Checkbox from '@mui/material/Checkbox'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import '../../../css/comments.css'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import { Review, SearchReviews } from '../../../types/others'
import ReviewApiService from '../../apiServices/reviewApiService'

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenCar: (data: Car) => dispach(setChosenCar(data)),
  setChosenDealer: (data: Dealer) => dispach(setChosenDealer(data)),
  setMemberReviews: (data: Review[]) => dispach(setMemberReviews(data)),
})

// REDUX SELECTOR
const chosenCarRetriever = createSelector(retrieveChosenCar, chosenCar => ({
  chosenCar,
}))
const chosenDealerRetriever = createSelector(retrieveChosenDealer, chosenDealer => ({
  chosenDealer,
}))
const memberReviewsRetriever = createSelector(retrieveMemberReviews, memberReviews => ({
  memberReviews,
}))

const order_list = Array.from(Array(3).keys())

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

export function ChosenCar(props: any) {
  /**INITIALIZATIONS */
  let { car_id } = useParams<{ car_id: string }>()
  console.log('car_id', car_id)
  const { setChosenCar, setChosenDealer, setMemberReviews } = actionDispatch(useDispatch())
  const { chosenCar } = useSelector(chosenCarRetriever)
  const { chosenDealer } = useSelector(chosenDealerRetriever)
  const { memberReviews } = useSelector(memberReviewsRetriever)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [productRebuild, setProductRebuild] = useState<Date>(new Date())
  const [reviewContent, setReviewContent] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [targetSearchObj, setTargetSearchObj] = useState<SearchReviews>({
    page: 1,
    limit: 3,
    order: 'updatedAt',
    review_ref_id: car_id,
    group_type: 'car',
  })

  const carRelatedProcess = async () => {
    try {
      const carService = new CarApiService()
      const car: Car = await carService.getChosenCar(car_id)
      setChosenCar(car)

      const dealerService = new DealerApiService()
      const dealer = await dealerService.getChosenDealer(car.dealer_mb_id)
      setChosenDealer(dealer)

      const carReviews = new ReviewApiService()
      const reviews: Review[] = await carReviews.getMemberReviews(targetSearchObj)
      setMemberReviews(reviews)
    } catch (err) {
      console.log('carRelatedProcess, ERROR:', err)
    }
  }
  useEffect(() => {
    carRelatedProcess().then()
  }, [productRebuild])

  const submitReview = async () => {
    try {
      // Validate the review content
      assert.ok(localStorage.getItem('member_data'), Definer.auth_err1)
      assert.ok(reviewContent.trim() !== '', Definer.submit_content_err)
      assert.ok(reviewRating !== 0, Definer.submit_rating_err)

      // Create the review object
      const reviewData = {
        mb: verifiedMemberData._id, // Replace member._id with the actual member ID
        review_ref_id: car_id, // Replace articleId with the actual article ID
        group_type: 'car',
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
      setProductRebuild(new Date())
    } catch (err: any) {
      console.log('targetLikeProduct, ERROR:', err)
      sweetErrorHandling(err).then()
    }
  }

  const [value, setValue] = React.useState<number | null>(4)
  return (
    <div className="chosen_car">
      <Container>
        <Stack className="main_car">
          <Box className="swiper_box">
            <Swiper
              slidesPerView={1}
              centeredSlides={false}
              slidesPerGroupSkip={1}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
              }}
              scrollbar={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
              className="swipe">
              {chosenCar?.car_images.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`
                return (
                  <SwiperSlide style={{height:"100%"}}>
                    <img height={"100%"} width={"100%"} src={image_path} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Box>
          <Stack className="car_description">
            <Stack className="car_main_title">
              <h2 className="car_title">
                {chosenCar?.produced_year} {chosenCar?.car_brand} {chosenCar?.car_name} {chosenCar?.car_model}
              </h2>
              <div className="sale_off">-{chosenCar?.car_discount ?? 0 > 0 ? chosenCar?.car_discount : null}%</div>
              <div
                className="detail_button"
                onClick={e => {
                  props.onAdd(chosenCar)
                  e.stopPropagation()
                }}>
                Add to Cart
              </div>
            </Stack>
            <Stack className="car_brand">
              <div className="car_toyota">Brand: {chosenCar?.car_brand}</div>
              <Stack flexDirection={'row'}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}>
                  <Rating
                    name="read-only"
                    value={
                      chosenCar &&
                      chosenCar.car_reviews &&
                      chosenCar.car_reviews.length !== 0 &&
                      chosenCar.car_rating !== undefined
                        ? Math.floor(chosenCar.car_rating / chosenCar.car_reviews.length)
                        : 0
                    }
                    readOnly
                  />
                </Box>
                <span>
                  ({chosenCar?.car_reviews?.length}
                  {chosenCar?.car_reviews?.length == 1 ? 'review' : 'reviews'})
                </span>
              </Stack>
              <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: 'red' }} />}
                    id={chosenCar?._id}
                    onClick={targetLikeProduct}
                    checked={chosenCar?.me_liked && chosenCar?.me_liked[0]?.my_favorite ? true : false}
                  />

                  <span>{chosenCar?.car_likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RemoveRedEyeIcon sx={{ mr: '10px' }} />
                  <span>{chosenCar?.car_views}</span>
                </div>
              </div>
            </Stack>
            <p className="car_para">{chosenCar?.car_description}</p>
            <p className="car_model">Model: {chosenCar?.car_model}</p>
            <Stack className="con_trans">
              <Box marginRight={'40px'}>
                <p>Condition</p>
                <div className="con_div">New</div>
              </Box>
              <Box>
                <p>Transmission</p>
                <div className="con_div">{chosenCar?.car_transmission} Transmission</div>
              </Box>
            </Stack>
            <Stack className="car_price">
              <Stack className="price_old">
                <p>
                  $
                  {Math.round(
                    (chosenCar?.car_price ?? 0) - (chosenCar?.car_price ?? 0) * ((chosenCar?.car_discount ?? 0) / 100)
                  )}{' '}
                  <span style={{ marginLeft: '10px' }}>${chosenCar?.car_price}</span>
                </p>
              </Stack>
              <Stack flexDirection={'row'}>
                <div className="otzivlar"></div>
                <div className="otzivlar"></div>
                <div className="otzivlar"></div>
              </Stack>
            </Stack>
            <Stack flexDirection={'row'} style={{ marginBottom: '80px' }}>
              <img src="/icons/location.svg" alt="" />
              <span className="boston_address">Seoul, South Korea</span>
            </Stack>
          </Stack>
          <Stack className="car_overview">
            <h3>Car Overview</h3>
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/small_car.svg" alt="" />
                  <p>
                    Body Type: <span>{chosenCar?.car_type}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/transmission.svg" alt="" />
                  <p>
                    Transmission: <span>{chosenCar?.car_transmission}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/date_range.svg" alt="" />
                  <p>
                    Year: <span>{chosenCar?.produced_year}</span>
                  </p>
                </Stack>
              </Box>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/color_fill.svg" alt="" />
                  <p>
                    Exterior Color: <span>{chosenCar?.car_color}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/fuel.svg" alt="" />
                  <p>
                    Fuel Type: <span>{chosenCar?.car_engine_type}</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/cylinder.svg" alt="" />
                  <p>
                    Cylinder: <span>N/A</span>
                  </p>
                </Stack>
              </Box>
              <Box>
                <Stack className="overview_line">
                  <img src="/icons/color_fill.svg" alt="" />
                  <p>
                    Interior-Color: <span>N/A</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/reset_1.svg" alt="" />
                  <p>
                    History: <span>N/A</span>
                  </p>
                </Stack>
                <Stack className="overview_line">
                  <img src="/icons/engine.svg" alt="" />
                  <p>
                    Engine: <span>N/A</span>
                  </p>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Stack className="car_features">
            <h3>Car Features</h3>
            <Stack className="feature_line">
              <Box flexDirection={'column'}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Central locking</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Leather</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Sports package</p>
                </Stack>
              </Box>
              <Box flexDirection={'column'}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Airbag: Driver</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Cruise Control</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Navigation system</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>Airbag: Driver</p>
                </Stack>
              </Box>
              <Box flexDirection={'column'}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
              </Box>
              <Box flexDirection={'column'}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <img src="/icons/ptichka.svg" alt="" />
                  <p>A/C: Front</p>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <h3>Car Location</h3>
          <Box className="location_car">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2089.7382483609517!2d127.72038899545637!3d34.96428111004859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2skr!4v1708086906249!5m2!1suz!2skr"
              width="100%"
              height="490"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
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
                          <span>{moment(review?.createdAt).format('LL')}</span>
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
      </Container>
    </div>
  )
}
