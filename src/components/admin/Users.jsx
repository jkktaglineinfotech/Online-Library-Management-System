import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import { createUser, deleteUser, getUsers, updateUser } from "../../apis/user";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { validateUserInfo } from "../../utils/helper";
import { useAdmin, useAuthToken } from "../../hooks";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Users = () => {

  const token = useAuthToken();
  const admin = useAdmin();

  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [newUser, setNewUser] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const fetchUsers = async () => {
    const { message, data } = await getUsers(token);
    console.log("Users", data);
    setUsers([...data]);
  };
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    const finalUser = {
      name: newUser.name,
      email: newUser.email,
      userName: newUser.userName,
      contact: newUser.contact,
      password: newUser.password,
    };
    console.log(finalUser);
    const { ok, error } = validateUserInfo({
      name: newUser.name,
      email: newUser.email,
      userName: newUser.userName,
      contact: newUser.contact,
      password: newUser.password,
    });
    if (!ok) return alert(error);
    const { data, message } = await updateUser(selectedUser._id, finalUser, token);
    console.log(data);
    if (message === "User updated successfully") {
      Swal.fire({
        title: "Updated!",
        text: "User update successfully !",
        icon: "success",
        showConfirmButton: false,
      });
    }
    const updatedUsers = users.map((user) =>
      user._id === selectedUser._id ? newUser : user
    );
    setUsers(updatedUsers);
    setOpenDialog(false);
  };

  const handleAddUser = async () => {
    const finalUser = {
      name: newUser.name,
      email: newUser.email,
      userName: newUser.userName,
      contact: newUser.contact,
      password: newUser.password,
    };
    console.log(finalUser);
    const { ok, error } = validateUserInfo({
      name: newUser.name,
      email: newUser.email,
      userName: newUser.userName,
      contact: newUser.contact,
      password: newUser.password,
    });
    if (!ok) return alert(error);
    const { data, message } = await createUser(finalUser, token);
    console.log(data);
    if (message === "User created successfully") {
      Swal.fire({
        title: "Updated!",
        text: "User update successfully !",
        icon: "success",
        showConfirmButton: false,
      });
    }
    setUsers({ ...users, data });
    handleClose2();
  };
  const handleView = (user) => {
    handleOpen();
    setSelectedUser(user);
  };

  const handleEdit = (user) => {
    handleOpenDialog(user);
  };

  const handleDelete = async (id) => {
    const data = await deleteUser(id, token);
    console.log(data);
    if (data && data.message === "User deleted successfully") {
      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully !",
        icon: "success",
        showConfirmButton: false,
      });
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    }
  };
const navigate = useNavigate()
  useEffect(() => {
  if(!admin){
    return navigate("/")
  }
    fetchUsers();
  }, []);



  return (
    <>
      <div>
        <Button onClick={handleOpen}>User Details</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Name : {selectedUser.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              UserName : {selectedUser.userName}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email : {selectedUser.email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              contact : {selectedUser.contact}
            </Typography>
          </Box>
        </Modal>
      </div>

      <div style={{ overflow: "auto", flex: 1, marginLeft: "250px" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Users</Typography>
            <Button
              color="inherit"
              style={{ marginLeft: "auto" }}
              onClick={() => handleOpen2()}
            >
              Add User
            </Button>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleView(user)}>
                      View
                    </Button>
                    <Button variant="outlined" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={newUser.name || ""}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={newUser.email || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={newUser.password || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <TextField
              label="UserName"
              fullWidth
              value={newUser.userName || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
            />
            <TextField
              label="Contact"
              fullWidth
              value={newUser.contact || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, contact: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open2} onClose={handleClose2}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={newUser.name || ""}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={newUser.email || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={newUser.password || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <TextField
              label="UserName"
              fullWidth
              value={newUser.userName || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
            />
            <TextField
              label="Contact"
              fullWidth
              value={newUser.contact || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, contact: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Users;
