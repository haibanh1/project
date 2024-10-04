import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
const LoginComponent = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Giả sử đăng nhập thành công
        console.log('Đăng nhập thành công với:', { email, password });
        setError('');
        setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
        // Chuyển hướng đến trang chính hoặc trang mong muốn
        navigate('/'); // Hoặc đường dẫn bạn muốn
        // Reset form
        setEmail('');
        setPassword('');
    };

    return (
        <div style={styles.container}>
            <h2>Đăng Nhập</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Đăng Nhập</button>
            </form>
        </div>
    );
};
LoginComponent.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired, // setIsLoggedIn phải là một hàm
};
const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default LoginComponent;
