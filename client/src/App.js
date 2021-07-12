import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";
import {CREATE_USER} from "./mutations/user";

function App() {

  const {data, loading, error} = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername("")
      setAge(0)
    })
  }

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  return (
    <div className="App">
      <form className="form">
        <h1>Test GraphQL</h1>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="number" value={age} onChange={e => setAge(e.target.value)}/>
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Submit</button>
          <button>Get</button>
        </div>
      </form>
      { loading ? <h1>Loading...</h1> : users.map((user) => {
          return (
            <div className="users" key={user.id}>
              <h1>{user.username}: {user.id}</h1>
              <h3>Age: {user.age}</h3>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
