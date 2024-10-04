import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const SignOut = () => {
    return (
        <div>
             <header>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-end">
                        {/* Thay thế dropdown bằng nút */}
                        <div className="col-2">
                            <Link to="/SignIn">
                                <button className="btn btn-primary w-100">
                                    Đăng xuất
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default SignOut