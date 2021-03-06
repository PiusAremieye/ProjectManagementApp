import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProjectTask, updateProjectTask} from "../../../actions/backlogActions"

class UpdateProjectTask extends Component {
    constructor(props){
        super(props)

        this.state = {
            id:"",
            projectSequence:"",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority:0,
            dueDate:"",
            projectIdentifier :"",
            createdAt:"",
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount(){
        const { backlog_id, pt_sequence } = this.props.match.params
        this.props.getProjectTask(backlog_id, pt_sequence, this.props.history)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        
        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createdAt
        } = nextProps.project_task

        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,            
            createdAt
        })
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        const updateProjectTask = {            
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,            
            projectIdentifier: this.state.projectIdentifier,            
            createdAt: this.state.createdAt

        }

        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updateProjectTask, this.props.history) 
    }
    render() {        
        const { errors } = this.state
        return (
            <div className="add-projectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">Back to project Board</Link>
                            <h6 className="display-4 text-center">Update Project Task</h6>
                            <p className="lead text-center">Project Name: {this.state.projectIdentifier} + 
                            Project Task ID: {this.state.projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid":errors.summary
                                        })} 
                                        name="summary" 
                                        placeholder="Project Task summary" 
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback text-left">{errors.summary}</div>
                                    )}                                    
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control form-control-lg"
                                        name="acceptanceCriteria"
                                        placeholder="Acceptance Criteria"
                                        value={this.state.acceptanceCriteria} 
                                        onChange={this.onChange}
                                    />                                    
                                </div>
                                <h6 className="text-left">Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date" 
                                        className="form-control form-control-lg"  
                                        name="dueDate"                                        
                                        value={this.state.dueDate} 
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"               
                                        value={this.state.priority} 
                                        onChange={this.onChange} 
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="status"                            
                                        value={this.state.status}   
                                        onChange={this.onChange}                                     
                                    >
                                        <option value="">Select status</option>
                                        <option value="TO_DO">TODO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-outline-secondary btn-lg btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    project_task: state.backlog.project_task,
    errors: state.errors
})
export default connect(
    mapStateToProps,
    {getProjectTask, updateProjectTask}
    )(UpdateProjectTask);