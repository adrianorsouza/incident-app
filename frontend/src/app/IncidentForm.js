import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { meta_level, meta_types } from '../utils/metadata';

const useStyles = makeStyles((theme) => ({
  cardActions: {
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(4),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formTitle: {
    textAlign: 'center',
  },
}));

const IncidentForm = ({
  values,
  handleSubmit,
  handleCancel,
  error,
  ...props
}) => {
  const classes = useStyles();

  const validate = (values) => {
    const errors = {};
    ['title', 'description', 'level', 'type'].forEach((el, key) => {
      if (!values[el]) {
        errors[el] = 'Preenchimento Obrigatório';
      }
    });
    return errors;
  };

  const hasError = (field, form) => {
    return !!(form.submitCount && form.dirty && form.errors[field]);
  };

  return (
    <>
      <Card elevation={props.elevation}>
        <Formik
          initialValues={{
            title: values.title || '',
            description: values.description || '',
            level: values.level || '',
            type: values.type || '',
            status: values.status !== undefined ? values.status : false,
          }}
          onSubmit={handleSubmit}
          validate={validate}
          validateOnBlur={false}
        >
          {({ ...form }) => (
            <>
              <Form noValidate autoComplete="off">
                <CardContent>
                  <Box marginBottom={3} marginTop={3}>
                    <Typography variant="h5">
                      Preencha corretamente o fomulário abaixo.
                    </Typography>
                  </Box>

                  {error && (
                    <Alert severity="error" variant="outlined">
                      {error}
                    </Alert>
                  )}

                  {!!(form.submitCount && !form.isValid) && (
                    <Alert severity="error">Fomulário contém erros.</Alert>
                  )}

                  <TextField
                    autoFocus
                    margin="normal"
                    id="title"
                    label="Título"
                    type="text"
                    fullWidth
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    defaultValue={values.title}
                    required
                    inputProps={{
                      maxLength: 255,
                    }}
                    error={hasError('title', form)}
                  />

                  <TextField
                    className={classes.formControl}
                    margin="normal"
                    id="description"
                    label="Descrição"
                    type="textbox"
                    fullWidth
                    multiline
                    defaultValue={values.description}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                    inputProps={{
                      maxLength: 500,
                    }}
                    error={hasError('description', form)}
                  />

                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    margin="normal"
                  >
                    <InputLabel id="level" required>
                      Criticidade
                    </InputLabel>
                    <Select
                      labelId="level"
                      id="level-select"
                      name="level"
                      value={form.values.level}
                      onChange={form.handleChange}
                      required
                      error={hasError('level', form)}
                    >
                      {meta_level.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    margin="normal"
                  >
                    <InputLabel id="type-label" required>
                      Tipo de Incidente
                    </InputLabel>
                    <Select
                      labelId="type-label"
                      id="type-select"
                      name="type"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.type}
                      required
                      error={hasError('type', form)}
                    >
                      {meta_types.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    margin="normal"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Atual Status do incidente
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            name="status"
                            defaultChecked={!!values.status}
                            checked={form.status}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        }
                        label="Ativo"
                      />
                    </FormGroup>
                  </FormControl>
                </CardContent>
                <Divider light />
                <CardActions className={classes.cardActions}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!form.isValid || form.isSubmitting}
                  >
                    Salvar
                  </Button>
                  <Button onClick={handleCancel} color="secondary">
                    Cancelar
                  </Button>
                </CardActions>
              </Form>
            </>
          )}
        </Formik>
      </Card>
    </>
  );
};

IncidentForm.defaultProps = {
  elevation: 1,
};

IncidentForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default IncidentForm;
