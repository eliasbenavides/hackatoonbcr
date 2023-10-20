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
import { getLocations, getProfessions } from "../services/api";
import { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";

const CreateUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const onSubmit = (data) => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      console.log(data); // Realizar acción con los datos finales
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          height: "67%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                maxLength: {message: 'No puede ser mayor a 8 digitos', value: 8},
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono"
                  type="number"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
              )}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box display="flex" flexDirection="column">
            <Controller
              name="nombreApellido"
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
                  sx={{ marginBottom: 2 }}
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
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
