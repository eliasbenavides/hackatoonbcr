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
import { getLocations, getProfessions } from "../services/api";
import { useEffect, useState } from "react";

const CreateUser = () => {
  const { control, handleSubmit } = useForm();
  const [professions, setProfessions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  const [proviceSelected, setProviceSelected] = useState(null);

  useEffect(() => {
    getProfessionsList();
    getProvincesList();
  }, []);

  useEffect(() => {
    if (!proviceSelected) return;
    getRegionsList();
  }, [proviceSelected]);

  const getProfessionsList = async () => {
    try {
      const { data } = await getProfessions();
      setProfessions(
        data?.detalle?.map(({ nombreProfesion, id }) => {
          return {
            label: nombreProfesion,
            value: id,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getProvincesList = async () => {
    try {
      const { data } = await getLocations(0);
      setProvinces(
        data?.detalle?.map(({ id, nombreUbicacion }) => {
          return {
            label: nombreUbicacion,
            value: id,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRegionsList = async () => {
    try {
      const { data } = await getLocations(proviceSelected);
      setRegions(
        data?.detalle?.map(({ id, nombreUbicacion }) => {
          return {
            label: nombreUbicacion,
            value: id,
          };
        })
      );
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
            name="nombre"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Nombre y Apellido" fullWidth />
            )}
          />
          <Controller
            name="edad"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Edad" type="number" fullWidth />
            )}
          />

          <Controller
            name="sexo"
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
            name="idProfesion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Profesion</InputLabel>
                <Select label="Profesion" {...field}>
                  {professions &&
                    professions?.map(({ label, value }, index) => (
                      <MenuItem key={index} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="correo"
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
            name="idProvincia"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Provincia</InputLabel>
                <Select
                  label="Provincia"
                  {...field}
                  onChange={(e) => {
                    setProviceSelected(e.target.value);
                    field.onChange(e);
                  }}
                >
                  {provinces &&
                    provinces?.map(({ label, value }, index) => (
                      <MenuItem key={index} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="idCanton"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Canton</InputLabel>
                <Select
                  disabled={proviceSelected ? false : true}
                  label="Canton"
                  {...field}
                >
                  {regions &&
                    regions?.map(({ label, value }, index) => (
                      <MenuItem key={index} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
