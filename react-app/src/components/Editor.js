import React, { Component, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { getMedia } from "../store/media";

const EditorComponent = () => {
  const media = useSelector((state) => state.MediaList.media);
  const [mediaArrayForImageList, setMediaArrayForImageList] = useState([])
  const dispatch = useDispatch();
  const getTheMedia = async () => {
    await dispatch(getMedia());
    toObj(media)
  };
  useEffect(() => {
    getTheMedia();

  }, [media]);
  const editorRef = useRef(null);
  const toObj = (array) => {
    let count = 1;
    let mediaArray = [];
    array.forEach((ele) => {
      let mediaObj = {};
      mediaObj["title"] = `Image ${count}`;
      mediaObj["value"] = ele;
      mediaArray.push(mediaObj);
      count++;
    });
    setMediaArrayForImageList(mediaArray)
  };
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "image media",
          ],
          menubar: false,
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          image_list: mediaArrayForImageList
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};
export default EditorComponent;
