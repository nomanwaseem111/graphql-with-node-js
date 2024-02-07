
import './App.css'
import { useQuery, gql } from '@apollo/client';

const query = gql`
  query getAllTodos{
    getTodos{
      title,
      id,
      completed
    }
  }
`


function App() {
  const {data,loading,error} = useQuery(query)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
     {JSON.stringify(data)}
        </div>
  )
}

export default App
