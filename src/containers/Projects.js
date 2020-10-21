import {connect} from 'react-redux';
import Projects from '../views/Projects';
import {fetchProjects, registerProject} from '../actions/projects.actions'
import {projectsConstants} from "../constants";

const mapStateToProps = (state, _) => ({
  projects: state.projects.rows,
  error: state.projects.error
});

const mapDispatchToProps = dispatch => ({
  fetchProjects() {
    dispatch(fetchProjects());
  },
  registerProject(name, symbol, target) {
    dispatch(registerProject(name, symbol, target));
  },
  pushNewProjectRow() {
    dispatch({type: projectsConstants.PUSH_NEW_PROJECT_ROW});
  },
  setEditMode(projectSymbol) {
    dispatch({type: projectsConstants.SET_EDIT_MODE, projectSymbol});
  },
  unsetEditMode() {
    dispatch({type: projectsConstants.UNSET_EDIT_MODE});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
