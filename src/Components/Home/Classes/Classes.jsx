import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import CHECK_USER_JOIN_ALL_CLASS from "../../../docs/graphql/query/check_user_join_all_class";
import NoJoinClasses from "./Components/NoJoinClasses";
import "./style.sass";
import MenuNavigation from "./Components/MenuNavigation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FaPlus } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Classes = (props) => {
  const [sort, setSort] = React.useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(CHECK_USER_JOIN_ALL_CLASS, {
    variables: {
      id_user: user?.uid,
    },
  });
  return (
    <>
      <Helmet>
        <title>Classes | SHub</title>
      </Helmet>
      <div className="max-height" style={{ background: "white" }}>
        <MenuNavigation />
      </div>
      <div
        className="classes max-height"
        style={{ background: "#f2f0f5", justifyContent: "unset" }}
      >
        {data && data?.check_user_join_all_class?.length <= 0 && (
          <NoJoinClasses></NoJoinClasses>
        )}
        <div style={{ width: "100%", display: "flex", gap: 10, padding: 24 }}>
          <div style={{ flex: 1, height: 60 }}>
            <input
              placeholder="Tìm kiếm"
              type="text"
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid #e7e7e7",
                borderRadius: 10,
                padding: 10,
              }}
            />
          </div>
          <Box sx={{ minWidth: 120, backgroundColor: "white" }}>
            <FormControl fullWidth style={{ height: 60 }}>
              <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sắp xếp"
                onChange={handleChange}
              >
                <MenuItem value={1}>A-Z</MenuItem>
                <MenuItem value={2}>Z-A</MenuItem>
                <MenuItem value={3}>Mới nhất</MenuItem>
                <MenuItem value={4}>Cũ nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            onClick={() => {
              navigate("/class/create");
            }}
            variant="contained"
            style={{ height: 60 }}
          >
            <IconButton aria-label="add to favorites">
              <FaPlus color="white" />
            </IconButton>
            Tạo lớp học
          </Button>
        </div>
        {data && data?.check_user_join_all_class?.length > 0 && (
          <div style={{ width: "100%", padding: 10 }}>
            <div
              style={{
                margin: "16px 0",
                fontSize: 18,
                fontWeight: 600,
                width: "100%",
              }}
            >
              Lớp học của bạn:{" "}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên lớp</TableCell>
                      <TableCell align="right">Học sinh</TableCell>
                      <TableCell align="right">Bài giảng</TableCell>
                      <TableCell align="right">Bài tập</TableCell>
                      <TableCell align="right">Tài liệu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && data?.check_user_join_all_class?.length > 0 && data?.check_user_join_all_class?.map((row) => (
                      <TableRow
                        onClick={() => navigate(`/class/${row?.id_class}/`)}
                        key={row.name}
                        style={{cursor: "pointer"}}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.class_name}
                        </TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* {data?.check_user_join_all_class?.map((item, key) => (
                <div
                  key={key}
                  className="dvkadvads3233fvdds"
                  style={{ width: "calc(25% - 10px)", background: "#f2f0f5" }}
                >
                  <ClassJoin key={key} {...item} />
                </div>
              ))} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ClassJoin = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/class/${props?.id_class}/`)}
      className="dvkadvadsfvdds"
      style={{
        padding: 16,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <div className="fjklsjklwasqwreawer" style={{ fontSize: 20 }}>
        {props?.class_name}
      </div>
      <br />
      <div
        className="sljfhjdjlskdjlkejalesw"
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Description: <strong>{props?.description}</strong>
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Created by:{" "}
        <img
          className="sjkfdhjslkdjrfioaewsa"
          src={props?.photoURL}
          alt=""
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <strong className="dfihjsiodjiodfwjeas">{props?.displayName}</strong>
      </div>
    </div>
  );
};

export default Classes;
