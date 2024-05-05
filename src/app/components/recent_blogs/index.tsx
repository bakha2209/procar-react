import React, { useEffect, useRef, useState } from 'react'
import { setRecentArticles } from '../../screens/CommunityPage/slice'
import { BoArticle, SearchArticlesObj } from '../../../types/boArticle'
import { Dispatch, createSelector } from '@reduxjs/toolkit'
import { retrieveRecentArticles } from '../../screens/CommunityPage/selector'
import { useDispatch, useSelector } from 'react-redux'
import CommunityApiService from '../../apiServices/communityApiService'
import { Box, Stack } from '@mui/material'
import { serverApi } from '../../lib/config'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from 'moment'
import { setChosenSingleBoArticle } from '../../screens/MemberPage/slice'
import { useHistory } from 'react-router-dom'
import { retrieveChosenSingleBoArticle } from '../../screens/MemberPage/selector'
import { sweetErrorHandling } from '../../lib/sweetAlert'
import { verifiedMemberData } from '../../apiServices/verify'

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setRecentArticles: (data: BoArticle[]) => dispach(setRecentArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) => dispach(setChosenSingleBoArticle(data)),
})

// REDUX SELECTOR
const recentArticlesRetriever = createSelector(retrieveRecentArticles, recentArticles => ({
  recentArticles,
}))
const chosenSingleBoArticlesRetriever = createSelector(retrieveChosenSingleBoArticle, chosenSingleBoArticles => ({
    chosenSingleBoArticles,
  }))
export function Recent_Blogs() {
  // INITIALIZATIONS
  const history = useHistory()
  const { setRecentArticles,setChosenSingleBoArticle } = actionDispatch(useDispatch())
  const { recentArticles } = useSelector(recentArticlesRetriever)
  const { chosenSingleBoArticles } = useSelector(chosenSingleBoArticlesRetriever)
  const [value, setValue] = React.useState('1')
  const [searchArticlesObject, setSearchArticlesObject] = useState<SearchArticlesObj>({
    bo_id: 'all',
    page: 1,
    limit: 3,
    order: 'createdAt',
  })
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date())
  useEffect(() => {
    const communityService = new CommunityApiService()
    communityService
      .getTargetArticles(searchArticlesObject)
      .then(data => setRecentArticles(data))
      .catch(err => console.log(err))
  }, [searchArticlesObject, articlesRebuild])
  const goarticleHandler = (mb_id: string, article_id: string) =>
    history.push(`/member-page/other?mb_id=${mb_id}&art_id=${article_id}`)

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService()
      communityService
        .getChosenArticle(art_id)
        .then(data => {
          setChosenSingleBoArticle(data)
          
          history.push(`/member-page/${art_id}`)
          setValue('5')
        })
        .catch(err => console.log(err))
    } catch (err: any) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }
  return( <Stack><Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
      <div className="red_vertical"></div>
      <div className="line_name">Recent Blogs</div>
    </Stack>
    <Stack className="inner_blogs" style={{ width: "100%" }}>
      {recentArticles.map((articles: BoArticle) => {
        const art_images_url = articles?.art_image
          ? `${serverApi}/${articles.art_image}`
          : "/cars/top_car.webp";
        return (
          <Box className="item_blog" onClick={() =>
             goarticleHandler(articles.mb_id, articles._id)
          }>
            <img src={art_images_url} className="item_image" alt="" />
            <Box flexDirection={"column"} height={"56px"}>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                height={"auto"}
              >
                <CalendarMonthIcon
                  fontSize="small"
                  style={{ color: "red" }}
                />
                <span>{moment(articles.createdAt).format("LL")}</span>
              </Stack>
              <div className="item_topic">
                {articles?.art_subject}
              </div>
            </Box>
          </Box>
        );
      })}
    </Stack></Stack>
     
  )
}

