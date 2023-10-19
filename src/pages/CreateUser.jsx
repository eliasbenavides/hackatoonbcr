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
import { professions } from "../data-mock/professions";
import { getProfessions } from "../services/api";
import { useEffect, useState } from "react";

const CreateUser = () => {
  const { control, handleSubmit } = useForm();
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
  }, []);

  const getProfessionsList = async () => {
    try {
      const { data } = await getProfessions();
      console.log(data);
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
              name="email"
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
              name="phone"
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
              name="direccion"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Direccion"
                  type="number"
                  fullWidth
                />
              )}
            />
            <Controller
              name="direccion"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Direccion"
                  type="number"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Controller
            name="profesion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
        )}

        <Button
          type="submit"
          alignSelf="center"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            width: "100%",
          }}
        >
          {
            activeStep === 0 || activeStep === 1 ? 'Continuar' : 'Unirme'
          }
        </Button>
      </form>
    </>
  );
};

export default CreateUser;
