import React, { useRef, useEffect, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Box, Button, Container, Stack, TextField } from '@mui/material'
import { Viewer } from '@toast-ui/react-editor'
import '../../../css/tviewer.css'
import '../../../css/my_page.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import moment from 'moment'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SearchIcon from '@mui/icons-material/Search'
import { BoArticle, SearchArticlesObj } from '../../../types/boArticle'

//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTargetBoArticles } from '../../screens/CommunityPage/selector'
import { createSelector } from 'reselect'
import { serverApi } from '../../lib/config'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import assert from 'assert'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Dispatch } from '@reduxjs/toolkit'
import { setTargetBoArticles } from '../../screens/CommunityPage/slice'
import CommunityApiService from '../../apiServices/communityApiService'
import { verifiedMemberData } from '../../apiServices/verify'
import { Review, SearchReviews } from '../../../types/others'
import { setMemberReviews } from '../../screens/DealerPage/slice'
import { retrieveMemberReviews } from '../../screens/DealerPage/selector'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { StyledEngineProvider, styled } from '@mui/material/styles'
import ReviewApiService from '../../apiServices/reviewApiService'
import { Recent_Blogs } from '../recent_blogs'
// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) => dispach(setTargetBoArticles(data)),
  setMemberReviews: (data: Review[]) => dispach(setMemberReviews(data)),
})

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(retrieveTargetBoArticles, targetBoArticles => ({
  targetBoArticles,
}))
const memberReviewsRetriever = createSelector(retrieveMemberReviews, memberReviews => ({
  memberReviews,
}))

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

