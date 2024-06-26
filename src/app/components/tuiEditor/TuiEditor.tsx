import { useCallback, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import  {Editor } from "@toast-ui/react-editor";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import { BoArticleInput } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
import { serverApi } from "../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";

export const TuiEditor = (props: any) => {
  /**INITIALIZATIONS */
  const editorRef = useRef();
  const [communityArticleData, setCommunityArticleData] =
    useState<BoArticleInput>({
      art_content: "",
      art_subject: "",
      art_image: "",
      bo_id: "",
    });
  /**HANDLERS */
  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);
      const normalizedImageName = image_name.replace(/\\/g, "/");

      communityArticleData.art_image = image_name;
      setCommunityArticleData((prevState) => ({
        ...prevState,
        art_image: normalizedImageName,
      }));
      const source = `${serverApi}/${normalizedImageName}`;
      return source;
    } catch (err) {
      console.log("ERROR ::: uploadImage", err);
    }
  };

  const changeCategoryHandler = (e: any) => {
    const newBoId = e.target.value;
    setCommunityArticleData((prevState) => ({
      ...prevState,
      bo_id: newBoId
    }));
  };
  // const changeTitleHandler = (e: any) => {
  //   communityArticleData.art_subject= e.target.value
  //   setCommunityArticleData({...communityArticleData})
  //}
  const changeTitleHandler = useCallback(
    (e: any) => {
      const newArtSubject = e.target.value;
      setCommunityArticleData((prevState) => ({
        ...prevState,
        art_subject: newArtSubject
      }));
    },
    [communityArticleData.art_subject]
  );
  const handleRegisterButton = async () => {
    try {
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();

      communityArticleData.art_content = art_content;
      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.bo_id !== "" &&
          communityArticleData.art_subject !== "",
        Definer.input_err1
      );

      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSmallSuccessAlert("Article is created successfully");
      props.setArticlesRebuild(new Date())
      props.setValue("1")
    } catch (err) {
      console.log(`ERROR ::: handleRegisterButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px" }}
        justifyContent={"space-evenly"}
      >
        <Box className={"form_row"} style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225 255 233", margin: "10px" }}
            variant="h3"
          >
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select
              value={communityArticleData.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Choose Category</span>
              </MenuItem>
              <MenuItem value={"celebrity"}>Celebrities</MenuItem>
              <MenuItem value={"evaluation"}>Evaluation</MenuItem>
              <MenuItem value={"story"}>Stories</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225, 255, 233", margin: "10px" }}
            variant="h3"
          >
            Topic
          </Typography>
          <TextField
            id="filled-basic"
            label="Topic"
            variant="filled"
            style={{ width: "300px", background: "white" }}
            value={communityArticleData?.art_subject}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue="Type here"
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageURL = await uploadImage(image);
            console.log("uploadImageURL", uploadImageURL);
            callback(uploadImageURL);
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"cenetr"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
