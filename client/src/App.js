import './App.css';
import axios from 'axios';

function App() {
  console.log(process.env);
  const onChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const fileEncoded = reader.result;

      // service goes here

      axios
        .post('https://skill-grade-backend.herokuapp.com/task-feed', {
          work_upload: fileEncoded,
          description: 'text',
          task_id: '0539eb2c-37ad-4c69-a30e-96d2d92f4dc6',
          user_id: 'b180aefb-35d2-47db-8f4a-88b53a50da43'
        })
        .then(res => console.log(res));
    };
    // const formData = new FormData();
    // formData.set('encType', 'multipart/form-data');
    // formData.append('file', file);

    // try {
    //   const res = await axios.put('http://localhost:7000/user-tasks/complete-user-task', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    // } catch (er) {
    //   console.log(er);
    // }
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <input name="image" type="file" onChange={onChange} />
    </div>
  );
}

export default App;