const TViewer = (props: any) => {
  let { art_id } = useParams<{ art_id: string }>()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const art_id = queryParams.get('art_id');
  console.log("art_id", art_id)
  const { setTargetBoArticles, setMemberReviews } = actionDispatch(useDispatch())
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever)
  const { memberReviews } = useSelector(memberReviewsRetriever)
  const [reviewContent, setReviewContent] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const refs: any = useRef([])
  const editroRef = useRef()
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>({
    bo_id: 'all',
    page: 1,
    limit: 3,
    order: 'updatedAt',
  })
  const [targetSearchDeal, setTargetSearchDeal] = useState<SearchReviews>({
    page: 1,
    limit: 3,
    order: 'updatedAt',
    review_ref_id: props.chosenSingleBoArticles?._id,
    group_type: 'community',
  })
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date())

  useEffect(() => {
    const communityService = new CommunityApiService()
    communityService
      .getTargetArticles(searchArticlesObj)
      .then(data => setTargetBoArticles(data))
      .catch(err => console.log(err))

    const carReviews = new ReviewApiService()
    carReviews
      .getMemberReviews(targetSearchDeal)
      .then(data => setMemberReviews(data))
      .catch(err => console.log(err))
  }, [searchArticlesObj,targetSearchDeal, articlesRebuild])

  const submitReview = async () => {
    try {
      // Validate the review content
      assert.ok(localStorage.getItem('member_data'), Definer.auth_err1)
      assert.ok(reviewContent.trim() !== '', Definer.submit_content_err)
      //assert.ok(reviewRating == 0, Definer.submit_rating_err)

      // Create the review object
      const reviewData = {
        mb: verifiedMemberData._id, // Replace member._id with the actual member ID
        review_ref_id: props.chosenSingleBoArticles?._id, // Replace articleId with the actual article ID
        group_type: 'community',
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
      setArticlesRebuild(new Date())
    } catch (err) {
      console.log('Error creating review:', err)
      sweetErrorHandling(err).then()

      // Handle the error case
      // You can display an error message or perform any necessary actions
    }
  }

  /**HANDLERS */
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1)

      const memberService = new MemberApiService()
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: id,
        group_type: 'community',
      })
      assert.ok(like_result, Definer.general_err1)
      if (like_result.like_status > 0) {
        e.target.style.fill = '#FF3040'
        refs.current[like_result.like_ref_id].innerHTML++
      } else {
        e.target.style.fill = 'white'
        refs.current[like_result.like_ref_id].innerHTML--
      }
      await sweetTopSmallSuccessAlert('success', 700, false)
      setArticlesRebuild(new Date())
    } catch (err: any) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }
  return (
    <Container>
      <Stack className="main_view">
        <Stack className="central_view">
          <Stack className="central_left">
            <Box
              className="card_image"
              flexDirection={'row'}
              justifyContent={'space-between'}
              display={'flex'}
              style={{
                width: '574px',
                height: '305px',
                backgroundImage: `url(${
                  props.chosenSingleBoArticles && props.chosenSingleBoArticles.art_image
                    ? `${serverApi}/${props.chosenSingleBoArticles.art_image}`
                    : '/cars/top_car.webp'
                })`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                marginBottom: '12px',
              }}>
              <div className="post_type">{props.chosenSingleBoArticles?.bo_id}</div>
              <Box
                className={'like_btn'}
                onClick={e => {
                  e.stopPropagation()
                }}>
                <FavoriteIcon
                  className="card_img"
                  fontSize="medium"
                  onClick={e => targetLikeHandler(e, props.chosenSingleBoArticles?._id)}
                  sx={{
                    fill:
                      props.chosenSingleBoArticles?.me_liked && props.chosenSingleBoArticles?.me_liked[0]?.my_favorite
                        ? '#FF3040'
                        : 'white',
                  }}
                />
              </Box>
            </Box>
            <Box className="post_desc">
              <Stack flexDirection={'row'} alignItems={'center'}>
                <CalendarMonthIcon fontSize="small" sx={{ fill: 'red' }} />
                <span>{moment(props.chosenSingleBoArticles?.createdAt).format('LL')}</span>
                <div style={{ flexDirection: 'row', cursor: 'pointer' }}>
                  <img src="/icons/comment.svg" alt="" />
                  <span>({props.chosenSingleBoArticles?.art_reviews.length || 0})</span>
                </div>
                
              </Stack>

              <Box
                style={{
                  color: '#fff',
                  marginLeft: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <FavoriteIcon fontSize="small" sx={{ fill: 'grey' }} />
                <span ref={element => (refs.current[props.chosenSingleBoArticles?._id] = element)}>
                  {props.chosenSingleBoArticles?.art_likes}
                </span>
                <RemoveRedEyeIcon fontSize="small" style={{ color: 'red' }} />
                <span style={{ marginLeft: '5px' }}>{props.chosenSingleBoArticles?.art_views}</span>
              </Box>
            </Box>
            <p>{props.chosenSingleBoArticles?.art_subject}</p>
            <Stack sx={{ background: 'white', mt: '30px', borderRadius: '10px' }}>
              <Box sx={{ m: '40px' }}>
                <Viewer
                  //@ts-ignore
                  ref={editroRef}
                  initialValue={props.chosenSingleBoArticles?.art_content}
                  height={'600px'}
                />
              </Box>
            </Stack>
            <Box className="image_quote">
              <div className="quote_desc">
                Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is
                living with the results
              </div>
              
              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Box flexDirection={'row'}>
                  <img src="/auth/chiziqcha.png" />
                  <span>John Mehedii</span>
                </Box>
                <img src="/auth/qoshtirnoq.png" style={{ width: '27px', height: '19px' }} alt="" />
              </Stack>
              
            </Box>
          </Stack>
          <Stack className="member_right">
            <img src="/dealer/dealer_ads.webp" className="image_ad" alt="" />
            <Stack className="search_here">
              <Stack flexDirection={'row'} alignItems={'center'} width={'100%'}>
                <div className="red_vertical"></div>
                <div className="line_name">Search Here</div>
              </Stack>
              <Box flexDirection={'row'} alignItems={'center'}>
                <form className="search_form" action="">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_resSearch"
                    placeholder="Search here..."
                  />
                  <SearchIcon />
                </form>
              </Box>
            </Stack>
            <Stack className="recent_blog">
              <Recent_Blogs/>

              <Stack className="popular_tags">
                <Stack flexDirection={'row'} alignItems={'center'} width={'100%'}>
                  <div className="red_vertical"></div>
                  <div className="line_name">Popular tags</div>
                </Stack>
                <Stack className="box_wrap">
                  <div className="small_boxes">Design</div>
                  <div className="small_boxes">Marketing</div>
                  <div className="small_boxes">Search</div>
                  <div className="small_boxes">Branding</div>
                  <div className="small_boxes">Startup</div>
                  <div className="small_boxes">Tech</div>
                  <div className="small_boxes">Landing</div>
                  <div className="small_boxes">Coding</div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
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
                <Button className="submit_button"  onClick={submitReview}>
                  Submit Review
                </Button>
              </Stack>
        <Stack className="review_part"></Stack>
      </Stack>
    </Container>
    // <Stack sx={{ background: "white", mt: "30px", borderRadius: "10px" }}>
    //   <Box sx={{ m: "40px" }}>
    //     <Viewer
    //     //@ts-ignore
    //       ref={editroRef}
    //       initialValue={props.chosenSingleBoArticles?.art_content}
    //       height={"600px"}
    //     />
    //   </Box>
    // </Stack>
  )
}

export default TViewer
