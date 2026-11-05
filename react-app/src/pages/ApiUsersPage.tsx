import { ApiUserCardGrid } from "../components/ApiUserCard";


function ApiUsersPage() {
  const apiURL = 'https://jsonplaceholder.typicode.com/users';

  return (
    <>
      <h1 className="app-title">API Users Management</h1>
      <section className="cards-section">
        <h2 className="section-title">User Cards</h2>
        <p className="api-url">
          <a href={apiURL} target="_blank" rel="noopener noreferrer">
            {apiURL}
          </a>
        </p>
        <ApiUserCardGrid endpoint={apiURL} />
      </section>
    </>
  )
}

export default ApiUsersPage;