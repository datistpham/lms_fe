import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Checkbox from "@mui/material/Checkbox";
import "./style.sass";
import { useMutation } from "@apollo/client";
import CREATECLASS from "../../../../docs/graphql/mutation/create_class";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../App";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { CloudinaryContext, Image } from "cloudinary-react";
const Container = styled.div`
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const CoverImageUploader = ({ onImageSelect, imageSelect }) => {
  const onDrop = async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    // Upload selected file to Cloudinary
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "uem2kud5"); // Replace 'your_cloudinary_upload_preset' with your actual upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/cockbook/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const imageInfo = await response.json();
        const imageUrl = imageInfo.secure_url;

        // Pass the uploaded image URL to the parent component
        onImageSelect(imageUrl);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <CloudinaryContext cloudName="cockbook">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <img style={{width: 40, height: 40}} alt="" src='https://shub.edu.vn/images/illustrations/class_add.svg'/> 
        <p
          style={{
            color: "#1e88e5",
            fontSize: 16,
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          Add Cover Image
        </p>
        <p style={{ marginTop: 12 }}>Recommended dimensions: 2100px x 900px</p>
      </Container>
      <img src={imageSelect} style={{width: "100%"}} alt="" />
    </CloudinaryContext>
  );
};

const CreateClass = (props) => {
  return (
    <>
      <Helmet>
        <title>Join class | Quiz</title>
      </Helmet>
      <div className="create-class">
        <CreateClassMain></CreateClassMain>
        {/* <JoinClass></JoinClass> */}
      </div>
    </>
  );
};

const CreateClassMain = (props) => {
  // eslint-disable-next-line
  const [imageSelect, setImageSelect]= useState()
  const [createClass, { data, loading, error }] = useMutation(CREATECLASS, {});
  const { user } = useContext(UserContext);
  const [classData, setClassData] = useState(() => ({
    perform: true,
    invite: true,
  }));
  const makeClass = async () => {
    const { data } = await createClass({
      variables: {
        ...classData,
        own_id: user?.data?.userLogin?.uid,
        id_class: uuidv4(),
        cover_image: imageSelect
      },
    });
    window.location.href = `${window.location.origin}/class/${data.createClass.id_class}/`;
  };
  return (
    <div className="fsjdiawsisfjraw">
      <Title title={"Tên lớp học"}></Title>
      <Inp
        setClassData={setClassData}
        placeholder={"Ví dụ, Lớp thầy ngọc 2015..."}
        mean="Class name"
      ></Inp>
      <br></br>
      <div></div>
      <br></br>
      <CoverImageUploader imageSelect={imageSelect} onImageSelect={setImageSelect} />
      <br></br>
      <div></div>
      <br></br>
      <Inp2
        setClassData={setClassData}
        placeholder={"Môt tả lớp học"}
        mean={"Mô tả"}
      ></Inp2>
      <div className="wrapper-permission-of-class">
        <Rule
          classData={classData}
          setClassData={setClassData}
          t={"Cho phép học sinh thêm / xoá bài tập"}
        ></Rule>
        <Rule2
          classData={classData}
          setClassData={setClassData}
          t={"Cho phép học sinh mời người lạ"}
        ></Rule2>
      </div>
      <div className="create-class" onClick={() => makeClass()}>
        Tạo lớp
      </div>
    </div>
  );
};

const Rule = (props) => {
  return (
    <div
      className="rule"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Checkbox
        defaultChecked
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            perform: !props?.classData?.perform,
          }))
        }
      ></Checkbox>
      <div className="kfjaoawdada">{props?.t}</div>
    </div>
  );
};

const Rule2 = (props) => {
  return (
    <div
      className="rule"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Checkbox
        defaultChecked
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            invite: !props?.classData?.invite,
          }))
        }
      ></Checkbox>
      <div className="kfjaoawdada">{props?.t}</div>
    </div>
  );
};

const Inp = (props) => {
  return (
    <div className="inp-12">
      <input
        type="text"
        value={props?.value}
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            class_name: e.target.value,
          }))
        }
        className="kprjekpore erigihdkjsnd"
        placeholder={props?.placeholder}
      />
      {/* <div className="fdefdkgsefda">{props?.mean}</div> */}
    </div>
  );
};
const Inp2 = (props) => {
  return (
    <div className="inp-12">
      <input
        type="text"
        value={props?.value}
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="kprjekpore erigihdkjsnd"
        placeholder={props?.placeholder}
      />
      {/* <div className="fdefdkgsefda">{props?.mean}</div> */}
    </div>
  );
};

const JoinClass = (props) => {
  return (
    <div className="join-class">
      <Title title={"Join a class or create your class"}></Title>
      <SearchClass></SearchClass>
      <CreateClassBtn></CreateClassBtn>
    </div>
  );
};

const Title = (props) => {
  return <div className="title-join-class">{props?.title}</div>;
};

const SearchClass = (props) => {
  return (
    <div className="search-class">
      <input
        type="text"
        className="search-class"
        placeholder="Type any class you want"
      />
      <div className="gjgfsdgfdgddsfd">Search class</div>
    </div>
  );
};

const CreateClassBtn = (props) => {
  return (
    <div className="add-class">
      <div className="fbsfdkesofwsa">Create new class</div>
    </div>
  );
};

export default CreateClass;
