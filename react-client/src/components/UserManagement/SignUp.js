import React, { Component } from 'react'
import { createNewUser } from '../../actions/securityActions'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

class SignUp extends Component {
    constructor(){
        super()

        this.state ={
            "username":"",
            "password":"",
            "confirmPassword":"",
            "fullName":"",
            errors:{} 
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault()
        const newUser = {
            username:this.state.username,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            fullName:this.state.fullName
        }

        this.props.createNewUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create Your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control", {
                                            "is-invalid":errors.fullName
                                        })} 
                                        placeholder="Full Name" 
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.onChange}
                                    />
                                    {errors.fullName && (
                                        <div className="invalid-feedback text-left">{errors.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        className={classnames("form-control", {
                                            "is-invalid":errors.username
                                        })} 
                                        placeholder="Email Address" 
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback text-left">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control", {
                                            "is-invalid":errors.password
                                        })} 
                                        placeholder="Password" 
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback text-left">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control", {
                                            "is-invalid":errors.confirmPassword
                                        })} 
                                        placeholder="Confirm Password" 
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback text-left">{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-outline-info btn-lg btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}

SignUp.propTypes ={
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    { createNewUser }
    )(SignUp)
