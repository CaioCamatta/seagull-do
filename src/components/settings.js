import React from 'react';
import { BsToggleOff } from "react-icons/bs/";
import { BsToggleOn } from "react-icons/bs/";
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

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
            seagull_scream: "default_scream.mp3",
            seagull_scream_disabled: false                
        };

        const settingsFromStorage = localStorage.getItem("seagull_settings")

        // If no settings file exists, create it with default parameters.
        if (settingsFromStorage === null || settingsFromStorage == "{}" || Object.keys(settingsFromStorage) == 0) {
            this.state = default_settings;
            this.saveSettings();
        }
        // Otherwise, get the settings from local storage and save it to the component state.
        else {
            this.state = JSON.parse(localStorage.getItem("seagull_settings"));
        }

        //this.state["folders"] = this.getFolders();
        this.state["folders"] = ["folder 1", "folder 2"];
    }

    // Clunky method, called every time folders are displayed just in case new folders have been added.
    // Event listeners seem overkill?
    getFolders() {
        this.setState({folders: localStorage.getItem("task_data").folders});
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

    // Functions for modifying the settings based on user input.
    toggleDarkMode = () => this.setState(prevState => ({dark_mode: !prevState.dark_mode}), () => this.saveSettings());
    setWeekStartsOn = (day) => this.setState({week_starts_on: day}, () => this.saveSettings());
    setDefaultTaskFolder= (folder_name) => this.setState({default_task_folder: folder_name}, () => this.saveSettings());
    setSeagullIcon = (icon) => this.setState({seagull_icon: icon}, () => this.saveSettings());
    setTaskForLevelUp = (num) => this.setState({tasks_for_level_up: num}, () => this.saveSettings());
    setSeagullScream = (scream) => this.setState({seagull_scream: scream}, () => this.saveSettings());
    toggleSeagullScream= () => this.setState(prevState => ({seagull_scream_disabled: !prevState.seagull_scream_disabled}), () => this.saveSettings());
    
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
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.default_task_folder}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.folders.map((folder, index) =>
                                <Dropdown.Item key={index} onClick={() => this.setDefaultTaskFolder(folder)}>{folder}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Set seagull icon. */}
                <div id="seagull_icon">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-seagull">
                            Seagull {this.state.seagull_icon.charAt(7)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setSeagullIcon("seagull1.png")}>Seagull 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSeagullIcon("seagull2.png")}>Seagull 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSeagullIcon("seagull3.png")}>Seagull 3</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSeagullIcon("seagull4.png")}>Seagull 4</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSeagullIcon("seagull5.png")}>Seagull 5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Set number of tasks for level up. */}
                <div id="set_num_tasks_for_level">
                    {/* TODO Add an int selector for the user to pick the number of tasks for level up. */}
                </div>

                {/* Set seagull scream. */}
                <div id="set_seagull_scream">
                    {/* TODO Get list of possible seagull screams to let the user choose from. Add a play button, or play on click. */}
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
        return ( <BsToggleOn onClick={props.onClick} /> );
    } else {
        return ( <BsToggleOff onClick={props.onClick} /> );
    }
}