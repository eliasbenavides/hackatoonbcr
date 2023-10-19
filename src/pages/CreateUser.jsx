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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { createUser, getLocations, getProfessions } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [professions, setProfessions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  const [proviceSelected, setProviceSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Contacto", "Informacion Personal", "Área de Trabajo"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (dataValues) => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      // Realizar acción con los datos finales
      const body = {
        ...dataValues,
        idCanton: +dataValues?.idCanton,
        idProfesion: +dataValues?.idProfesion,
        idProvincia: +dataValues?.idProvincia,
        edad: +dataValues.edad,
        id: 1,
      };
      try {
        await createUser(body);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  return (
    <>
      <Typography alignSelf="flex-start" variant="h4">
        Unete a nuestro Equipo Digital
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: 3 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "70%" }}>
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column">
            <Controller
              name="correo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="telefono"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono"
                  type="number"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box display="flex" flexDirection="column">
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre y Apellido"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="edad"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Edad"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="sexo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel>Genero</FormLabel>
                  <RadioGroup
                    {...field}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
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
                    <FormControlLabel
                      value="otro"
                      control={<Radio />}
                      label="Otro"
                    />
                  </RadioGroup>
                </FormControl>
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
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Controller
              name="idProfesion"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            width: "100%",
          }}
        >
          {activeStep === 0 || activeStep === 1 ? "Continuar" : "Unirme"}
        </Button>
      </form>
    </>
  );
};

export default CreateUser;
