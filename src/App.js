import axios from "./helpers/axios";
import { useEffect, useState } from "react";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";



function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios.get("/users").then(response => {
      setUsers(response);
      setIsLoading(false)
    });
  }, []);

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers)
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreate = (data) => {
    const newUser = {
      ...data,
      id: users.length+1
    }
    setUsers([...users, newUser])

    handleDialogClose();
  }
  return (
    <div>
      <Box p={3}>
        <Button variant="contained" onClick={handleDialogOpen}>
          Add new user
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add new user</DialogTitle>
        <UserForm onCreate={handleCreate} />
      </Dialog>

      <UsersTable users={users} isLoading={isLoading} onDelete={handleDelete} />
    </div>
  );
}

export default App;
