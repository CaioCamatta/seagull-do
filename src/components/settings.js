import React from 'react';
import { BsToggleOff } from "react-icons/bs/";
import { BsToggleOn } from "react-icons/bs/";
import { IoIosArrowUp } from "react-icons/io/";
import { IoIosArrowDown } from "react-icons/io/";
import { Dropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap';
import './settings.css'

// Settings Component
export default class Settings extends React.Component {

    constructor(props) {
        super(props);

        // Defines default settings for the application.
        let default_settings = {
            dark_mode: false,
            week_starts_on: "Monday",
            default_task_folder: null,
            seagull_icon: "seagull1.png",
            tasks_for_level_up: 5,
            seagull_scream: "scream1.mp3",
            seagull_scream_disabled: false
        };

        const settingsFromStorage = localStorage.getItem("seagull_settings")

        // If no settings file exists, create it with default parameters.
        if (settingsFromStorage === null || settingsFromStorage === "{}" || Object.keys(settingsFromStorage) === 0) {
            this.state = default_settings;
            this.saveSettings();
        }
        // Otherwise, get the settings from local storage and save it to the component state.
        else {
            this.state = JSON.parse(localStorage.getItem("seagull_settings"));
        }

        this.state["folders"] = this.getFolders();
    }

    // Pull the task folders from local storage.
    getFolders() {
        this.setState({folders: localStorage.getItem("task_data").folders});
        if (!(this.state.default_task_folder in this.state.folders)) {
            this.setDefaultTaskFolder(null);
        }
    }

    // Save any changes to settings and callback changes to parent component.
    saveSettings() {

        let settings = {
            dark_mode: this.state.dark_mode,
            week_starts_on: this.state.week_starts_on,
            default_task_folder: this.state.default_task_folder,
            seagull_icon: this.state.seagull_icon,
            tasks_for_level_up: this.state.tasks_for_level_up,
            seagull_scream: this.state.seagull_scream,
            seagull_scream_disabled: this.state.seagull_scream_disabled                
        };

        localStorage.setItem("seagull_settings", JSON.stringify(settings));
        this.props.onChange();
    }

    // Play a seagull scream.
    playScream() {
        let path = require("../screams/" + this.state.seagull_scream);
        let audio = new Audio(path);
        audio.play();
    }

    // Functions for modifying the settings based on user input.
    toggleDarkMode() {
        this.setState(prevState => ({dark_mode: !prevState.dark_mode}),
            () => this.saveSettings());
    }

    setWeekStartsOn(day) {
        this.setState({week_starts_on: day},
            () => this.saveSettings());
    }

    setDefaultTaskFolder(folder_name) {
        this.setState({default_task_folder: folder_name},
            () => this.saveSettings());
    }

    setSeagullIcon(icon) {
        this.setState({seagull_icon: icon},
            () => this.saveSettings());
    }

    setTaskForLevelUp(num) {
        this.setState({tasks_for_level_up: num},
            () => this.saveSettings());
    }

    incrementNumTasks() {
        this.setState({tasks_for_level_up: this.state.tasks_for_level_up+1},
            () => this.saveSettings());
    }

    decrementNumTasks() {
        this.setState({tasks_for_level_up: this.state.tasks_for_level_up-1},
            () => this.saveSettings());
    }

    setSeagullScream(scream) {
        this.setState({seagull_scream: scream},
            () => this.saveSettings());
    }

    toggleSeagullScream() {
        this.setState(prevState => ({seagull_scream_disabled: !prevState.seagull_scream_disabled}),
            () => this.saveSettings());
    }
    
    // Render settings.
    render() {
        return (
            <div>
                <Container>

                    <h3>General</h3>

                    {/* Dark mode. */}
                    <Row id="dark_mode" className="settings-item">
                        <Col id="dark_mode_text">
                            <span>Toggle Dark Mode:</span>
                        </Col>
                        <Col id="dark_mode_toggle">
                            <Toggle Toggle={this.state.dark_mode} onClick={() => this.toggleDarkMode()} />
                        </Col>
                    </Row>

                    {/* Week starts on. */}
                    <Row id="week_starts_on" className="settings-item">
                        <Col id="week_starts_on_text">
                            <span>Week Starts On:</span>
                        </Col>
                        <Col id="week_starts_on_select">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.state.week_starts_on}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Monday")}>Monday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Tuesday")}>Tuesday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Wednesday")}>Wednesday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Thursday")}>Thursday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Friday")}>Friday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Saturday")}>Saturday</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setWeekStartsOn("Sunday")}>Sunday</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    {/* Default task foulder. */}
                    <Row id="default_task_folder" className="settings-item">
                        <Col id="default_task_folder_text">
                            <span>Default Task Folder:</span>
                        </Col>
                        <Col id="default_task_folder_select">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.state.default_task_folder === null ? "None" : this.state.default_task_folder}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.setDefaultTaskFolder(null)}>None</Dropdown.Item>
                                    {this.state.folders.map((folder, index) =>
                                        <Dropdown.Item key={index} onClick={() => this.setDefaultTaskFolder(folder)}>{folder}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    
                    <br />
                    <h3>Seagull</h3>

                    {/* Set seagull icon. */}
                    <Row id="seagull_icon" className="settings-item">
                        <Col id="seagull_icon_text">
                            <span>Select Seagull Icon:</span>
                        </Col>
                        <Col id="seagull_icon_select">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-seagull">
                                    Seagull {this.state.seagull_icon.charAt(7)}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.setSeagullIcon("seagull1.png")}>
                                        Seagull 1 &nbsp;&nbsp;&nbsp;<img className="seagull-icon" src={require("../images/seagull1.png")} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setSeagullIcon("seagull2.png")}>
                                        Seagull 2 &nbsp;&nbsp;&nbsp;<img className="seagull-icon" src={require("../images/seagull2.png")} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setSeagullIcon("seagull3.png")}>
                                        Seagull 3 &nbsp;&nbsp;&nbsp;<img className="seagull-icon" src={require("../images/seagull3.png")} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setSeagullIcon("seagull4.png")}>
                                        Seagull 4 &nbsp;&nbsp;&nbsp;<img className="seagull-icon" src={require("../images/seagull4.png")} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setSeagullIcon("seagull5.png")}>
                                        Seagull 5 &nbsp;&nbsp;&nbsp;<img className="seagull-icon" src={require("../images/seagull5.png")} />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    {/* Set number of tasks for level up. */}
                    <Row id="set_num_tasks_for_level" className="settings-item">
                        <Col id="set_num_tasks_text">
                            <span>Tasks For Level Up:</span>
                        </Col>
                        <Col id="set_num_tasks_input">
                            <div className="d-flex justify-content-center">
                                <span>{this.state.tasks_for_level_up} &nbsp;&nbsp;</span>
                                <div className="d-flex flex-column">
                                    <IoIosArrowUp onClick={() => this.incrementNumTasks()} />
                                    <IoIosArrowDown onClick={() => this.decrementNumTasks()} />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Set seagull scream. */}
                    <Row id="set_seagull_scream" className="settings-item">
                        <Col id="set_seagull_scream_task">
                            <span>Choose Seagull Scream</span>
                        </Col>
                        <Col id="set_seagull_scream_select">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-scream">
                                    Scream {this.state.seagull_scream.charAt(6)}
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {this.setSeagullScream("scream1.mp3"); this.playScream();}}>Scream 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.setSeagullScream("scream2.mp3"); this.playScream();}}>Scream 2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.setSeagullScream("scream3.mp3"); this.playScream();}}>Scream 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    {/* Toggle seagull scream on and off. */}
                    <Row id="disable_seagull_scream" className="settings-item">
                        <Col id="disable_seagull_scream_text">
                            <span>Disable Seagull Scream:</span>
                        </Col>
                        <Col id="seagull_scream_toggle">
                            <Toggle Toggle={this.state.seagull_scream_disabled} onClick={() => this.toggleSeagullScream()} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


// iPhone like toggle button for settings.
function Toggle(props) {
    if (props.Toggle === true) {
        return ( <BsToggleOn className="icon-size" onClick={props.onClick} /> );
    } else {
        return ( <BsToggleOff className="icon-size" onClick={props.onClick} /> );
    }
}