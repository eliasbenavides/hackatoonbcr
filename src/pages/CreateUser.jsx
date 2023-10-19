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
  Typography,
  Box,
} from "@mui/material";
import { professions } from "../data-mock/professions";
import { getProfessions } from "../services/api";
import { useEffect } from "react";

const CreateUser = () => {
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    getProfessionsList();
  }, []);

  const getProfessionsList = async () => {
    try {
      const { data } = await getProfessions();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Typography alignSelf="flex-start" variant="subtitle1">
        Entrar al equipo
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "90%" }}>
        <Box height="100%" justifyContent="space-around">
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
                InputLabelProps={{ shrink: true }}
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
                <Select label="Profesion" {...field}>
                  {professions &&
                    professions?.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
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
      </form>
    </>
  );
};

export default CreateUser;
