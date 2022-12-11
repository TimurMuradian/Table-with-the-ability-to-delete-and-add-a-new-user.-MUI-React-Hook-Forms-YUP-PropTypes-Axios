import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import * as yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

const UserForm = ({ onCreate }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }, 
  });

  const onSubmit = (data) => {
    onCreate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={3}>
        <Box my={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Box>
        <Box my={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="E-mail"
                error={errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>
        <Box my={2}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                error={errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

UserForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default UserForm;
