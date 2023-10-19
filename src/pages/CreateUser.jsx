import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";
import Layout from "../layouts/Layout";

const CreateUser = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Typography alignSelf="flex-start" variant="subtitle1">
        Entrar al equipo
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{height: '90%'}}>
        <Box height="100%" justifyContent='space-around'>
          <Controller
            name="nombreApellido"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Nombre y Apellido" fullWidth />
            )}
          />
          <Controller
            name="fechaNacimiento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Fecha de Nacimiento"
                fullWidth
              />
            )}
          />
          <Controller
            name="genero"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <FormLabel>Genero</FormLabel>
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="femenino"
                    control={<Radio />}
                    label="Femenino"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <Controller
            name="profesion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Profesion</InputLabel>
                <Select {...field}>
                  <MenuItem value="ingeniero">Ingeniero</MenuItem>
                  <MenuItem value="medico">Médico</MenuItem>
                  <MenuItem value="abogado">Abogado</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth />
            )}
          />
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Teléfono" type="number" fullWidth />
            )}
          />
          <Controller
            name="direccion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Direccion" type="number" fullWidth />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </Box>
        {/* <TextField label="Nombre completo" fullWidth />
        <TextField label="Correo electronico" fullWidth />
        <TextField label="Fecha de nacimiento" fullWidth />
        <TextField label="Genero" fullWidth />
        <TextField label="Telefono" fullWidth />
        <TextField label="Profesion" fullWidth />
        <TextField label="Direccion" fullWidth /> */}
      </form>
    </>
  );
};

export default CreateUser;
