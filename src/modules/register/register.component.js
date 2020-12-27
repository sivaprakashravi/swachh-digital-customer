import React from 'react';
import register from "../../services/fetchsvc.service";
import {GrStatusInfo} from 'react-icons/gr';
import './register.style.scss';
import storage from '../../services/storage-manager.service';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storename: '',
            email: '',
            mobile: '',
            password: '',
            showPassword: '',
            confirmPassword: '',
            submitted: false,
            validate: {}
        };
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    validatePassword(pw) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.match(pw);
    }

    async signUP() {
        try {
            const data = {
                "email": this.state.email,
                "password": this.state.password,
                "returnSecureToken": true
            }
            const dataApi = await register.post('signUp', data);
            const { idToken, email, localId } = dataApi;
            storage.put('userToken', JSON.stringify({ idToken, email, localId }));
            this.props.history.push('storeRegister');
        } catch (error) {
            console.log("signup error", error)
        }
    }

    disableSubmit() {
        return !(this.validateEmail(this.state.email) && this.state.password && this.state.confirmPassword && this.state.password === this.state.confirmPassword);
    }

    userNameControls() {
        return (
            <ul className={this.state.submitted ? 'submitted' : ''}>
                <li className={this.state.validate.email}>
                    <label>Email:</label>
                    <input type="text" value={this.state.email} onChange={(e) => { this.handleChange(e, 'email'); }} />
                </li>
                <li className={this.state.validate.password ? 'error' : ''}>
                    <label>Password: <i data-title="Password should be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"><GrStatusInfo /></i></label>
                    <input type={!this.state.showPassword ? 'password' : 'text'} value={this.state.password} onChange={(e) => { this.handleChange(e, 'password') }} />
                </li>
                <li className={this.state.validate.password ? 'error' : ''}>
                    <label>Confirm Password:</label>
                    <input type="text" value={this.state.confirmPassword} onChange={(e) => { this.handleChange(e, 'confirmPassword') }} />
                </li>
                <li>
                    <button className="primary" disabled={this.disableSubmit()} onClick={() => this.signUP()}>Save &amp; continue</button>
                </li>
                <li className="sign-up">Already have an account? <label onClick={() => this.props.history.push('')}>Login</label></li>
            </ul>
        )
    }

    controls() {
        return (
            <div className="controls">
                {this.userNameControls()}
            </div>)
    }

    render() {
        return (
            <div>
                <div className="greet">
                    <h3>Welcome to</h3>
                    <h1>Swachh Digital</h1>
                </div>
                <div className="register">
                    {this.controls()}
                </div>
            </div>
        );
    }
}

export default Register;