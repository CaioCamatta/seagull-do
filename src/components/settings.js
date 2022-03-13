import React from 'react';
import { BsToggleOff } from "react-icons/bs/";
import { BsToggleOn } from "react-icons/bs/";
import { Dropdown } from 'react-bootstrap';

// Settings Component
export default class Settings extends React.Component {

    constructor(props) {
        super(props);

        // Defines default settings for the application.
        let default_settings = {
            dark_mode: false,
            week_starts_on: "Monday",
            default_task_folder: null,
            seagull_icon: "default_seagull.jpg",
            tasks_for_level_up: 5,
            seagull_scream: "default_scream.mp3",
            seagull_scream_disabled: false                
        };

        // Stores settings in the class's state.
        this.state = default_settings;

        // If no settings file exists, create it with default parameters.
        if (localStorage.getItem("seagull_settings") === null) {
            localStorage.setItem("seagull_settings", JSON.stringify(default_settings));
        }
        // Otherwise, get the settings from local storage and save it to the component state.
        else {
            this.state = JSON.parse(localStorage.getItem("seagull_settings"));
        }
        
    }

    // Save any changes to settings and callback changes to parent component.
    saveSettings() {
        localStorage.setItem("seagull_settings", JSON.stringify(this.state));
        this.props.onChange();
    }

    // Functions for modifying the settings based on user input.
    toggleDarkMode = () => this.setState(prevState => ({dark_mode: !prevState.dark_mode}), () => this.saveSettings());
    setWeekStartsOn = (day) => this.setState({week_starts_on: day}, () => this.saveSettings());
    setDefaultTaskFolder= (folder_name) => this.setState({default_task_folder: folder_name}, () => this.saveSettings);
    setSeagullIcon = (icon) => this.setState({seagull_icon: icon}, () => this.saveSettings);
    setTaskForLevelUp = (num) => this.setState({tasks_for_level_up: num}, () => this.saveSettings);
    setSeagullScream = (scream) => this.setState({seagull_scream: scream}, () => this.saveSettings);
    toggleSeagullScream = () => this.setState(prevState => ({seagull_scream_disabled: !prevState.seagull_scream_disabled}), () => this.saveSettings);
    
    // Render settings.
    render() {

        return (
            <div>
                {/* Dark mode. */}
                <div id="dark_mode">
                    <div id="dark_mode_text">
                        <p>Toggle Dark Mode</p>
                    </div>
                    <div id="dark_mode_toggle">
                        <Toggle Toggle={this.state.dark_mode} onClick={() => this.toggleDarkMode()} />
                    </div>
                </div>

                {/* Week starts on. */}
                <div id="week_starts_on">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                </div>

                {/* Default task foulder. */}
                <div id="default_task_folder">
                    {/* TODO Get list of folders that exist and display them in a dropdown for the user to select from. */}
                </div>

                {/* Set seagull icon. */}
                <div id="seagull_icon">
                    {/* TODO Get list of possible seagull icons that exist and display them in a dropdown for the user to select from. */}
                </div>

                {/* Set number of tasks for level up. */}
                {/* Set seagull scream. */}
                <div id="set_seagull_scream">

                </div>

                {/* Toggle seagull scream on and off. */}
                <div id="disable_seagull_scream">
                    <div id="disable_seagull_scream_text">
                        <p>Disable Seagull Scream</p>
                    </div>
                    <div id="seagull_scream_toggle">
                        <Toggle Toggle={this.state.seagull_scream_disabled} onClick={() => this.toggleSeagullScream()} />
                    </div>
                </div>


            </div>
        );
    }
}


// iPhone like toggle button for settings.
function Toggle(props) {
    if (props.Toggle === true) {
        return (
            <BsToggleOn onClick={props.onClick} />
        );
    } else {
        return (
            <BsToggleOff onClick={props.onClick} />
        );
    }
}