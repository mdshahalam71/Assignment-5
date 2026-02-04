import "../assets/css/custom.css";
import "../assets/css/bootstrap.css";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <Link to="/" class="navbar-brand text-uppercase text-success">
            <strong>
              My Contact App
            </strong>
          </Link>
        </div>
      </nav>
  )
}
