import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
const HeaderComponent = ({ setIsLoggedIn }) => {
  const handleSignOut = () => {
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
   
};
  return (
    <div>
      <header>
        <div className="container-fluid">
          <div className="row" >
            {/* Room Dropdown */}
            <div className="col-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle w-100"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Room
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                  <Link className="dropdown-item text-center" to="/rooms">List Room</Link>
                  <Link className="dropdown-item text-center" to="/add-room">Add Room</Link>
                </ul>
              </div>
            </div>

            {/* Customer Dropdown */}
            <div className="col-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle w-100"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Customer
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton2">
                  <Link className="dropdown-item text-center" to="/customers">List Customer</Link>
                </ul>
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="col-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle w-100"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Service
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton3">
                  <Link className="dropdown-item text-center" to="/accompaniedService">List Service</Link>
                  <Link className="dropdown-item text-center" to="/add-accompaniedService">Add AccompaniedService</Link>
                </ul>
              </div>
            </div>
             {/* Sign Out */}
             <div className="col-6 d-flex justify-content-end">
             <div className="container-fluid">
                    <div className="row d-flex justify-content-end">
                        {/* Thay thế dropdown bằng nút */}
                        <div className="col-2">
                            <Link to="/">
                                <button className="btn btn-primary w-100" onClick={handleSignOut}>
                                    Đăng xuất
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
HeaderComponent.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // setIsLoggedIn phải là một hàm
};
export default HeaderComponent;
