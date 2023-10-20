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
  FormHelperText,
} from "@mui/material";
import { createUser, getLocations, getProfessions } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../components/Alert";
const CreateUser = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [professions, setProfessions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  const [alertValue, setAlertValue] = useState({
    type: "success",
    text: "",
    show: false,
  });

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
        edad: +dataValues.edad,
      };
      try {
        await createUser(body);
        navigate("/");
      } catch (error) {
        setAlertValue((prev) => ({
          ...prev,
          type: "error",
          text: "No se pudo crear el usuario",
          show: true,
        }));
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
      setAlertValue((prev) => ({
        ...prev,
        type: "error",
        text: "No se pudo obtener el listado de profesiones",
        show: true,
      }));
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
      setAlertValue((prev) => ({
        ...prev,
        type: "error",
        text: "No se pudo obtener el listado de provincias",
        show: true,
      }));
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
      setAlertValue((prev) => ({
        ...prev,
        type: "error",
        text: "No se pudo obtener el listado de cantones",
        show: true,
      }));
    }
  };

  return (
    <>
      <Alert
        isActive={alertValue.show}
        handleClose={() => setAlertValue((prev) => ({ ...prev, show: false }))}
        text={alertValue.text}
        alertType={alertValue.type}
      />
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
          minHeight: "67%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column">
            <Controller
              name="correo"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Ingrese un correo electrónico válido",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="text"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  error={!!errors.correo}
                  helperText={errors.correo && errors.correo.message}
                />
              )}
            />
            <Controller
              name="telefono"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                maxLength: {
                  message: "No puede ser mayor a 8 digitos",
                  value: 8,
                },
                minLength: {
                  message: "No puede ser menor a 8 digitos",
                  value: 8,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono"
                  type="number"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  error={!!errors.telefono}
                  helperText={errors.telefono && errors.telefono.message}
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
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre y Apellido"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  error={!!errors.nombre}
                  helperText={errors.nombre && errors.nombre.message}
                />
              )}
            />
            <Controller
              name="edad"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Edad"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                  error={!!errors.edad}
                  helperText={errors.edad && errors.edad.message}
                />
              )}
            />
            <Controller
              name="sexo"
              control={control}
              defaultValue=""
              rules={{
                required: "Debe seleccionar una opcion",
              }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.sexo}
                  helperText={errors.sexo && errors.sexo.message}
                >
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
                  {errors.sexo && (
                    <FormHelperText>{errors.sexo.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="idProvincia"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Provincia</InputLabel>

                  <Select
                    label="Provincia"
                    error={!!errors.idProvincia}
                    helperText={
                      errors.idProvincia && errors.idProvincia.message
                    }
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
                  {errors.idProvincia && (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      Este campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="idCanton"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Canton</InputLabel>
                  <Select
                    disabled={proviceSelected ? false : true}
                    label="Canton"
                    error={!!errors.idCanton}
                    helperText={errors.idCanton && errors.idCanton.message}
                    {...field}
                  >
                    {regions &&
                      regions?.map(({ label, value }, index) => (
                        <MenuItem key={index} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.idCanton && (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      Este campo es requerido
                    </FormHelperText>
                  )}
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
              rules={{
                required: "Este campo es requerido",
              }}
              helperText={errors.idProfesion && errors.idProfesion.message}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Profesion</InputLabel>
                  <Select
                    label="Profesion"
                    {...field}
                    error={!!errors.idProfesion}
                    helperText={
                      errors.idProfesion && errors.idProfesion.message
                    }
                  >
                    {professions &&
                      professions?.map(({ label, value }, index) => (
                        <MenuItem key={index} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.idProfesion && (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      Este campo es requerido
                    </FormHelperText>
                  )}
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
