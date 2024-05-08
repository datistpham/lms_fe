import React, { useCallback, useEffect } from "react";
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
import { Button, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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
        <img
          style={{ width: 40, height: 40 }}
          alt=""
          src="https://shub.edu.vn/images/illustrations/class_add.svg"
        />
        <p
          style={{
            color: "#1e88e5",
            fontSize: 16,
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          Thêm ảnh bìa
        </p>
        <p style={{ marginTop: 12 }}>
          Ảnh bìa khuyến nghị 2100px chiều dài và 900px chiều cao
        </p>
      </Container>
      <img src={imageSelect} style={{ width: "100%" }} alt="" />
    </CloudinaryContext>
  );
};

const CreateClass = (props) => {
  return (
    <>
      <Helmet>
        <title>Tạo lớp học</title>
      </Helmet>
      <div className="create-class">
        <CreateClassMain />
        {/* <JoinClass></JoinClass> */}
      </div>
    </>
  );
};

const CreateClassMain = (props) => {
  // eslint-disable-next-line
  const [listTypeClass, setListTypeClass] = useState([
    { id: 1, name: "Toán" },
    { id: 2, name: "Số học" },
    { id: 3, name: "Đại số" },
    { id: 4, name: "Đại số và giải tích" },
    { id: 5, name: "Giải tích" },
    { id: 6, name: "Hình học" },
    { id: 7, name: "Ngữ văn" },
    { id: 8, name: "Tiếng Anh" },
    { id: 9, name: "Vật lý" },
    { id: 10, name: "Hoá học" },
    { id: 11, name: "Sinh học" },
    { id: 12, name: "Lịch sử" },
    { id: 13, name: "Địa lý" },
    { id: 14, name: "Tin học" },
    { id: 15, name: "GDCN" },
    { id: 16, name: "Công nghệ" },
    { id: 17, name: "Khác" },
  ]);
  const [disableButton, setDisableButton]= useState(true)
  const [selectedTypeClass, setSelectedTypeClass] = useState(1);
  const [imageSelect, setImageSelect] = useState();
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
        cover_image: imageSelect,
      },
    });
    window.location.href = `${window.location.origin}/class/${data.createClass.id_class}/`;
  };

  useEffect(()=> {
    if(classData.class_name?.length <= 0 || !classData.class_name) {
      setDisableButton(true)
    }
    else {
      setDisableButton(false)
    }
  }, [classData])

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ width: "100%", display: "flex", gap: 10, maxWidth: "1024px" }}
      >
        <div className="fsjdiawsisfjraw" style={{ flex: 1 }}>
          <div style={{ marginBottom: 12 }}>
            <strong>Tên lớp học</strong>
          </div>
          <Inp
            setClassData={setClassData}
            placeholder={"Ví dụ, Lớp thầy ngọc 2015..."}
            mean="Class name"
          ></Inp>
          <br></br>
          <div></div>
          <br></br>
          <CoverImageUploader
            imageSelect={imageSelect}
            onImageSelect={setImageSelect}
          />
          <br></br>
          <div></div>
          <br></br>
          <Inp2
            setClassData={setClassData}
            placeholder={"Môt tả lớp học"}
            mean={"Mô tả"}
          />
          <br></br>
          <div></div>
          <br></br>
          <Stack
            direction="row"
            flexWrap={"wrap"}
            spacing={1}
            style={{ flexWrap: "wrap" }}
          >
            {listTypeClass?.map((item, key) => (
              <Chip
                onClick={() => {
                  setSelectedTypeClass(item.id);
                }}
                key={key}
                clickable
                label={item.name}
                variant="contained"
                style={{
                  padding: "20px 14px",
                  borderRadius: 80,
                  marginRight: 10,
                  marginBottom: 8,
                  backgroundColor:
                    parseInt(item.id) === parseInt(selectedTypeClass)
                      ? "#2e89ff"
                      : "#f2f0f5",
                  color:
                    parseInt(item.id) === parseInt(selectedTypeClass)
                      ? "#fff"
                      : "#000",
                }}
              />
            ))}
          </Stack>
          <div className="wrapper-permission-of-class">
            <Rule
              classData={classData}
              setClassData={setClassData}
              t={"Cho phép học sinh thêm / xoá bài tập"}
            ></Rule>
            <Rule2
              classData={classData}
              setClassData={setClassData}
              t={"Phê duyệt học sinh"}
            ></Rule2>
          </div>
        </div>
        <div style={{ width: 300 }}>
          <Button disabled={disableButton} style={{height: 60, borderRadius: 10, textTransform: "unset"}} variant={"contained"} onClick={() => makeClass()} fullWidth>
            Tạo lớp
          </Button>
          <div></div>
          <br />
          <div></div>
          <div style={{fontSize: 14}}>
            Bạn phải nhập đầy đủ các trường để tạo lớp (<span style={{color: "red"}}>*</span>)
          </div>
        </div>
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
      />
      <div className="kfjaoawdada">{props?.t}</div>
    </div>
  );
};

const Inp = (props) => {
  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <TextField
        type="text"
        fullWidth
        value={props?.value}
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            class_name: e.target.value,
          }))
        }
        className=""
        placeholder={props?.placeholder}
      />
    </div>
  );
};
const Inp2 = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <TextField
        type="text"
        fullWidth
        value={props?.value}
        onChange={(e) =>
          props?.setClassData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
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
