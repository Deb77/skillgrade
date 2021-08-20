import { Grid, TextField, Typography } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon, Delete as DeleteIcon } from '@material-ui/icons/';
import { FieldArray } from 'formik';

const DynamicFormComponent = ({ values, handleChange, classes, field, title }) => {
  return (
    <FieldArray
      name={field}
      render={arrayHelpers => {
        const { push, remove } = arrayHelpers;
        return (
          <>
            <Typography>{title}</Typography>
            {values[field].map((doc, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={5}>
                  <TextField
                    name={`${field}.${index}.title`}
                    label="Title"
                    variant="outlined"
                    fullWidth={true}
                    value={doc.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    name={`${field}.${index}.link`}
                    label="Link"
                    variant="outlined"
                    fullWidth={true}
                    value={doc.link}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={1} className={classes.icon}>
                  <AddCircleOutlineIcon
                    style={{ color: 'blue' }}
                    onClick={() => push({ title: '', link: '' })}
                  />
                </Grid>
                {values[field].length > 1 && (
                  <Grid item xs={1} className={classes.icon}>
                    <DeleteIcon style={{ color: 'red' }} onClick={() => remove(index)} />
                  </Grid>
                )}
              </Grid>
            ))}
          </>
        );
      }}
    ></FieldArray>
  );
};

export default DynamicFormComponent;
