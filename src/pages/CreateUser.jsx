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
} from "@mui/material";
import Layout from "../layouts/Layout";

const CreateUser = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Layout>
      <div>
        <h3>Create User</h3>
        <div>
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </div>
      </div>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nombreApellido"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Nombre y Apellido" />
            )}
          />
          <Controller
            name="fechaNacimiento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="date" label="Fecha de Nacimiento" />
            )}
          />
          <Controller
            name="genero"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl>
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
              <FormControl>
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
              <TextField {...field} label="Email" type="email" />
            )}
          />
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Teléfono" type="number" />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default CreateUser;
