import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import DynamicFormComponent from './DynamicFormComponent';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-fullWidth': {
      margin: theme.spacing(1)
    }
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }
}));

const courses = [
  { key: 'WEB_DEV', value: 'Web Development' },
  { key: 'UI_DESIGN', value: 'UI Design' },
  { key: 'SKETCHING', value: 'Sketching' },
  { key: 'CONTENT_WRITING', value: 'Content Writing' }
];

const levels = [
  { key: 'BEGINNER', value: 'Beginner' },
  { key: 'INTERMEDIATE', value: 'Intermediate' },
  { key: 'ADVANCED', value: 'Advanced' }
];

const dynamics = [
  { field: 'docs', title: 'Documents' },
  { field: 'videos', title: 'Videos' },
  { field: 'tools_and_sources', title: 'Tool And Sources' }
];

const initialValues = {
  name: '',
  course_name: 'WEB_DEV',
  description: '',
  introduction: '',
  submission: '',
  max_points: 0,
  time_complete: 0,
  level: 'BEGINNER',
  docs: [{ title: '', link: '' }],
  videos: [{ title: '', link: '' }],
  tools_and_sources: [{ title: '', link: '' }]
};

const ModalForm = ({ activeTask, activeCourse, addNewTask, handleClose }) => {
  const classes = useStyles();

  const jsonToObj = items => items.map(item => JSON.parse(item));

  const onSubmit = values => {
    if (!activeTask) addNewTask(values);
    handleClose();
  };

  return (
    <Formik
      initialValues={
        activeTask
          ? {
              name: activeTask[0]?.name,
              course_name: activeTask[0]?.course_name,
              description: activeTask[0]?.description,
              introduction: activeTask[0]?.introduction,
              submission: activeTask[0]?.submission,
              max_points: activeTask[0]?.max_points,
              time_complete: activeTask[0]?.time_complete,
              level: activeTask[0]?.level,
              docs: jsonToObj(activeTask[0]?.docs),
              videos: jsonToObj(activeTask[0]?.videos),
              tools_and_sources: jsonToObj(activeTask[0]?.tools_and_sources)
            }
          : activeCourse
          ? { ...initialValues, course_name: activeCourse }
          : initialValues
      }
      onSubmit={onSubmit}
      render={({ values, handleChange, handleSubmit }) => (
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth={true}
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="course_name"
                select
                label="Course"
                value={values.course_name}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
              >
                {courses.map(option => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            name="introduction"
            label="Enter an introduction"
            multiline={true}
            variant="outlined"
            fullWidth={true}
            minRows={3}
            value={values.introduction}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Enter a description"
            multiline={true}
            variant="outlined"
            fullWidth={true}
            minRows={3}
            value={values.description}
            onChange={handleChange}
          />
          <TextField
            name="submission"
            label="Enter submission text"
            multiline={true}
            variant="outlined"
            fullWidth={true}
            minRows={3}
            value={values.submission}
            onChange={handleChange}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="max_points"
                label="Max points"
                variant="outlined"
                fullWidth={true}
                value={values.max_points}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="time_complete"
                label="Completion Time"
                variant="outlined"
                fullWidth={true}
                value={values.time_complete}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <TextField
            name="level"
            select
            label="Level"
            value={values.level}
            onChange={handleChange}
            variant="outlined"
            fullWidth={true}
          >
            {levels.map(option => (
              <MenuItem key={option.key} value={option.key}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          {dynamics.map((item, k) => (
            <DynamicFormComponent
              key={k}
              values={values}
              handleChange={handleChange}
              classes={classes}
              field={item.field}
              title={item.title}
            />
          ))}
          <Button variant="contained" color="primary" fullWidth={true} type="submit">
            Submit
          </Button>
        </form>
      )}
    />
  );
};

export default ModalForm;
