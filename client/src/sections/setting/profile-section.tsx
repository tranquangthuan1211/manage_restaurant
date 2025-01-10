import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useAuth } from "src/hooks/use-auth";

function ProfileSection() {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const { user } = useAuth();
  console.log(user)
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Quản lý thông tin</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack
              spacing={3}
              sx={{
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  src={"/assets/avatars/avatar-cao-yu.png"}
                  sx={{
                    height: 40,
                    width: 40,
                  }}
                />
                <Button variant="text" color="primary" component="label">
                  Đổi ảnh đại diện
                  <input type="file" hidden />
                </Button>
              </Box>

              <TextField label="Tên tài khoản" defaultValue="admin" disabled />
              <TextField label="Quyền" defaultValue={user?.role} disabled />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <TextField
                  label="Tên hiển thị"
                  defaultValue={user?.name}
                  disabled={!isEditName}
                  sx={{
                    flex: 1,
                  }}
                />
                {!isEditName && (
                  <Button
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => {
                      setIsEditName(!isEditName);
                    }}
                  >
                    Sửa
                  </Button>
                )}

                {isEditName && (
                  <Stack spacing={2} direction={"row"}>
                    <Button
                      variant="text"
                      size="small"
                      color="inherit"
                      onClick={() => {
                        setIsEditName(!isEditName);
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => {
                        setIsEditName(!isEditName);
                      }}
                    >
                      Lưu
                    </Button>
                  </Stack>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <TextField
                  label="Email"
                  defaultValue="quanlyktx@gmail.com"
                  disabled={!isEditEmail}
                  helperText="Cung cấp đúng email để lấy lại mật khẩu khi cần thiết"
                  sx={{
                    flex: 1,
                  }}
                />
                {!isEditEmail && (
                  <Button
                    variant="text"
                    color="primary"
                    sx={{
                      height: "57px",
                    }}
                    onClick={() => {
                      setIsEditEmail(!isEditEmail);
                    }}
                  >
                    Sửa
                  </Button>
                )}

                {isEditEmail && (
                  <Stack spacing={2} direction={"row"}>
                    <Button
                      variant="text"
                      size="small"
                      color="inherit"
                      onClick={() => {
                        setIsEditEmail(!isEditEmail);
                      }}
                      sx={{
                        height: "57px",
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => {
                        setIsEditEmail(!isEditEmail);
                      }}
                      sx={{
                        height: "57px",
                      }}
                    >
                      Lưu
                    </Button>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProfileSection;
