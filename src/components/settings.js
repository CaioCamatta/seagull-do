import component from react;

class Settings extends React.component {

    
    constructor(props) {
        super(props);

        // Defines default settings for the application.
        let default_settings = {
            dark_mode: false,
            week_starts_on: "Monday",
            default_task_folder: null,
            seagull_icon: "default.jpg",
            tasks_for_level_up: 5,
            seagull_recording: "default.mp3",
            seagull_scream_disabled: false                
        };

        // Stores settings in the state.
        this.state = default_settings;

        // If no settings file exists, create it with default parameters.
        if (localStorage.getItem("seagull_do_settings") === null) {
            localStorage.setItem("seagull_do_settings", JSON.stringify(default_settings));
        }
        // Otherwise, get the settings from local storage and save it to the component state.
        else {
            this.state = JSON.parse(localStorage.getItem("seagull_do_settings"));
        }
        
    }

    toggleDarkMode = () => this.state[dark_mode] != this.state[dark_mode];
    setWeekStartsOn = (day) => this.state[week_starts_on] = day;
    setDefaultTaskFolder = (folder_name) => this.state[default_task_folder] = folder_name;
    setSeagullIcon = (icon) => this.state[seagull_icon] = icon;
    setTaskForLevelUp = (num) => this.state[tasks_for_level_up] = num;
    setSeagullRecording = (recording) => this.state[seagull_recording] = recording;
    toggleSeagullScream = () => this.state[seagull_scream_disabled] != this.state[seagull_scream_disabled];

    render() { <h1>Settings</h1>}
}